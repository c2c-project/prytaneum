import MQEmitter, { Message } from 'mqemitter';
import type { FastifyLoggerInstance } from 'fastify';
import { PubSub, Message as TGcpMessage } from '@google-cloud/pubsub';

interface MyMessage extends Message {
    // Optional to make tsc happy, but it's not really optional.
    payload?: Record<string, unknown>;
}

type TListener = (message: MyMessage, done: () => void) => void;

export class MQGCP {
    mqEmitter: ReturnType<typeof MQEmitter>;

    pubsub: PubSub;

    logger: FastifyLoggerInstance;

    constructor(logger: FastifyLoggerInstance) {
        this.mqEmitter = MQEmitter();
        this.pubsub = new PubSub({ projectId: process.env.GCP_PROJECT_ID });
        this.logger = logger;
    }

    private static getSubscriptionName(topicName: string) {
        return `${topicName}_${process.env.POD_ID}`;
    }

    private async getOrCreateTopic(topicName: string) {
        let topic = this.pubsub.topic(topicName);
        const [exists] = await topic.exists();
        if (!exists) [topic] = await this.pubsub.createTopic(topicName);
        return topic;
    }

    private async getOrCreateSubscription(topicName: string) {
        const topic = await this.getOrCreateTopic(topicName);
        let subscription = topic.subscription(MQGCP.getSubscriptionName(topicName));
        const [exists] = await subscription.exists();
        if (!exists) [subscription] = await topic.createSubscription(MQGCP.getSubscriptionName(topicName));
        return subscription;
    }

    emit(message: MyMessage, callback: (err?: Error) => void) {
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
        this.mqEmitter.on(event, listener, () => {
            this.getOrCreateSubscription(event)
                .then((subscription) => {
                    let messageCount = 0;
                    const messageHandler = (message: TGcpMessage) => {
                        this.logger.info('Received message', message, ' | ', JSON.stringify(message));
                        this.logger.info('Data: ', message.data.toString(), ' | ', JSON.parse(message.data.toString()));
                        messageCount += 1;
                        message.ack();
                    };

                    subscription.on('message', (message: TGcpMessage) => {
                        messageHandler(message);
                        const payload = JSON.parse(message.data.toString());
                        this.logger.info(`Payload: ${payload}`);
                        listener(payload, () => {
                            this.logger.info('Listener');
                        });
                    });

                    const timeout = 60;

                    setTimeout(() => {
                        subscription.removeListener('message', messageHandler);
                        this.logger.info(`timeout done, ${messageCount} message(s) received.`);
                    }, timeout * 1000);
                })
                .then(() => {
                    if (onDone) onDone();
                })
                .catch((err) => this.logger.error(err));
        });
    }
}
