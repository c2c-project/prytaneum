/* eslint-disable */
import MQEmitter, { Message } from 'mqemitter';
import type { FastifyLoggerInstance } from 'fastify';
import { PubSub, Message as TGcpMessage, Subscription } from '@google-cloud/pubsub';
import { Readable } from 'stream';
import { TtlCache } from './TtlCache';
import { InMemoryCache } from './InMemoryCache';

interface MyMessage extends Message {
    // Optional to make tsc happy, but it's not really optional.
    payload?: Record<string, unknown>;
}

type TListener = (message: MyMessage, done: () => void) => void;

// FIXME: this currently does not work due to issues that will be written elsewhere
export class GcpPubSub {
    private mqEmitter: ReturnType<typeof MQEmitter>;

    private pubsub: PubSub;

    private logger: FastifyLoggerInstance;

    // Caches what message id's we've already seen in case we get multiple deliveries.
    private ttlCache: TtlCache;

    // Caches what topics we already know exist or have.
    private topicCache: InMemoryCache;

    // Caches what subscriptions we already know exist or have.
    private subscriptionCache: InMemoryCache;

    constructor(logger: FastifyLoggerInstance) {
        this.mqEmitter = MQEmitter();
        this.pubsub = new PubSub({ projectId: process.env.GCP_PROJECT_ID });
        this.logger = logger.child({ module: 'GcpPubSub' });
        this.ttlCache = new TtlCache(this.logger);
        this.topicCache = new InMemoryCache(this.logger);
        this.subscriptionCache = new InMemoryCache(this.logger);
    }

    private async getOrCreateDeadLetterTopic() {
        const topic = await this.getOrCreateTopic('dead_letter');
        return topic;
    }

    private getSubscriptionName(topicName: string) {
        const name = `${topicName}_${process.env.POD_ID}`;
        this.logger.debug(`Creating subscription named: ${name}`);
        return name;
    }

    private async getOrCreateTopic(topicName: string) {
        let topic = this.pubsub.topic(topicName);
        const [exists] = await topic.exists();
        if (!exists) {
            this.logger.debug(`Creating topic named: ${topic.name}`);
            [topic] = await topic.create();
        }
        return topic;
    }

    private async getOrCreateSubscription(topicName: string) {
        const topic = await this.getOrCreateTopic(topicName);
        let subscription = topic.subscription(this.getSubscriptionName(topicName));
        const [exists] = await subscription.exists();
        const dlTopic = await this.getOrCreateDeadLetterTopic();
        this.logger.debug(`Subscription ${subscription.name} ${exists ? 'already exists.' : 'does not exist.'}`);
        if (!exists) {
            this.logger.debug(`Creating subscription named: ${subscription.name}`);
            [subscription] = await subscription.create({
                deadLetterPolicy: {
                    deadLetterTopic: dlTopic.name,
                    maxDeliveryAttempts: 10,
                },
            });
        } else [subscription] = await subscription.get();
        return subscription;
    }

    emit(message: MyMessage, callback: (err?: Error) => void) {
        this.logger.debug(`Message emitted ${JSON.stringify(message)}`);
        this.mqEmitter.emit(message, (err) => {
            if (err && callback) callback(err);
            this.getOrCreateTopic(message.topic)
                .then((topic) => topic.publishMessage({ json: message.payload }))
                .then(() => {
                    if (callback) callback(err);
                })
                .catch((_err) => this.logger.error(_err));
        });
    }

    removeListener(event: string, listener: TListener, callback?: () => void) {
        this.logger.debug(`Removing listener for event: ${event}`);
        this.mqEmitter.removeListener(event, listener, () => {
            this.getOrCreateSubscription(event)
                .then((subscription) => subscription.removeListener(event, listener))
                .then(() => {
                    if (callback) callback();
                })
                .catch((err) => this.logger.error(err));
        });
    }

    on(event: string, listener: TListener, onDone: () => void) {
        this.logger.debug(`Adding listener for event: ${event}`);
        this.mqEmitter.on(event, listener, () => {
            this.getOrCreateSubscription(event)
                .then((subscription) =>
                    subscription.on('message', (message: TGcpMessage) => {
                        const payload = JSON.parse(message.data.toString());
                        listener(payload, () => {
                            message.ack();
                        });
                    })
                )
                .then(() => {
                    if (onDone) onDone();
                });
        });
    }

    async close() {
        const readable = Readable.from(this.pubsub.getSubscriptionsStream());
        readable.addListener('data', (subscription: Subscription) => {
            subscription.delete();
        });
        await this.pubsub.close();
    }
}
