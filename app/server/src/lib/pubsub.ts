import { PubSub, Topic, Subscription } from '@google-cloud/pubsub';
import { PubSub as MercuriusPubSub} from 'mercurius';

let GCP_PUB_SUB: PubSub | null = null;
const GCP_TOPICS: Record<string,Topic> = {};
const GCP_SUBSCRIPTIONS: Record<string,Subscription> = {};

function init<T>(callback?: (pubsub: PubSub) => T) {
    const pubsub = GCP_PUB_SUB ?? new PubSub({ projectId: process.env.GCP_PROJECT_ID });

    if (!GCP_PUB_SUB) GCP_PUB_SUB = pubsub;
    if (callback) return callback(GCP_PUB_SUB);

    return GCP_PUB_SUB;
}

const createTopic = (topic: string) => init(async (pubsub) => {
    const [createdTopic] = await pubsub.createTopic(topic);
    GCP_TOPICS[topic] = createdTopic;
});

const createSubscription = (topic: string, subscriptionName: string) => init(async () => {
    if (!GCP_TOPICS[topic]) createTopic(topic);
    const [subscription] = await GCP_TOPICS[topic].createSubscription(subscriptionName);
    GCP_SUBSCRIPTIONS[topic] = subscription;
});

export const getGcpPubSub = init;

export const publish: MercuriusPubSub['publish'] = (event, callback) => init(async () => {
    if (!GCP_TOPICS[event.topic]) await createTopic(event.topic);
    
    // this asynchronously returns a message id however, there is nothing we can do with it
    GCP_TOPICS[event.topic].publishMessage({ json: event.payload });
    if (callback) callback();
});

// export const subscribe: MercuriusPubSub['subscribe'] = (topics) => init(async (pubsub) => {
    
// });
