import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<import('mercurius-codegen').DeepPartial<TResult>> | import('mercurius-codegen').DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
    { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** Date custom scalar type */
    Date: any;
    _FieldSet: any;
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
    /** Organizations that this user belongs to */
    organizations?: Maybe<Array<Maybe<Organization>>>;
};

export type RegistrationForm = {
    firstName: Scalars['String'];
    lastName: Scalars['String'];
    password: Scalars['String'];
    confirmPassword: Scalars['String'];
    email: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    /** Fetch user data about the current user */
    me?: Maybe<User>;
    /** Fetch an event by id */
    eventById?: Maybe<Event>;
    /** Fetch organizations relevant to the current user */
    myOrgs?: Maybe<Array<Maybe<Organization>>>;
    /** Fetch data about a particular org */
    orgById?: Maybe<Organization>;
    myFeedback?: Maybe<Array<Maybe<EventLiveFeedback>>>;
};

export type QueryeventByIdArgs = {
    id: Scalars['ID'];
};

export type QueryorgByIdArgs = {
    id: Scalars['ID'];
};

export type Mutation = {
    __typename?: 'Mutation';
    register?: Maybe<User>;
    createEvent?: Maybe<Event>;
    updateEvent?: Maybe<Event>;
    deleteEvent?: Maybe<Event>;
    /** Start the event so that it is "live" */
    startEvent?: Maybe<Event>;
    /** End the eent so that it is not live */
    endEvent?: Maybe<Event>;
    createOrganization?: Maybe<Organization>;
    updateOrganizationById?: Maybe<Organization>;
    deleteOrganizationById?: Maybe<Organization>;
    /** Adds a new member and returns the new user added */
    addMember?: Maybe<User>;
    createFeedback?: Maybe<EventLiveFeedback>;
    hideQuestion?: Maybe<EventQuestion>;
    reorderQueue?: Maybe<EventQuestion>;
    createQuestion?: Maybe<EventQuestion>;
    alterLike?: Maybe<Like>;
};

export type MutationregisterArgs = {
    input?: Maybe<RegistrationForm>;
};

export type MutationcreateEventArgs = {
    event?: Maybe<CreateEvent>;
};

export type MutationupdateEventArgs = {
    event?: Maybe<UpdateEvent>;
};

export type MutationdeleteEventArgs = {
    event?: Maybe<DeleteEvent>;
};

export type MutationstartEventArgs = {
    eventId: Scalars['String'];
};

export type MutationendEventArgs = {
    eventId: Scalars['String'];
};

export type MutationcreateOrganizationArgs = {
    input?: Maybe<CreateOrg>;
};

export type MutationupdateOrganizationByIdArgs = {
    input?: Maybe<UpdateOrg>;
};

export type MutationdeleteOrganizationByIdArgs = {
    input?: Maybe<DeleteOrg>;
};

export type MutationaddMemberArgs = {
    input?: Maybe<NewMember>;
};

export type MutationcreateFeedbackArgs = {
    input?: Maybe<CreateFeedback>;
};

export type MutationhideQuestionArgs = {
    input?: Maybe<HideQuestion>;
};

export type MutationreorderQueueArgs = {
    input?: Maybe<ReorderQuestion>;
};

export type MutationcreateQuestionArgs = {
    input?: Maybe<CreateQuestion>;
};

export type MutationalterLikeArgs = {
    input?: Maybe<AlterLike>;
};

export type Event = {
    __typename?: 'Event';
    id: Scalars['ID'];
    /** Creator of this event */
    createdBy?: Maybe<User>;
    /** The owning organization */
    orgID?: Maybe<Organization>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
    title: Scalars['String'];
    /** The planned start date time string */
    startDateTime: Scalars['Date'];
    /** The planned end date time string */
    endDateTime: Scalars['Date'];
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

export type CreateEvent = {
    title: Scalars['String'];
    startDateTime: Scalars['String'];
    endDateTime: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    topic: Scalars['String'];
    orgId: Scalars['String'];
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
    eventId: Scalars['String'];
};

export type DeleteEvent = {
    eventId: Scalars['String'];
};

export type Organization = {
    __typename?: 'Organization';
    /** Unique identifier for this org */
    id: Scalars['ID'];
    /** name of the org */
    name: Scalars['String'];
    /** When this org was created */
    createdAt?: Maybe<Scalars['Date']>;
    /** all members of this org */
    members?: Maybe<Array<Maybe<User>>>;
    /** Events owned by this organization */
    events?: Maybe<Array<Maybe<Event>>>;
};

/** Necessary information for org creation */
export type CreateOrg = {
    name: Scalars['String'];
};

/** Information that may be updated by the user */
export type UpdateOrg = {
    id: Scalars['ID'];
    name: Scalars['String'];
};

/** Information necessary for deleting an org */
export type DeleteOrg = {
    id: Scalars['ID'];
};

/** Info necessary for adding a member to an organization */
export type NewMember = {
    email: Scalars['String'];
};

export type EventLiveFeedback = {
    __typename?: 'EventLiveFeedback';
    id: Scalars['ID'];
    message: Scalars['String'];
    event?: Maybe<Event>;
    createdAt?: Maybe<Scalars['String']>;
    createdBy?: Maybe<User>;
};

export type CreateFeedback = {
    message: Scalars['String'];
};

export type HideQuestion = {
    questionId: Scalars['ID'];
    eventId: Scalars['ID'];
    /** Goal state. If we want to change the state to hidden, toggleTo is true; false otherwise. */
    toggleTo: Scalars['Boolean'];
};

export type ReorderQuestion = {
    questionId: Scalars['ID'];
    position: Scalars['Int'];
    eventId: Scalars['ID'];
};

export type Subscription = {
    __typename?: 'Subscription';
    /** New messages as feedback is given */
    eventLiveFeedbackCreated?: Maybe<EventLiveFeedback>;
    eventQuestionCreated?: Maybe<EventQuestion>;
    likeCountChanged?: Maybe<EventQuestion>;
};

export type SubscriptioneventLiveFeedbackCreatedArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptioneventQuestionCreatedArgs = {
    eventId: Scalars['ID'];
};

export type SubscriptionlikeCountChangedArgs = {
    eventId: Scalars['ID'];
};

export type EventParticipant = {
    __typename?: 'EventParticipant';
    user?: Maybe<User>;
    questions?: Maybe<Array<Maybe<EventQuestion>>>;
    liveFeedBack?: Maybe<Array<Maybe<EventLiveFeedback>>>;
};

export type EventQuestion = {
    __typename?: 'EventQuestion';
    id?: Maybe<Scalars['ID']>;
    event?: Maybe<Event>;
    /** User information on the person asking the question */
    createdBy?: Maybe<User>;
    createdAt?: Maybe<Scalars['Date']>;
    refQuestion?: Maybe<EventQuestion>;
    /** The actual content of the question */
    question?: Maybe<Scalars['String']>;
    position?: Maybe<Scalars['Int']>;
    isVisible?: Maybe<Scalars['Boolean']>;
    isAsked?: Maybe<Scalars['Boolean']>;
    lang?: Maybe<Scalars['String']>;
    isFollowUp?: Maybe<Scalars['Boolean']>;
    isQuote?: Maybe<Scalars['Boolean']>;
    /** The number of likes a particular question has */
    likes?: Maybe<Scalars['Int']>;
    /** The users who have liked this question */
    likedBy?: Maybe<Array<Maybe<User>>>;
    /** Whether or not the current user likes the question */
    isLikedByMe?: Maybe<Scalars['Boolean']>;
};

export type Like = {
    __typename?: 'Like';
    user?: Maybe<User>;
    question?: Maybe<EventQuestion>;
};

export type CreateQuestion = {
    question: Scalars['String'];
    isQuote?: Maybe<Scalars['Boolean']>;
    isFollowUp?: Maybe<Scalars['Boolean']>;
    refQuestion?: Maybe<Scalars['ID']>;
    eventId: Scalars['ID'];
};

export type AlterLike = {
    id: Scalars['ID'];
    /** True if the user is attempting to like the question; false if they are trying to remove a like */
    to?: Maybe<Scalars['Boolean']>;
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
    | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
    | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | StitchingResolver<TResult, TParent, TContext, TArgs>;

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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

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
    Date: ResolverTypeWrapper<Scalars['Date']>;
    User: ResolverTypeWrapper<User>;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    RegistrationForm: RegistrationForm;
    Query: ResolverTypeWrapper<{}>;
    Mutation: ResolverTypeWrapper<{}>;
    Event: ResolverTypeWrapper<Event>;
    CreateEvent: CreateEvent;
    UpdateEvent: UpdateEvent;
    DeleteEvent: DeleteEvent;
    Organization: ResolverTypeWrapper<Organization>;
    CreateOrg: CreateOrg;
    UpdateOrg: UpdateOrg;
    DeleteOrg: DeleteOrg;
    NewMember: NewMember;
    EventLiveFeedback: ResolverTypeWrapper<EventLiveFeedback>;
    CreateFeedback: CreateFeedback;
    HideQuestion: HideQuestion;
    ReorderQuestion: ReorderQuestion;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Subscription: ResolverTypeWrapper<{}>;
    EventParticipant: ResolverTypeWrapper<EventParticipant>;
    EventQuestion: ResolverTypeWrapper<EventQuestion>;
    Like: ResolverTypeWrapper<Like>;
    CreateQuestion: CreateQuestion;
    AlterLike: AlterLike;
    EventSpeaker: ResolverTypeWrapper<EventSpeaker>;
    EventVideo: ResolverTypeWrapper<EventVideo>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    Date: Scalars['Date'];
    User: User;
    ID: Scalars['ID'];
    String: Scalars['String'];
    Boolean: Scalars['Boolean'];
    RegistrationForm: RegistrationForm;
    Query: {};
    Mutation: {};
    Event: Event;
    CreateEvent: CreateEvent;
    UpdateEvent: UpdateEvent;
    DeleteEvent: DeleteEvent;
    Organization: Organization;
    CreateOrg: CreateOrg;
    UpdateOrg: UpdateOrg;
    DeleteOrg: DeleteOrg;
    NewMember: NewMember;
    EventLiveFeedback: EventLiveFeedback;
    CreateFeedback: CreateFeedback;
    HideQuestion: HideQuestion;
    ReorderQuestion: ReorderQuestion;
    Int: Scalars['Int'];
    Subscription: {};
    EventParticipant: EventParticipant;
    EventQuestion: EventQuestion;
    Like: Like;
    CreateQuestion: CreateQuestion;
    AlterLike: AlterLike;
    EventSpeaker: EventSpeaker;
    EventVideo: EventVideo;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
    name: 'Date';
}

export type UserResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    isEmailVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    organizations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Organization']>>>, ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
    me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    eventById?: Resolver<
        Maybe<ResolversTypes['Event']>,
        ParentType,
        ContextType,
        RequireFields<QueryeventByIdArgs, 'id'>
    >;
    myOrgs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Organization']>>>, ParentType, ContextType>;
    orgById?: Resolver<
        Maybe<ResolversTypes['Organization']>,
        ParentType,
        ContextType,
        RequireFields<QueryorgByIdArgs, 'id'>
    >;
    myFeedback?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventLiveFeedback']>>>, ParentType, ContextType>;
};

export type MutationResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
    register?: Resolver<
        Maybe<ResolversTypes['User']>,
        ParentType,
        ContextType,
        RequireFields<MutationregisterArgs, never>
    >;
    createEvent?: Resolver<
        Maybe<ResolversTypes['Event']>,
        ParentType,
        ContextType,
        RequireFields<MutationcreateEventArgs, never>
    >;
    updateEvent?: Resolver<
        Maybe<ResolversTypes['Event']>,
        ParentType,
        ContextType,
        RequireFields<MutationupdateEventArgs, never>
    >;
    deleteEvent?: Resolver<
        Maybe<ResolversTypes['Event']>,
        ParentType,
        ContextType,
        RequireFields<MutationdeleteEventArgs, never>
    >;
    startEvent?: Resolver<
        Maybe<ResolversTypes['Event']>,
        ParentType,
        ContextType,
        RequireFields<MutationstartEventArgs, 'eventId'>
    >;
    endEvent?: Resolver<
        Maybe<ResolversTypes['Event']>,
        ParentType,
        ContextType,
        RequireFields<MutationendEventArgs, 'eventId'>
    >;
    createOrganization?: Resolver<
        Maybe<ResolversTypes['Organization']>,
        ParentType,
        ContextType,
        RequireFields<MutationcreateOrganizationArgs, never>
    >;
    updateOrganizationById?: Resolver<
        Maybe<ResolversTypes['Organization']>,
        ParentType,
        ContextType,
        RequireFields<MutationupdateOrganizationByIdArgs, never>
    >;
    deleteOrganizationById?: Resolver<
        Maybe<ResolversTypes['Organization']>,
        ParentType,
        ContextType,
        RequireFields<MutationdeleteOrganizationByIdArgs, never>
    >;
    addMember?: Resolver<
        Maybe<ResolversTypes['User']>,
        ParentType,
        ContextType,
        RequireFields<MutationaddMemberArgs, never>
    >;
    createFeedback?: Resolver<
        Maybe<ResolversTypes['EventLiveFeedback']>,
        ParentType,
        ContextType,
        RequireFields<MutationcreateFeedbackArgs, never>
    >;
    hideQuestion?: Resolver<
        Maybe<ResolversTypes['EventQuestion']>,
        ParentType,
        ContextType,
        RequireFields<MutationhideQuestionArgs, never>
    >;
    reorderQueue?: Resolver<
        Maybe<ResolversTypes['EventQuestion']>,
        ParentType,
        ContextType,
        RequireFields<MutationreorderQueueArgs, never>
    >;
    createQuestion?: Resolver<
        Maybe<ResolversTypes['EventQuestion']>,
        ParentType,
        ContextType,
        RequireFields<MutationcreateQuestionArgs, never>
    >;
    alterLike?: Resolver<
        Maybe<ResolversTypes['Like']>,
        ParentType,
        ContextType,
        RequireFields<MutationalterLikeArgs, never>
    >;
};

export type EventResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    orgID?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    startDateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
    endDateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
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
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    members?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
    events?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventLiveFeedbackResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['EventLiveFeedback'] = ResolversParentTypes['EventLiveFeedback']
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
    eventLiveFeedbackCreated?: SubscriptionResolver<
        Maybe<ResolversTypes['EventLiveFeedback']>,
        'eventLiveFeedbackCreated',
        ParentType,
        ContextType,
        RequireFields<SubscriptioneventLiveFeedbackCreatedArgs, 'eventId'>
    >;
    eventQuestionCreated?: SubscriptionResolver<
        Maybe<ResolversTypes['EventQuestion']>,
        'eventQuestionCreated',
        ParentType,
        ContextType,
        RequireFields<SubscriptioneventQuestionCreatedArgs, 'eventId'>
    >;
    likeCountChanged?: SubscriptionResolver<
        Maybe<ResolversTypes['EventQuestion']>,
        'likeCountChanged',
        ParentType,
        ContextType,
        RequireFields<SubscriptionlikeCountChangedArgs, 'eventId'>
    >;
};

export type EventParticipantResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['EventParticipant'] = ResolversParentTypes['EventParticipant']
> = {
    user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    questions?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventQuestion']>>>, ParentType, ContextType>;
    liveFeedBack?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventLiveFeedback']>>>, ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventQuestionResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['EventQuestion'] = ResolversParentTypes['EventQuestion']
> = {
    id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
    createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    refQuestion?: Resolver<Maybe<ResolversTypes['EventQuestion']>, ParentType, ContextType>;
    question?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    position?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    isVisible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isAsked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    lang?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    isFollowUp?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isQuote?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    likedBy?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
    isLikedByMe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']
> = {
    user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    question?: Resolver<Maybe<ResolversTypes['EventQuestion']>, ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventSpeakerResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['EventSpeaker'] = ResolversParentTypes['EventSpeaker']
> = {
    user?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventVideoResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['EventVideo'] = ResolversParentTypes['EventVideo']
> = {
    url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    lang?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
    Date?: GraphQLScalarType;
    User?: UserResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Event?: EventResolvers<ContextType>;
    Organization?: OrganizationResolvers<ContextType>;
    EventLiveFeedback?: EventLiveFeedbackResolvers<ContextType>;
    Subscription?: SubscriptionResolvers<ContextType>;
    EventParticipant?: EventParticipantResolvers<ContextType>;
    EventQuestion?: EventQuestionResolvers<ContextType>;
    Like?: LikeResolvers<ContextType>;
    EventSpeaker?: EventSpeakerResolvers<ContextType>;
    EventVideo?: EventVideoResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

type Loader<TReturn, TObj, TParams, TContext> = (
    queries: Array<{
        obj: TObj;
        params: TParams;
    }>,
    context: TContext & {
        reply: import('fastify').FastifyReply;
    }
) => Promise<Array<import('mercurius-codegen').DeepPartial<TReturn>>>;
type LoaderResolver<TReturn, TObj, TParams, TContext> =
    | Loader<TReturn, TObj, TParams, TContext>
    | {
          loader: Loader<TReturn, TObj, TParams, TContext>;
          opts?: {
              cache?: boolean;
          };
      };
export interface Loaders<TContext = import('mercurius').MercuriusContext & { reply: import('fastify').FastifyReply }> {
    User?: {
        id?: LoaderResolver<Scalars['ID'], User, {}, TContext>;
        firstName?: LoaderResolver<Scalars['String'], User, {}, TContext>;
        lastName?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        email?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        isEmailVerified?: LoaderResolver<Maybe<Scalars['Boolean']>, User, {}, TContext>;
        avatar?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        organizations?: LoaderResolver<Maybe<Array<Maybe<Organization>>>, User, {}, TContext>;
    };

    Event?: {
        id?: LoaderResolver<Scalars['ID'], Event, {}, TContext>;
        createdBy?: LoaderResolver<Maybe<User>, Event, {}, TContext>;
        orgID?: LoaderResolver<Maybe<Organization>, Event, {}, TContext>;
        createdAt?: LoaderResolver<Maybe<Scalars['Date']>, Event, {}, TContext>;
        updatedAt?: LoaderResolver<Maybe<Scalars['Date']>, Event, {}, TContext>;
        title?: LoaderResolver<Scalars['String'], Event, {}, TContext>;
        startDateTime?: LoaderResolver<Scalars['Date'], Event, {}, TContext>;
        endDateTime?: LoaderResolver<Scalars['Date'], Event, {}, TContext>;
        description?: LoaderResolver<Scalars['String'], Event, {}, TContext>;
        topic?: LoaderResolver<Scalars['String'], Event, {}, TContext>;
        isActive?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        isQuestionFeedVisible?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        isCollectRatingsEnabled?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        isTransformToForumEnabled?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        isPrivate?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        questions?: LoaderResolver<Maybe<Array<Maybe<EventQuestion>>>, Event, {}, TContext>;
        speakers?: LoaderResolver<Maybe<Array<Maybe<EventSpeaker>>>, Event, {}, TContext>;
        registrants?: LoaderResolver<Maybe<Array<Maybe<User>>>, Event, {}, TContext>;
        participants?: LoaderResolver<Maybe<Array<Maybe<EventParticipant>>>, Event, {}, TContext>;
        videos?: LoaderResolver<Maybe<Array<Maybe<EventVideo>>>, Event, {}, TContext>;
        liveFeedback?: LoaderResolver<Maybe<Array<Maybe<EventLiveFeedback>>>, Event, {}, TContext>;
        moderators?: LoaderResolver<Maybe<Array<Maybe<User>>>, Event, {}, TContext>;
    };

    Organization?: {
        id?: LoaderResolver<Scalars['ID'], Organization, {}, TContext>;
        name?: LoaderResolver<Scalars['String'], Organization, {}, TContext>;
        createdAt?: LoaderResolver<Maybe<Scalars['Date']>, Organization, {}, TContext>;
        members?: LoaderResolver<Maybe<Array<Maybe<User>>>, Organization, {}, TContext>;
        events?: LoaderResolver<Maybe<Array<Maybe<Event>>>, Organization, {}, TContext>;
    };

    EventLiveFeedback?: {
        id?: LoaderResolver<Scalars['ID'], EventLiveFeedback, {}, TContext>;
        message?: LoaderResolver<Scalars['String'], EventLiveFeedback, {}, TContext>;
        event?: LoaderResolver<Maybe<Event>, EventLiveFeedback, {}, TContext>;
        createdAt?: LoaderResolver<Maybe<Scalars['String']>, EventLiveFeedback, {}, TContext>;
        createdBy?: LoaderResolver<Maybe<User>, EventLiveFeedback, {}, TContext>;
    };

    EventParticipant?: {
        user?: LoaderResolver<Maybe<User>, EventParticipant, {}, TContext>;
        questions?: LoaderResolver<Maybe<Array<Maybe<EventQuestion>>>, EventParticipant, {}, TContext>;
        liveFeedBack?: LoaderResolver<Maybe<Array<Maybe<EventLiveFeedback>>>, EventParticipant, {}, TContext>;
    };

    EventQuestion?: {
        id?: LoaderResolver<Maybe<Scalars['ID']>, EventQuestion, {}, TContext>;
        event?: LoaderResolver<Maybe<Event>, EventQuestion, {}, TContext>;
        createdBy?: LoaderResolver<Maybe<User>, EventQuestion, {}, TContext>;
        createdAt?: LoaderResolver<Maybe<Scalars['Date']>, EventQuestion, {}, TContext>;
        refQuestion?: LoaderResolver<Maybe<EventQuestion>, EventQuestion, {}, TContext>;
        question?: LoaderResolver<Maybe<Scalars['String']>, EventQuestion, {}, TContext>;
        position?: LoaderResolver<Maybe<Scalars['Int']>, EventQuestion, {}, TContext>;
        isVisible?: LoaderResolver<Maybe<Scalars['Boolean']>, EventQuestion, {}, TContext>;
        isAsked?: LoaderResolver<Maybe<Scalars['Boolean']>, EventQuestion, {}, TContext>;
        lang?: LoaderResolver<Maybe<Scalars['String']>, EventQuestion, {}, TContext>;
        isFollowUp?: LoaderResolver<Maybe<Scalars['Boolean']>, EventQuestion, {}, TContext>;
        isQuote?: LoaderResolver<Maybe<Scalars['Boolean']>, EventQuestion, {}, TContext>;
        likes?: LoaderResolver<Maybe<Scalars['Int']>, EventQuestion, {}, TContext>;
        likedBy?: LoaderResolver<Maybe<Array<Maybe<User>>>, EventQuestion, {}, TContext>;
        isLikedByMe?: LoaderResolver<Maybe<Scalars['Boolean']>, EventQuestion, {}, TContext>;
    };

    Like?: {
        user?: LoaderResolver<Maybe<User>, Like, {}, TContext>;
        question?: LoaderResolver<Maybe<EventQuestion>, Like, {}, TContext>;
    };

    EventSpeaker?: {
        user?: LoaderResolver<Maybe<Array<Maybe<User>>>, EventSpeaker, {}, TContext>;
        name?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
        description?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
        title?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
        picture?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
    };

    EventVideo?: {
        url?: LoaderResolver<Scalars['String'], EventVideo, {}, TContext>;
        lang?: LoaderResolver<Scalars['String'], EventVideo, {}, TContext>;
    };
}
declare module 'mercurius' {
    interface IResolvers extends Resolvers<import('mercurius').MercuriusContext> {}
    interface MercuriusLoaders extends Loaders {}
}
