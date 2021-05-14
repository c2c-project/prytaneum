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
) => Promise<TResult> | TResult;
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
    userId: Scalars['ID'];
    firstName?: Maybe<Scalars['String']>;
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

export type LoginForm = {
    email: Scalars['String'];
    password: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    /** Fetch user data about the current user */
    me?: Maybe<User>;
    /** The logout just returns the timestamp of the logout action */
    logout?: Maybe<Scalars['Date']>;
    /** Fetch an event by id */
    eventById?: Maybe<Event>;
    /** Fetch all events */
    events?: Maybe<Array<Event>>;
    /** Fetch organizations relevant to the current user */
    myOrgs?: Maybe<Array<Maybe<Organization>>>;
    /** Fetch data about a particular org */
    orgById?: Maybe<Organization>;
    myFeedback?: Maybe<Array<Maybe<EventLiveFeedback>>>;
    questionsByEventId?: Maybe<Array<EventQuestion>>;
};

export type QueryeventByIdArgs = {
    id: Scalars['ID'];
};

export type QueryorgByIdArgs = {
    id: Scalars['ID'];
};

export type QueryquestionsByEventIdArgs = {
    eventId: Scalars['ID'];
};

export type Mutation = {
    __typename?: 'Mutation';
    register?: Maybe<User>;
    login?: Maybe<User>;
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
    /** Add a new moderator to the given event */
    addModerator?: Maybe<User>;
    /** Advance the current question */
    nextQuestion: Scalars['Int'];
    /** Go to the previous question */
    prevQuestion: Scalars['Int'];
    createQuestion?: Maybe<EventQuestion>;
    alterLike?: Maybe<Like>;
    addSpeaker?: Maybe<EventSpeaker>;
    removeSpeaker?: Maybe<EventSpeaker>;
    updateSpeaker?: Maybe<EventSpeaker>;
    addVideo: EventVideo;
    removeVideo?: Maybe<EventVideo>;
    updateVideo?: Maybe<EventVideo>;
};

export type MutationregisterArgs = {
    input?: Maybe<RegistrationForm>;
};

export type MutationloginArgs = {
    input?: Maybe<LoginForm>;
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

export type MutationaddModeratorArgs = {
    input?: Maybe<AddModerator>;
};

export type MutationnextQuestionArgs = {
    eventId: Scalars['ID'];
};

export type MutationprevQuestionArgs = {
    eventId: Scalars['ID'];
};

export type MutationcreateQuestionArgs = {
    input?: Maybe<CreateQuestion>;
};

export type MutationalterLikeArgs = {
    input?: Maybe<AlterLike>;
};

export type MutationaddSpeakerArgs = {
    input?: Maybe<SpeakerForm>;
};

export type MutationremoveSpeakerArgs = {
    input?: Maybe<DeleteSpeaker>;
};

export type MutationupdateSpeakerArgs = {
    input?: Maybe<UpdateSpeaker>;
};

export type MutationaddVideoArgs = {
    input: CreateVideo;
};

export type MutationremoveVideoArgs = {
    input?: Maybe<DeleteVideo>;
};

export type MutationupdateVideoArgs = {
    input: UpdateVideo;
};

export type Event = {
    __typename?: 'Event';
    eventId: Scalars['ID'];
    /** Creator of this event */
    createdBy?: Maybe<User>;
    /** The owning organization */
    organization?: Maybe<Organization>;
    createdAt?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['Date']>;
    title?: Maybe<Scalars['String']>;
    /** The planned start date time string */
    startDateTime?: Maybe<Scalars['Date']>;
    /** The planned end date time string */
    endDateTime?: Maybe<Scalars['Date']>;
    description?: Maybe<Scalars['String']>;
    topic?: Maybe<Scalars['String']>;
    /** Whether or not the Event is live */
    isActive?: Maybe<Scalars['Boolean']>;
    /** Let all users see what questions have been submitted */
    isQuestionFeedVisible?: Maybe<Scalars['Boolean']>;
    /** Collect user ratings after the event has ended */
    isCollectRatingsEnabled?: Maybe<Scalars['Boolean']>;
    /** Display a forum-like interface once the "live" part of the event is over */
    isForumEnabled?: Maybe<Scalars['Boolean']>;
    /** Is the event private, ie invite only */
    isPrivate?: Maybe<Scalars['Boolean']>;
    /** All questions relating to this event */
    questions?: Maybe<Array<EventQuestion>>;
    /** Speakers for this event */
    speakers?: Maybe<Array<EventSpeaker>>;
    /** Registrants for this event -- individuals invited */
    registrants?: Maybe<Array<User>>;
    /** Participants of the event -- individuals who showed up */
    participants?: Maybe<Array<EventParticipant>>;
    /** Video feeds and the languages */
    videos?: Maybe<Array<EventVideo>>;
    /** Live Feedback given during the event */
    liveFeedback?: Maybe<Array<EventLiveFeedback>>;
    /** List of moderators for this particular event */
    moderators?: Maybe<Array<User>>;
};

export type CreateEvent = {
    title: Scalars['String'];
    startDateTime: Scalars['Date'];
    endDateTime: Scalars['Date'];
    description?: Maybe<Scalars['String']>;
    topic: Scalars['String'];
    orgId: Scalars['String'];
};

export type UpdateEvent = {
    title?: Maybe<Scalars['String']>;
    startDateTime?: Maybe<Scalars['Date']>;
    endDateTime?: Maybe<Scalars['Date']>;
    description?: Maybe<Scalars['String']>;
    topic?: Maybe<Scalars['String']>;
    isQuestionFeedVisible?: Maybe<Scalars['Boolean']>;
    isCollectRatingsEnabled?: Maybe<Scalars['Boolean']>;
    isForumEnabled?: Maybe<Scalars['Boolean']>;
    isPrivate?: Maybe<Scalars['Boolean']>;
    eventId: Scalars['String'];
};

export type DeleteEvent = {
    eventId: Scalars['String'];
};

export type Subscription = {
    __typename?: 'Subscription';
    questionPosition: Scalars['Int'];
    /** New messages as feedback is given */
    eventLiveFeedbackCreated?: Maybe<EventLiveFeedback>;
    eventQuestionCreated: EventQuestion;
    likeCountChanged: Like;
};

export type SubscriptionquestionPositionArgs = {
    eventId: Scalars['ID'];
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

export type Organization = {
    __typename?: 'Organization';
    /** Unique identifier for this org */
    orgId: Scalars['ID'];
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
    feedbackId: Scalars['ID'];
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

export type AddModerator = {
    email: Scalars['String'];
    eventId: Scalars['String'];
};

export type EventParticipant = {
    __typename?: 'EventParticipant';
    user?: Maybe<User>;
    questions?: Maybe<Array<Maybe<EventQuestion>>>;
    liveFeedBack?: Maybe<Array<Maybe<EventLiveFeedback>>>;
};

export type EventQuestion = {
    __typename?: 'EventQuestion';
    questionId: Scalars['ID'];
    event?: Maybe<Event>;
    /** The user id of the creator */
    createdById?: Maybe<Scalars['ID']>;
    /** User information on the person asking the question */
    createdBy?: Maybe<User>;
    createdAt?: Maybe<Scalars['Date']>;
    refQuestionId?: Maybe<Scalars['ID']>;
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
    /** Find the count of the likes only */
    likedByCount?: Maybe<Scalars['Int']>;
    /** Whether or not the current user likes the question */
    isLikedByMe?: Maybe<Scalars['Boolean']>;
};

export type Like = {
    __typename?: 'Like';
    user: User;
    question: EventQuestion;
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
    /** User id associated with this speaker */
    userId: Scalars['ID'];
    /** Event id that this user is speaking at */
    eventId: Scalars['ID'];
    /** The related user account associated with the speaker */
    user?: Maybe<User>;
    /** Name set by the organizer of the event */
    name?: Maybe<Scalars['String']>;
    /** Description set by the organizer of the event */
    description?: Maybe<Scalars['String']>;
    /** Title set by the organizer of the event */
    title?: Maybe<Scalars['String']>;
    /** Picture set by the organizer of the event */
    picture?: Maybe<Scalars['String']>;
};

export type SpeakerForm = {
    eventId: Scalars['String'];
    name: Scalars['String'];
    title: Scalars['String'];
    description: Scalars['String'];
    picture: Scalars['String'];
    /** This is for matching the speaker to an account */
    email: Scalars['String'];
};

export type UpdateSpeaker = {
    name?: Maybe<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    picture?: Maybe<Scalars['String']>;
    userId: Scalars['String'];
    eventId: Scalars['String'];
};

export type DeleteSpeaker = {
    eventId: Scalars['String'];
    userId: Scalars['String'];
};

export type EventVideo = {
    __typename?: 'EventVideo';
    url: Scalars['String'];
    lang: Scalars['String'];
    event?: Maybe<Event>;
};

export type CreateVideo = {
    url: Scalars['String'];
    lang: Scalars['String'];
    eventId: Scalars['String'];
};

export type UpdateVideo = {
    eventId: Scalars['String'];
    url: Scalars['String'];
    newUrl?: Maybe<Scalars['String']>;
    lang?: Maybe<Scalars['String']>;
};

export type DeleteVideo = {
    url: Scalars['String'];
    eventId: Scalars['String'];
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
    LoginForm: LoginForm;
    Query: ResolverTypeWrapper<{}>;
    Mutation: ResolverTypeWrapper<{}>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Event: ResolverTypeWrapper<Event>;
    CreateEvent: CreateEvent;
    UpdateEvent: UpdateEvent;
    DeleteEvent: DeleteEvent;
    Subscription: ResolverTypeWrapper<{}>;
    Organization: ResolverTypeWrapper<Organization>;
    CreateOrg: CreateOrg;
    UpdateOrg: UpdateOrg;
    DeleteOrg: DeleteOrg;
    NewMember: NewMember;
    EventLiveFeedback: ResolverTypeWrapper<EventLiveFeedback>;
    CreateFeedback: CreateFeedback;
    HideQuestion: HideQuestion;
    ReorderQuestion: ReorderQuestion;
    AddModerator: AddModerator;
    EventParticipant: ResolverTypeWrapper<EventParticipant>;
    EventQuestion: ResolverTypeWrapper<EventQuestion>;
    Like: ResolverTypeWrapper<Like>;
    CreateQuestion: CreateQuestion;
    AlterLike: AlterLike;
    EventSpeaker: ResolverTypeWrapper<EventSpeaker>;
    SpeakerForm: SpeakerForm;
    UpdateSpeaker: UpdateSpeaker;
    DeleteSpeaker: DeleteSpeaker;
    EventVideo: ResolverTypeWrapper<EventVideo>;
    CreateVideo: CreateVideo;
    UpdateVideo: UpdateVideo;
    DeleteVideo: DeleteVideo;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    Date: Scalars['Date'];
    User: User;
    ID: Scalars['ID'];
    String: Scalars['String'];
    Boolean: Scalars['Boolean'];
    RegistrationForm: RegistrationForm;
    LoginForm: LoginForm;
    Query: {};
    Mutation: {};
    Int: Scalars['Int'];
    Event: Event;
    CreateEvent: CreateEvent;
    UpdateEvent: UpdateEvent;
    DeleteEvent: DeleteEvent;
    Subscription: {};
    Organization: Organization;
    CreateOrg: CreateOrg;
    UpdateOrg: UpdateOrg;
    DeleteOrg: DeleteOrg;
    NewMember: NewMember;
    EventLiveFeedback: EventLiveFeedback;
    CreateFeedback: CreateFeedback;
    HideQuestion: HideQuestion;
    ReorderQuestion: ReorderQuestion;
    AddModerator: AddModerator;
    EventParticipant: EventParticipant;
    EventQuestion: EventQuestion;
    Like: Like;
    CreateQuestion: CreateQuestion;
    AlterLike: AlterLike;
    EventSpeaker: EventSpeaker;
    SpeakerForm: SpeakerForm;
    UpdateSpeaker: UpdateSpeaker;
    DeleteSpeaker: DeleteSpeaker;
    EventVideo: EventVideo;
    CreateVideo: CreateVideo;
    UpdateVideo: UpdateVideo;
    DeleteVideo: DeleteVideo;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
    name: 'Date';
}

export type UserResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
    logout?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    eventById?: Resolver<
        Maybe<ResolversTypes['Event']>,
        ParentType,
        ContextType,
        RequireFields<QueryeventByIdArgs, 'id'>
    >;
    events?: Resolver<Maybe<Array<ResolversTypes['Event']>>, ParentType, ContextType>;
    myOrgs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Organization']>>>, ParentType, ContextType>;
    orgById?: Resolver<
        Maybe<ResolversTypes['Organization']>,
        ParentType,
        ContextType,
        RequireFields<QueryorgByIdArgs, 'id'>
    >;
    myFeedback?: Resolver<Maybe<Array<Maybe<ResolversTypes['EventLiveFeedback']>>>, ParentType, ContextType>;
    questionsByEventId?: Resolver<
        Maybe<Array<ResolversTypes['EventQuestion']>>,
        ParentType,
        ContextType,
        RequireFields<QueryquestionsByEventIdArgs, 'eventId'>
    >;
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
    login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationloginArgs, never>>;
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
    addModerator?: Resolver<
        Maybe<ResolversTypes['User']>,
        ParentType,
        ContextType,
        RequireFields<MutationaddModeratorArgs, never>
    >;
    nextQuestion?: Resolver<
        ResolversTypes['Int'],
        ParentType,
        ContextType,
        RequireFields<MutationnextQuestionArgs, 'eventId'>
    >;
    prevQuestion?: Resolver<
        ResolversTypes['Int'],
        ParentType,
        ContextType,
        RequireFields<MutationprevQuestionArgs, 'eventId'>
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
    addSpeaker?: Resolver<
        Maybe<ResolversTypes['EventSpeaker']>,
        ParentType,
        ContextType,
        RequireFields<MutationaddSpeakerArgs, never>
    >;
    removeSpeaker?: Resolver<
        Maybe<ResolversTypes['EventSpeaker']>,
        ParentType,
        ContextType,
        RequireFields<MutationremoveSpeakerArgs, never>
    >;
    updateSpeaker?: Resolver<
        Maybe<ResolversTypes['EventSpeaker']>,
        ParentType,
        ContextType,
        RequireFields<MutationupdateSpeakerArgs, never>
    >;
    addVideo?: Resolver<
        ResolversTypes['EventVideo'],
        ParentType,
        ContextType,
        RequireFields<MutationaddVideoArgs, 'input'>
    >;
    removeVideo?: Resolver<
        Maybe<ResolversTypes['EventVideo']>,
        ParentType,
        ContextType,
        RequireFields<MutationremoveVideoArgs, never>
    >;
    updateVideo?: Resolver<
        Maybe<ResolversTypes['EventVideo']>,
        ParentType,
        ContextType,
        RequireFields<MutationupdateVideoArgs, 'input'>
    >;
};

export type EventResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']
> = {
    eventId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    startDateTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    endDateTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    topic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isQuestionFeedVisible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isCollectRatingsEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isForumEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isPrivate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    questions?: Resolver<Maybe<Array<ResolversTypes['EventQuestion']>>, ParentType, ContextType>;
    speakers?: Resolver<Maybe<Array<ResolversTypes['EventSpeaker']>>, ParentType, ContextType>;
    registrants?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
    participants?: Resolver<Maybe<Array<ResolversTypes['EventParticipant']>>, ParentType, ContextType>;
    videos?: Resolver<Maybe<Array<ResolversTypes['EventVideo']>>, ParentType, ContextType>;
    liveFeedback?: Resolver<Maybe<Array<ResolversTypes['EventLiveFeedback']>>, ParentType, ContextType>;
    moderators?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
    questionPosition?: SubscriptionResolver<
        ResolversTypes['Int'],
        'questionPosition',
        ParentType,
        ContextType,
        RequireFields<SubscriptionquestionPositionArgs, 'eventId'>
    >;
    eventLiveFeedbackCreated?: SubscriptionResolver<
        Maybe<ResolversTypes['EventLiveFeedback']>,
        'eventLiveFeedbackCreated',
        ParentType,
        ContextType,
        RequireFields<SubscriptioneventLiveFeedbackCreatedArgs, 'eventId'>
    >;
    eventQuestionCreated?: SubscriptionResolver<
        ResolversTypes['EventQuestion'],
        'eventQuestionCreated',
        ParentType,
        ContextType,
        RequireFields<SubscriptioneventQuestionCreatedArgs, 'eventId'>
    >;
    likeCountChanged?: SubscriptionResolver<
        ResolversTypes['Like'],
        'likeCountChanged',
        ParentType,
        ContextType,
        RequireFields<SubscriptionlikeCountChangedArgs, 'eventId'>
    >;
};

export type OrganizationResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']
> = {
    orgId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
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
    feedbackId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
    questionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
    createdById?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
    refQuestionId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
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
    likedByCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    isLikedByMe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']
> = {
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    question?: Resolver<ResolversTypes['EventQuestion'], ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventSpeakerResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['EventSpeaker'] = ResolversParentTypes['EventSpeaker']
> = {
    userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    eventId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
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
    event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
    Date?: GraphQLScalarType;
    User?: UserResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Event?: EventResolvers<ContextType>;
    Subscription?: SubscriptionResolvers<ContextType>;
    Organization?: OrganizationResolvers<ContextType>;
    EventLiveFeedback?: EventLiveFeedbackResolvers<ContextType>;
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
        userId?: LoaderResolver<Scalars['ID'], User, {}, TContext>;
        firstName?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        lastName?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        email?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        isEmailVerified?: LoaderResolver<Maybe<Scalars['Boolean']>, User, {}, TContext>;
        avatar?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>;
        organizations?: LoaderResolver<Maybe<Array<Maybe<Organization>>>, User, {}, TContext>;
    };

    Event?: {
        eventId?: LoaderResolver<Scalars['ID'], Event, {}, TContext>;
        createdBy?: LoaderResolver<Maybe<User>, Event, {}, TContext>;
        organization?: LoaderResolver<Maybe<Organization>, Event, {}, TContext>;
        createdAt?: LoaderResolver<Maybe<Scalars['Date']>, Event, {}, TContext>;
        updatedAt?: LoaderResolver<Maybe<Scalars['Date']>, Event, {}, TContext>;
        title?: LoaderResolver<Maybe<Scalars['String']>, Event, {}, TContext>;
        startDateTime?: LoaderResolver<Maybe<Scalars['Date']>, Event, {}, TContext>;
        endDateTime?: LoaderResolver<Maybe<Scalars['Date']>, Event, {}, TContext>;
        description?: LoaderResolver<Maybe<Scalars['String']>, Event, {}, TContext>;
        topic?: LoaderResolver<Maybe<Scalars['String']>, Event, {}, TContext>;
        isActive?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        isQuestionFeedVisible?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        isCollectRatingsEnabled?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        isForumEnabled?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        isPrivate?: LoaderResolver<Maybe<Scalars['Boolean']>, Event, {}, TContext>;
        questions?: LoaderResolver<Maybe<Array<EventQuestion>>, Event, {}, TContext>;
        speakers?: LoaderResolver<Maybe<Array<EventSpeaker>>, Event, {}, TContext>;
        registrants?: LoaderResolver<Maybe<Array<User>>, Event, {}, TContext>;
        participants?: LoaderResolver<Maybe<Array<EventParticipant>>, Event, {}, TContext>;
        videos?: LoaderResolver<Maybe<Array<EventVideo>>, Event, {}, TContext>;
        liveFeedback?: LoaderResolver<Maybe<Array<EventLiveFeedback>>, Event, {}, TContext>;
        moderators?: LoaderResolver<Maybe<Array<User>>, Event, {}, TContext>;
    };

    Organization?: {
        orgId?: LoaderResolver<Scalars['ID'], Organization, {}, TContext>;
        name?: LoaderResolver<Scalars['String'], Organization, {}, TContext>;
        createdAt?: LoaderResolver<Maybe<Scalars['Date']>, Organization, {}, TContext>;
        members?: LoaderResolver<Maybe<Array<Maybe<User>>>, Organization, {}, TContext>;
        events?: LoaderResolver<Maybe<Array<Maybe<Event>>>, Organization, {}, TContext>;
    };

    EventLiveFeedback?: {
        feedbackId?: LoaderResolver<Scalars['ID'], EventLiveFeedback, {}, TContext>;
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
        questionId?: LoaderResolver<Scalars['ID'], EventQuestion, {}, TContext>;
        event?: LoaderResolver<Maybe<Event>, EventQuestion, {}, TContext>;
        createdById?: LoaderResolver<Maybe<Scalars['ID']>, EventQuestion, {}, TContext>;
        createdBy?: LoaderResolver<Maybe<User>, EventQuestion, {}, TContext>;
        createdAt?: LoaderResolver<Maybe<Scalars['Date']>, EventQuestion, {}, TContext>;
        refQuestionId?: LoaderResolver<Maybe<Scalars['ID']>, EventQuestion, {}, TContext>;
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
        likedByCount?: LoaderResolver<Maybe<Scalars['Int']>, EventQuestion, {}, TContext>;
        isLikedByMe?: LoaderResolver<Maybe<Scalars['Boolean']>, EventQuestion, {}, TContext>;
    };

    Like?: {
        user?: LoaderResolver<User, Like, {}, TContext>;
        question?: LoaderResolver<EventQuestion, Like, {}, TContext>;
    };

    EventSpeaker?: {
        userId?: LoaderResolver<Scalars['ID'], EventSpeaker, {}, TContext>;
        eventId?: LoaderResolver<Scalars['ID'], EventSpeaker, {}, TContext>;
        user?: LoaderResolver<Maybe<User>, EventSpeaker, {}, TContext>;
        name?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
        description?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
        title?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
        picture?: LoaderResolver<Maybe<Scalars['String']>, EventSpeaker, {}, TContext>;
    };

    EventVideo?: {
        url?: LoaderResolver<Scalars['String'], EventVideo, {}, TContext>;
        lang?: LoaderResolver<Scalars['String'], EventVideo, {}, TContext>;
        event?: LoaderResolver<Maybe<Event>, EventVideo, {}, TContext>;
    };
}
declare module 'mercurius' {
    interface IResolvers extends Resolvers<import('mercurius').MercuriusContext> {}
    interface MercuriusLoaders extends Loaders {}
}
