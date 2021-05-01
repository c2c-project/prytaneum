import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateEvent = {
  title: Scalars['String'];
  startDateTime: Scalars['String'];
  endDateTime: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  topic: Scalars['String'];
};

export type CreateFeedback = {
  message: Scalars['String'];
};

/** Necessary information for org creation */
export type CreateOrg = {
  name: Scalars['String'];
};

export type CreateQuestion = {
  question?: Maybe<Scalars['String']>;
};

export type DeleteEvent = {
  eventId: Scalars['String'];
};

/** Information necessary for deleting an org */
export type DeleteOrg = {
  id: Scalars['ID'];
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['ID'];
  /** Creator of this event */
  createdBy?: Maybe<User>;
  /** The owning organization */
  orgID?: Maybe<Organization>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  /** The planned start date time string */
  startDateTime: Scalars['String'];
  /** The planned end date time string */
  endDateTime: Scalars['String'];
  description: Scalars['String'];
  topic: Scalars['String'];
  /** Whether or not the Event is live */
  isActive?: Maybe<Scalars['Boolean']>;
  /** Let all users see what questions have been submitted */
  isQuestionFeedVisible?: Maybe<Scalars['Boolean']>;
  /** Collect user ratings after the event has ended */
  isCollectRatingsEnabled?: Maybe<Scalars['Boolean']>;
  /** Display a forum-like interface once the "live" part of the event is over */
  isTransformToForumEnabled?: Maybe<Scalars['Boolean']>;
  /** Is the event private, ie invite only */
  isPrivate?: Maybe<Scalars['Boolean']>;
  /** All questions relating to this event */
  questions?: Maybe<Array<Maybe<EventQuestion>>>;
  /** Speakers for this event */
  speakers?: Maybe<Array<Maybe<EventSpeaker>>>;
  /** Registrants for this event -- individuals invited */
  registrants?: Maybe<Array<Maybe<User>>>;
  /** Participants of the event -- individuals who showed up */
  participants?: Maybe<Array<Maybe<EventParticipant>>>;
  /** Video feeds and the languages */
  videos?: Maybe<Array<Maybe<EventVideo>>>;
  /** Live Feedback given during the event */
  liveFeedback?: Maybe<Array<Maybe<EventLiveFeedback>>>;
  /** List of moderators for this particular event */
  moderators?: Maybe<Array<Maybe<User>>>;
};

export type EventLiveFeedback = {
  __typename?: 'EventLiveFeedback';
  id: Scalars['ID'];
  message: Scalars['String'];
  event?: Maybe<Event>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
};

export type EventParticipant = {
  __typename?: 'EventParticipant';
  user?: Maybe<User>;
  questions?: Maybe<Array<Maybe<EventQuestion>>>;
  liveFeedBack?: Maybe<Array<Maybe<EventLiveFeedback>>>;
};

export type EventQuestion = {
  __typename?: 'EventQuestion';
  id: Scalars['ID'];
  event: Event;
  /** User information on the person asking the question */
  createdBy: User;
  createdAt: Scalars['String'];
  refQuestion?: Maybe<EventQuestion>;
  /** The actual content of the question */
  question: Scalars['String'];
  position?: Maybe<Scalars['Int']>;
  isVisible?: Maybe<Scalars['Boolean']>;
  isAsked?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Scalars['String']>;
  isFollowUp?: Maybe<Scalars['Boolean']>;
  isQuote?: Maybe<Scalars['Boolean']>;
  /** The number of likes a particular question has */
  likes?: Maybe<Scalars['Int']>;
};

export type EventSpeaker = {
  __typename?: 'EventSpeaker';
  /** The related user account associated with the speaker */
  user?: Maybe<Array<Maybe<User>>>;
  /** Name set by the organizer of the event */
  name?: Maybe<Scalars['String']>;
  /** Description set by the organizer of the event */
  description?: Maybe<Scalars['String']>;
  /** Title set by the organizer of the event */
  title?: Maybe<Scalars['String']>;
  /** Picture set by the organizer of the event */
  picture?: Maybe<Scalars['String']>;
};

export type EventVideo = {
  __typename?: 'EventVideo';
  url: Scalars['String'];
  lang: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<Event>;
  updateEvent?: Maybe<Event>;
  deleteEvent?: Maybe<Event>;
  /** Start the event so that it is "live" */
  startEvent?: Maybe<Event>;
  /** End the eent so that it is not live */
  endEvent?: Maybe<Event>;
  createFeedback?: Maybe<EventLiveFeedback>;
  createQuestion?: Maybe<EventQuestion>;
  likeQuestion?: Maybe<EventQuestion>;
  createOrganization?: Maybe<Organization>;
  updateOrganizationById?: Maybe<Organization>;
  deleteOrganizationById?: Maybe<Organization>;
};


export type MutationCreateEventArgs = {
  event?: Maybe<CreateEvent>;
};


export type MutationUpdateEventArgs = {
  event?: Maybe<UpdateEvent>;
};


export type MutationDeleteEventArgs = {
  event?: Maybe<DeleteEvent>;
};


export type MutationStartEventArgs = {
  eventId: Scalars['String'];
};


export type MutationEndEventArgs = {
  eventId: Scalars['String'];
};


export type MutationCreateFeedbackArgs = {
  input?: Maybe<CreateFeedback>;
};


export type MutationCreateQuestionArgs = {
  input?: Maybe<CreateQuestion>;
};


export type MutationLikeQuestionArgs = {
  id: Scalars['ID'];
};


export type MutationCreateOrganizationArgs = {
  input?: Maybe<CreateOrg>;
};


export type MutationUpdateOrganizationByIdArgs = {
  input?: Maybe<UpdateOrg>;
};


export type MutationDeleteOrganizationByIdArgs = {
  input?: Maybe<DeleteOrg>;
};

export type Organization = {
  __typename?: 'Organization';
  /** Unique identifier for this org */
  id: Scalars['ID'];
  /** Original creator of this org */
  createdBy?: Maybe<User>;
  /** name of the org */
  name: Scalars['String'];
  /** When this org was created */
  createdAt?: Maybe<Scalars['String']>;
  /** all members of this org */
  members?: Maybe<Array<Maybe<User>>>;
  /** admins of the this org */
  admins?: Maybe<Array<Maybe<User>>>;
  /** Events owned by this organization */
  events?: Maybe<Array<Maybe<Event>>>;
};

export type Query = {
  __typename?: 'Query';
  /** Fetch an event by id */
  eventById?: Maybe<Event>;
  /** Fetch organizations relevant to the current user */
  myOrgs?: Maybe<Array<Maybe<Organization>>>;
  /** Fetch data about a particular org */
  orgById?: Maybe<Organization>;
  /** Fetch user data about the current user */
  me?: Maybe<User>;
};


export type QueryEventByIdArgs = {
  id: Scalars['ID'];
};


export type QueryOrgByIdArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** New messages as feedback is given */
  eventLiveFeedbackCreated?: Maybe<EventLiveFeedback>;
  eventQuestionCreated?: Maybe<EventQuestion>;
  likeCountChanged?: Maybe<EventQuestion>;
};


export type SubscriptionEventLiveFeedbackCreatedArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionEventQuestionCreatedArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionLikeCountChangedArgs = {
  eventId: Scalars['ID'];
};

export type UpdateEvent = {
  title?: Maybe<Scalars['String']>;
  startDateTime?: Maybe<Scalars['String']>;
  endDateTime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  topic?: Maybe<Scalars['String']>;
  isQuestionFeedVisible?: Maybe<Scalars['Boolean']>;
  isCollectRatingsEnabled?: Maybe<Scalars['Boolean']>;
  isTransformToForumEnabled?: Maybe<Scalars['Boolean']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
};

/** Information that may be updated by the user */
export type UpdateOrg = {
  name?: Maybe<Scalars['String']>;
};


/** User Data */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  isEmailVerified?: Maybe<Scalars['Boolean']>;
  /** Avatar URL if null then no avatar is uploaded */
  avatar?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CacheControlScope: CacheControlScope;
  CreateEvent: CreateEvent;
  String: ResolverTypeWrapper<Scalars['String']>;
  CreateFeedback: CreateFeedback;
  CreateOrg: CreateOrg;
  CreateQuestion: CreateQuestion;
  DeleteEvent: DeleteEvent;
  DeleteOrg: DeleteOrg;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Event: ResolverTypeWrapper<Event>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  EventLiveFeedback: ResolverTypeWrapper<EventLiveFeedback>;
  EventParticipant: ResolverTypeWrapper<EventParticipant>;
  EventQuestion: ResolverTypeWrapper<EventQuestion>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  EventSpeaker: ResolverTypeWrapper<EventSpeaker>;
  EventVideo: ResolverTypeWrapper<EventVideo>;
  Mutation: ResolverTypeWrapper<{}>;
  Organization: ResolverTypeWrapper<Organization>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateEvent: UpdateEvent;
  UpdateOrg: UpdateOrg;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CreateEvent: CreateEvent;
  String: Scalars['String'];
  CreateFeedback: CreateFeedback;
  CreateOrg: CreateOrg;
  CreateQuestion: CreateQuestion;
  DeleteEvent: DeleteEvent;
  DeleteOrg: DeleteOrg;
  ID: Scalars['ID'];
  Event: Event;
  Boolean: Scalars['Boolean'];
  EventLiveFeedback: EventLiveFeedback;
  EventParticipant: EventParticipant;
  EventQuestion: EventQuestion;
  Int: Scalars['Int'];
  EventSpeaker: EventSpeaker;
  EventVideo: EventVideo;
  Mutation: {};
  Organization: Organization;
  Query: {};
  Subscription: {};
  UpdateEvent: UpdateEvent;
  UpdateOrg: UpdateOrg;
  Upload: Scalars['Upload'];
  User: User;
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  orgID?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startDateTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endDateTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  topic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isQuestionFeedVisible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isCollectRatingsEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isTransformToForumEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPrivate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  questions?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventQuestion']>>>, ParentType, ContextType>;
  speakers?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventSpeaker']>>>, ParentType, ContextType>;
  registrants?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  participants?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventParticipant']>>>, ParentType, ContextType>;
  videos?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventVideo']>>>, ParentType, ContextType>;
  liveFeedback?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventLiveFeedback']>>>, ParentType, ContextType>;
  moderators?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventLiveFeedbackResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventLiveFeedback'] = ResolversParentTypes['EventLiveFeedback']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventParticipantResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventParticipant'] = ResolversParentTypes['EventParticipant']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  questions?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventQuestion']>>>, ParentType, ContextType>;
  liveFeedBack?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventLiveFeedback']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventQuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventQuestion'] = ResolversParentTypes['EventQuestion']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refQuestion?: Resolver<Maybe<ResolversTypes['EventQuestion']>, ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  isVisible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isAsked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lang?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isFollowUp?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isQuote?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventSpeakerResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventSpeaker'] = ResolversParentTypes['EventSpeaker']> = {
  user?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventVideo'] = ResolversParentTypes['EventVideo']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lang?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationCreateEventArgs, never>>;
  updateEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationUpdateEventArgs, never>>;
  deleteEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationDeleteEventArgs, never>>;
  startEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationStartEventArgs, 'eventId'>>;
  endEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationEndEventArgs, 'eventId'>>;
  createFeedback?: Resolver<Maybe<ResolversTypes['EventLiveFeedback']>, ParentType, ContextType, RequireFields<MutationCreateFeedbackArgs, never>>;
  createQuestion?: Resolver<Maybe<ResolversTypes['EventQuestion']>, ParentType, ContextType, RequireFields<MutationCreateQuestionArgs, never>>;
  likeQuestion?: Resolver<Maybe<ResolversTypes['EventQuestion']>, ParentType, ContextType, RequireFields<MutationLikeQuestionArgs, 'id'>>;
  createOrganization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<MutationCreateOrganizationArgs, never>>;
  updateOrganizationById?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<MutationUpdateOrganizationByIdArgs, never>>;
  deleteOrganizationById?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<MutationDeleteOrganizationByIdArgs, never>>;
};

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  admins?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  events?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  eventById?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventByIdArgs, 'id'>>;
  myOrgs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Organization']>>>, ParentType, ContextType>;
  orgById?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<QueryOrgByIdArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  eventLiveFeedbackCreated?: SubscriptionResolver<Maybe<ResolversTypes['EventLiveFeedback']>, "eventLiveFeedbackCreated", ParentType, ContextType, RequireFields<SubscriptionEventLiveFeedbackCreatedArgs, 'eventId'>>;
  eventQuestionCreated?: SubscriptionResolver<Maybe<ResolversTypes['EventQuestion']>, "eventQuestionCreated", ParentType, ContextType, RequireFields<SubscriptionEventQuestionCreatedArgs, 'eventId'>>;
  likeCountChanged?: SubscriptionResolver<Maybe<ResolversTypes['EventQuestion']>, "likeCountChanged", ParentType, ContextType, RequireFields<SubscriptionLikeCountChangedArgs, 'eventId'>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isEmailVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Event?: EventResolvers<ContextType>;
  EventLiveFeedback?: EventLiveFeedbackResolvers<ContextType>;
  EventParticipant?: EventParticipantResolvers<ContextType>;
  EventQuestion?: EventQuestionResolvers<ContextType>;
  EventSpeaker?: EventSpeakerResolvers<ContextType>;
  EventVideo?: EventVideoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;