import { Resolvers, withFilter, errors, toGlobalId, runMutation } from '@local/features/utils';
import { fromGlobalId } from 'graphql-relay';
import { EventLiveFeedback, EventLiveFeedbackEdge, FeedbackOperation } from '@local/graphql-types';
import * as Feedback from './methods';

const toFeedbackId = toGlobalId('EventLiveFeedback');
const toUserId = toGlobalId('User');
const toEventId = toGlobalId('Event');

export const resolvers: Resolvers = {
    Query: {
        async myFeedback(parent, args, ctx, info) {
            if (!ctx.viewer.id) throw new Error(errors.noLogin);
            if (!args.eventId) throw new Error(errors.invalidArgs);
            const { id: eventId } = fromGlobalId(args.eventId);
            const feedback = Feedback.myFeedback(ctx.viewer.id, eventId, ctx.prisma);
            return feedback;
        }
    },
    Mutation: {
        async createFeedback(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new Error(errors.noLogin);
                if (!args.input) throw new Error(errors.invalidArgs);
                const { id: eventId } = fromGlobalId(args.input.eventId);
                const feedback = await Feedback.createFeedback(ctx.viewer.id, eventId, ctx.prisma, args.input)
                if (!feedback) return feedback;
                console.log(feedback)
                const edge = {
                    node: toFeedbackId(feedback),
                    cursor: feedback.createdAt.getTime().toString()
                }
                ctx.pubsub.publish({
                    topic: 'feedbackCRUD',
                    payload: {
                        feedbackCRUD: { operationType: 'CREATE', edge },
                    },
                });
                return edge;
            })
        }
    },
    Subscription: {
        feedbackCRUD: {
            subscribe: withFilter<{ feedbackCRUD: FeedbackOperation}>(
                (parent, args, ctx) => ctx.pubsub.subscribe('feedbackCRUD'),
                (payload, args, ctx) => {
                    const { id: feedbackId } = fromGlobalId(payload.feedbackCRUD.edge.node.id);
                    const { id: eventId } = fromGlobalId(args.eventId);
                    // TODO only update moderators & feedback creator as other participants cant see other's feedback
                    return Feedback.doesEventMatch(eventId, feedbackId, ctx.prisma);
                }
            )
        }
    },
    EventLiveFeedback: {
        async createdBy(parent, args, ctx, info) {
            const { id: feedbackId } = fromGlobalId(parent.id);
            const submitter = await Feedback.findSubmitterByFeedbackId(feedbackId, ctx.prisma);
            return toUserId(submitter);
        },
    },
}
