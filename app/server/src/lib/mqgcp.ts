import MQEmitter, { Message } from 'mqemitter';
import { PubSub, Message as TGcpMessage } from '@google-cloud/pubsub';
import { server } from '../index';

interface MyMessage extends Message {
    // Optional to make tsc happy, but it's not really optional.
    payload?: Record<string, unknown>
}

type TListener = (message: MyMessage, done: () => void) => void;


export class MQGCP {
    mqEmitter: ReturnType<typeof MQEmitter>;
    pubsub: PubSub;

    constructor() {
        this.mqEmitter = MQEmitter();
        this.pubsub = new PubSub({ projectId: process.env.GCP_PROJECT_ID });
    }

    private getSubscriptionName(topicName: string) {
        return `${topicName}_${process.env.POD_ID}`;
    }

    private async getOrCreateTopic(topicName: string) {
        let topic = this.pubsub.topic(topicName);
        const [exists] = await topic.exists();
        if (!exists) topic = (await this.pubsub.createTopic(topicName))[0];
        return topic;
    }

    private async getOrCreateSubscription(topicName: string) {
        const topic = await this.getOrCreateTopic(topicName);
        let subscription = topic.subscription(this.getSubscriptionName(topicName));    
        const [exists] = await subscription.exists();
        if (!exists) subscription = (await topic.createSubscription(this.getSubscriptionName(topicName)))[0];
        return subscription;
    }

    emit(message: MyMessage, callback: (err?: Error) => void) {
        this.mqEmitter.emit(message, (err) => {
            if (err && callback) callback(err);
            this.getOrCreateTopic(message.topic)
                .then((topic) => topic.publishMessage({ json: message.payload }))
                .then(() => {
                    if (callback) callback(err);
                }).catch((err) => server.log.error(err));
        });
    }

    removeListener(event: string, listener: TListener, callback?: () => void) {
        this.mqEmitter.removeListener(event, listener, () => {
            this.getOrCreateSubscription(event)
                .then((subscription) => subscription.removeListener(event, listener))
                .then(() => {
                    if (callback) callback();
                }).catch((err) => server.log.error(err));
        });
    }

    on(event: string, listener: TListener, onDone: () => void) {
        this.mqEmitter.on(event, listener, () => {
            this.getOrCreateSubscription(event)
            .then((subscription) => {
                let messageCount = 0;
                function messageHandler(message: TGcpMessage) {
                    server.log.info('Received message', message.id);
                    server.log.info('\tData: ', message.data.toString());
                    messageCount += 1;
                    message.ack();
                }

                subscription.on('message', (message: TGcpMessage) => {
                    messageHandler(message);
                    const payload = JSON.parse(message.data.toString());
                    listener(payload, () => { server.log.info('Listener') })
                });


                const timeout = 20;

                setTimeout(() => {
                    subscription.removeListener('message', messageHandler);
                    server.log.info(`timeout done, ${messageCount} message(s) received.`);
                }, timeout * 1000);
            })
            .then(() => {
                if (onDone) onDone();
            }).catch((err) => server.log.error(err));
        });
    }
}