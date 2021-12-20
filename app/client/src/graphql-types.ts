export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type AddQuestionToQueue = {
  eventId: Scalars['ID'];
  questionId: Scalars['ID'];
};

export type AlterLike = {
  questionId: Scalars['ID'];
  /** True if the user is attempting to like the question; false if they are trying to remove a like */
  to: Scalars['Boolean'];
};

export type CreateEvent = {
  description: Scalars['String'];
  endDateTime: Scalars['Date'];
  orgId: Scalars['String'];
  startDateTime: Scalars['Date'];
  title: Scalars['String'];
  topic: Scalars['String'];
};

export type CreateFeedback = {
  eventId: Scalars['ID'];
  isReply?: Maybe<Scalars['Boolean']>;
  message: Scalars['String'];
  refFeedbackId?: Maybe<Scalars['ID']>;
};

export type CreateInvite = {
  email: Scalars['String'];
  eventId: Scalars['ID'];
};

/** Info necessary for adding a member to an organization */
export type CreateMember = {
  email: Scalars['String'];
  orgId: Scalars['ID'];
};

export type CreateModerator = {
  email: Scalars['String'];
  eventId: Scalars['ID'];
};

/** Necessary information for org creation */
export type CreateOrganization = {
  name: Scalars['String'];
};

export type CreateQuestion = {
  eventId: Scalars['ID'];
  isFollowUp?: Maybe<Scalars['Boolean']>;
  isQuote?: Maybe<Scalars['Boolean']>;
  question: Scalars['String'];
  refQuestion?: Maybe<Scalars['ID']>;
};

export type CreateSpeaker = {
  description: Scalars['String'];
  /** This is for matching the speaker to an account */
  email: Scalars['String'];
  eventId: Scalars['String'];
  name: Scalars['String'];
  pictureUrl: Scalars['String'];
  title: Scalars['String'];
};

export type CreateVideo = {
  eventId: Scalars['String'];
  lang: Scalars['String'];
  url: Scalars['String'];
};


export type DeleteAccountForm = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DeleteEvent = {
  eventId: Scalars['String'];
};

export type DeleteMember = {
  orgId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type DeleteModerator = {
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};

/** Information necessary for deleting an org */
export type DeleteOrganization = {
  orgId: Scalars['ID'];
};

export type DeleteSpeaker = {
  /** Necessary for verifying user permissions */
  eventId: Scalars['String'];
  id: Scalars['String'];
};

export type DeleteVideo = {
  eventId: Scalars['String'];
  id: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type Event = Node & {
  __typename?: 'Event';
  createdAt?: Maybe<Scalars['Date']>;
  /** Creator of this event */
  createdBy?: Maybe<User>;
  /** The question currently being asked, corresponds to a "position" value on the event question */
  currentQuestion?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  /** The planned end date time string */
  endDateTime?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  /** List of users who can view event when private */
  invited?: Maybe<UserConnection>;
  /** Whether or not the Event is live */
  isActive?: Maybe<Scalars['Boolean']>;
  /** Collect user ratings after the event has ended */
  isCollectRatingsEnabled?: Maybe<Scalars['Boolean']>;
  /** Display a forum-like interface once the "live" part of the event is over */
  isForumEnabled?: Maybe<Scalars['Boolean']>;
  /** Is the event private, ie invite only */
  isPrivate?: Maybe<Scalars['Boolean']>;
  /** Let all users see what questions have been submitted */
  isQuestionFeedVisible?: Maybe<Scalars['Boolean']>;
  /** Whether or not the viewer is invited */
  isViewerInvited?: Maybe<Scalars['Boolean']>;
  /** Whether or not the viewer is a moderator */
  isViewerModerator?: Maybe<Scalars['Boolean']>;
  /** Live Feedback given during the event */
  liveFeedback?: Maybe<EventLiveFeedbackConnection>;
  /** List of moderators for this particular event */
  moderators?: Maybe<UserConnection>;
  /** The owning organization */
  organization?: Maybe<Organization>;
  /** Participants of the event -- individuals who showed up */
  participants?: Maybe<EventParticipantConnection>;
<<<<<<< HEAD
<<<<<<< HEAD
  /** Questions having to do with the queue */
  questionQueue?: Maybe<EventQuestionQueue>;
  /** All questions relating to this event */
  questions?: Maybe<EventQuestionConnection>;
  /**
   * Questions queued in this session by the moderator(s)
   * TODO: #QQRedesign delete after code complete
   */
=======
=======
>>>>>>> chore(project): updated generation
  /** All questions relating to this event */
  questions?: Maybe<EventQuestionConnection>;
  /** Questions queued in this session by the moderator(s) */
>>>>>>> chore(project): updated generation
  queuedQuestions?: Maybe<EventQuestionConnection>;
  /** Registrants for this event -- individuals invited */
  registrants?: Maybe<UserConnection>;
  /** Speakers for this event */
  speakers?: Maybe<EventSpeakerConnection>;
  /** The planned start date time string */
  startDateTime?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  topic?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  /** Video feeds and the languages */
  videos?: Maybe<EventVideoConnection>;
};


export type EventInvitedArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


export type EventLiveFeedbackArgs = {
<<<<<<< HEAD
<<<<<<< HEAD
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


export type EventModeratorsArgs = {
=======
>>>>>>> chore(project): updated generation
=======
>>>>>>> chore(project): updated generation
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


<<<<<<< HEAD
<<<<<<< HEAD
export type EventParticipantsArgs = {
=======
export type EventModeratorsArgs = {
>>>>>>> chore(project): updated generation
=======
export type EventModeratorsArgs = {
>>>>>>> chore(project): updated generation
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


<<<<<<< HEAD
<<<<<<< HEAD
export type EventQuestionQueueArgs = {
=======
export type EventParticipantsArgs = {
>>>>>>> chore(project): updated generation
=======
export type EventParticipantsArgs = {
>>>>>>> chore(project): updated generation
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


export type EventQuestionsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


export type EventQueuedQuestionsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


export type EventSpeakersArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


export type EventVideosArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};

/** Connection to Events */
export type EventConnection = {
  __typename?: 'EventConnection';
  edges?: Maybe<Array<EventEdge>>;
  pageInfo: PageInfo;
};

/** Event Edge */
export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String'];
  node: Event;
<<<<<<< HEAD
<<<<<<< HEAD
};

export type EventFeedbackMutationResponse = MutationResponse & {
  __typename?: 'EventFeedbackMutationResponse';
  body?: Maybe<EventLiveFeedbackEdge>;
  isError: Scalars['Boolean'];
  message: Scalars['String'];
=======
>>>>>>> chore(project): updated generation
=======
>>>>>>> chore(project): updated generation
};

export type EventLiveFeedback = Node & {
  __typename?: 'EventLiveFeedback';
<<<<<<< HEAD
<<<<<<< HEAD
  createdAt?: Maybe<Scalars['Date']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['ID']>;
  event?: Maybe<Event>;
  id: Scalars['ID'];
  isReply?: Maybe<Scalars['Boolean']>;
  message: Scalars['String'];
  refFeedback?: Maybe<EventLiveFeedback>;
=======
=======
>>>>>>> chore(project): updated generation
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  event?: Maybe<Event>;
  id: Scalars['ID'];
  message: Scalars['String'];
<<<<<<< HEAD
>>>>>>> chore(project): updated generation
=======
>>>>>>> chore(project): updated generation
};

export type EventLiveFeedbackConnection = {
  __typename?: 'EventLiveFeedbackConnection';
  edges?: Maybe<Array<EventLiveFeedbackEdge>>;
  pageInfo: PageInfo;
};

export type EventLiveFeedbackEdge = {
  __typename?: 'EventLiveFeedbackEdge';
  cursor: Scalars['String'];
  node: EventLiveFeedback;
};

export type EventMutationResponse = MutationResponse & {
  __typename?: 'EventMutationResponse';
  body?: Maybe<Event>;
  isError: Scalars['Boolean'];
  message: Scalars['String'];
};

export type EventParticipant = {
  __typename?: 'EventParticipant';
  liveFeedBack?: Maybe<Array<Maybe<EventLiveFeedback>>>;
  questions?: Maybe<Array<Maybe<EventQuestion>>>;
  user?: Maybe<User>;
};

export type EventParticipantConnection = {
  __typename?: 'EventParticipantConnection';
  edges?: Maybe<Array<EventParticipantEdge>>;
  pageInfo: PageInfo;
};

export type EventParticipantEdge = {
  __typename?: 'EventParticipantEdge';
  cursor: Scalars['String'];
  node: EventParticipant;
};

export type EventQuestion = Node & {
  __typename?: 'EventQuestion';
  createdAt?: Maybe<Scalars['Date']>;
  /** User information on the person asking the question */
  createdBy?: Maybe<User>;
  /** The user id of the creator */
  createdById?: Maybe<Scalars['ID']>;
  event?: Maybe<Event>;
  id: Scalars['ID'];
  isAsked?: Maybe<Scalars['Boolean']>;
  isFollowUp?: Maybe<Scalars['Boolean']>;
  /** Whether or not the current user likes the question */
  isLikedByViewer?: Maybe<Scalars['Boolean']>;
  /** If the question is owned by the current viewer */
  isMyQuestion?: Maybe<Scalars['Boolean']>;
  isQuote?: Maybe<Scalars['Boolean']>;
  isVisible?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<Scalars['String']>;
  /** The users who have liked this question */
  likedBy?: Maybe<UserConnection>;
  /** Find the count of the likes only */
  likedByCount?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  /** The actual content of the question */
  question?: Maybe<Scalars['String']>;
  refQuestion?: Maybe<EventQuestion>;
};

export type EventQuestionConnection = {
  __typename?: 'EventQuestionConnection';
  edges?: Maybe<Array<EventQuestionEdge>>;
  pageInfo: PageInfo;
};

export type EventQuestionEdge = {
  __typename?: 'EventQuestionEdge';
  cursor: Scalars['String'];
  node: EventQuestion;
<<<<<<< HEAD
<<<<<<< HEAD
};

/** Required to reduce frontend complexity due to relay limitation https://github.com/facebook/relay/issues/3457 */
export type EventQuestionEdgeContainer = {
  __typename?: 'EventQuestionEdgeContainer';
  edge: EventQuestionEdge;
=======
>>>>>>> chore(project): updated generation
=======
>>>>>>> chore(project): updated generation
};

export type EventQuestionMutationResponse = MutationResponse & {
  __typename?: 'EventQuestionMutationResponse';
  body?: Maybe<EventQuestionEdge>;
  isError: Scalars['Boolean'];
  message: Scalars['String'];
<<<<<<< HEAD
<<<<<<< HEAD
};

/** EventQuestionQueue is the entire queue of the event */
export type EventQuestionQueue = {
  __typename?: 'EventQuestionQueue';
  enqueuedQuestions?: Maybe<EventQuestionConnection>;
  /** last index is current question */
  questionRecord?: Maybe<EventQuestionConnection>;
};


/** EventQuestionQueue is the entire queue of the event */
export type EventQuestionQueueEnqueuedQuestionsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


/** EventQuestionQueue is the entire queue of the event */
export type EventQuestionQueueQuestionRecordArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
=======
>>>>>>> chore(project): updated generation
=======
>>>>>>> chore(project): updated generation
};

export type EventSpeaker = Node & {
  __typename?: 'EventSpeaker';
  /** Description set by the organizer of the event */
  description?: Maybe<Scalars['String']>;
  /** email of the speaker */
  email?: Maybe<Scalars['String']>;
  /** Event eventId that this user is speaking at */
  eventId?: Maybe<Scalars['ID']>;
  /** Speaker id */
  id: Scalars['ID'];
  /** Name set by the organizer of the event */
  name?: Maybe<Scalars['String']>;
  /** Picture set by the organizer of the event */
  pictureUrl?: Maybe<Scalars['String']>;
  /** Title set by the organizer of the event */
  title?: Maybe<Scalars['String']>;
  /** The related user account associated with the speaker */
  user?: Maybe<User>;
};

export type EventSpeakerConnection = {
  __typename?: 'EventSpeakerConnection';
  edges?: Maybe<Array<EventSpeakerEdge>>;
  pageInfo: PageInfo;
};

export type EventSpeakerEdge = {
  __typename?: 'EventSpeakerEdge';
  cursor: Scalars['String'];
  node: EventSpeaker;
};

export type EventSpeakerMutationResponse = MutationResponse & {
  __typename?: 'EventSpeakerMutationResponse';
  body?: Maybe<EventSpeaker>;
  isError: Scalars['Boolean'];
  message: Scalars['String'];
};

export type EventVideo = Node & {
  __typename?: 'EventVideo';
  event?: Maybe<Event>;
  id: Scalars['ID'];
  lang: Scalars['String'];
  url: Scalars['String'];
};

export type EventVideoConnection = {
  __typename?: 'EventVideoConnection';
  edges?: Maybe<Array<EventVideoEdge>>;
  pageInfo: PageInfo;
};

export type EventVideoEdge = {
  __typename?: 'EventVideoEdge';
  cursor: Scalars['String'];
  node: EventVideo;
};

export type EventVideoMutationResponse = MutationResponse & {
  __typename?: 'EventVideoMutationResponse';
  body?: Maybe<EventVideo>;
  isError: Scalars['Boolean'];
  message: Scalars['String'];
<<<<<<< HEAD
<<<<<<< HEAD
};

export type FeedbackOperation = {
  __typename?: 'FeedbackOperation';
  edge: EventLiveFeedbackEdge;
  operationType: Operation;
=======
>>>>>>> chore(project): updated generation
=======
>>>>>>> chore(project): updated generation
};

export type HideQuestion = {
  eventId: Scalars['ID'];
  questionId: Scalars['ID'];
  /** Goal state. If we want to change the state to hidden, toggleTo is true; false otherwise. */
  toggleTo: Scalars['Boolean'];
};

export type InviteMutationResponse = MutationResponse & {
  __typename?: 'InviteMutationResponse';
  isError: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  question: EventQuestion;
  user: User;
};

export type LoginForm = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ModeratorMutationResponse = MutationResponse & {
  __typename?: 'ModeratorMutationResponse';
  body?: Maybe<User>;
  isError: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addQuestionToQueue: EventQuestionMutationResponse;
  alterLike: EventQuestionMutationResponse;
  createEvent: EventMutationResponse;
  createFeedback?: Maybe<EventFeedbackMutationResponse>;
  createInvite: InviteMutationResponse;
  /** Adds a new member and returns the new user added */
  createMember: UserMutationResponse;
  /** Add a new moderator to the given event */
  createModerator: ModeratorMutationResponse;
  createOrganization: OrganizationMutationResponse;
  createQuestion: EventQuestionMutationResponse;
  createSpeaker: EventSpeakerMutationResponse;
  createVideo: EventVideoMutationResponse;
  deleteAccount: UserMutationResponse;
  deleteEvent: EventMutationResponse;
  /** Delete a member from the organization */
  deleteMember: UserMutationResponse;
  /** Removes a moderator from a given event */
  deleteModerator: ModeratorMutationResponse;
  deleteOrganization: OrganizationMutationResponse;
  deleteSpeaker: EventSpeakerMutationResponse;
  deleteVideo: EventVideoMutationResponse;
  /** End the event so that it is not live */
  endEvent: EventMutationResponse;
  hideQuestion?: Maybe<EventQuestion>;
  login: UserMutationResponse;
  /** The logout just returns the timestamp of the logout action */
  logout: Scalars['Date'];
  /**
   * Advance the current question
   * TODO: make this an EventMutationResponse
   */
  nextQuestion: Event;
  /**
   * Go to the previous question
   * TODO: make this an EventMutationResponse
   */
  prevQuestion: Event;
  register: UserMutationResponse;
  removeQuestionFromQueue: EventQuestionMutationResponse;
  /** Start the event so that it is "live" */
  startEvent: EventMutationResponse;
  updateEmail: UserMutationResponse;
  updateEvent: EventMutationResponse;
  updateModerator: ModeratorMutationResponse;
  updateOrganization: OrganizationMutationResponse;
  updatePassword: UserMutationResponse;
  updateQuestionPosition: EventQuestionMutationResponse;
  updateQuestionQueue: EventQuestionMutationResponse;
  updateSpeaker: EventSpeakerMutationResponse;
  updateVideo: EventVideoMutationResponse;
};


export type MutationAddQuestionToQueueArgs = {
  input: AddQuestionToQueue;
};


export type MutationAlterLikeArgs = {
  input: AlterLike;
};


export type MutationCreateEventArgs = {
  event: CreateEvent;
};


export type MutationCreateFeedbackArgs = {
  input?: Maybe<CreateFeedback>;
};


export type MutationCreateInviteArgs = {
  input: CreateInvite;
};


export type MutationCreateMemberArgs = {
  input: CreateMember;
};


export type MutationCreateModeratorArgs = {
  input: CreateModerator;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganization;
};


export type MutationCreateQuestionArgs = {
  input: CreateQuestion;
};


export type MutationCreateSpeakerArgs = {
  input: CreateSpeaker;
};


export type MutationCreateVideoArgs = {
  input: CreateVideo;
};


export type MutationDeleteAccountArgs = {
  input: DeleteAccountForm;
};


export type MutationDeleteEventArgs = {
  event: DeleteEvent;
};


export type MutationDeleteMemberArgs = {
  input: DeleteMember;
};


export type MutationDeleteModeratorArgs = {
  input: DeleteModerator;
};


export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganization;
};


export type MutationDeleteSpeakerArgs = {
  input: DeleteSpeaker;
};


export type MutationDeleteVideoArgs = {
  input: DeleteVideo;
};


export type MutationEndEventArgs = {
  eventId: Scalars['String'];
};


export type MutationHideQuestionArgs = {
  input: HideQuestion;
};


export type MutationLoginArgs = {
  input: LoginForm;
};


export type MutationNextQuestionArgs = {
  eventId: Scalars['ID'];
};


export type MutationPrevQuestionArgs = {
  eventId: Scalars['ID'];
};


export type MutationRegisterArgs = {
  input: RegistrationForm;
};


export type MutationRemoveQuestionFromQueueArgs = {
  input: RemoveQuestionFromQueue;
};


export type MutationStartEventArgs = {
  eventId: Scalars['String'];
};


export type MutationUpdateEmailArgs = {
  input: UpdateEmailForm;
};


export type MutationUpdateEventArgs = {
  event: UpdateEvent;
};


export type MutationUpdateModeratorArgs = {
  input: UpdateModerator;
};


export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganization;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordForm;
};


export type MutationUpdateQuestionPositionArgs = {
  input: UpdateQuestionPosition;
};


export type MutationUpdateQuestionQueueArgs = {
  input: UpdateQuestionQueue;
};


export type MutationUpdateSpeakerArgs = {
  input: UpdateSpeaker;
};


export type MutationUpdateVideoArgs = {
  input: UpdateVideo;
};

export type MutationResponse = {
  isError: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export enum Operation {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export type Organization = Node & {
  __typename?: 'Organization';
  /** When this org was created */
  createdAt?: Maybe<Scalars['Date']>;
  /** Events owned by this organization */
  events?: Maybe<EventConnection>;
  /** Unique identifier for this org */
  id: Scalars['ID'];
  /** Whether or not the current viewer is a member */
  isViewerMember?: Maybe<Scalars['Boolean']>;
  /** all members of this org */
  members?: Maybe<UserConnection>;
  /** name of the org */
  name: Scalars['String'];
};


export type OrganizationEventsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


export type OrganizationMembersArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};

export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  edges?: Maybe<Array<OrganizationEdge>>;
  pageInfo: PageInfo;
};

export type OrganizationEdge = {
  __typename?: 'OrganizationEdge';
  cursor: Scalars['String'];
  node: Organization;
};

export type OrganizationMutationResponse = MutationResponse & {
  __typename?: 'OrganizationMutationResponse';
  body?: Maybe<Organization>;
  isError: Scalars['Boolean'];
  message: Scalars['String'];
};

export type OrganizationSubscription = {
  __typename?: 'OrganizationSubscription';
  deleteMember: Scalars['Boolean'];
  orgId: Scalars['ID'];
  userId?: Maybe<Scalars['ID']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Fetch all events */
  events?: Maybe<Array<Event>>;
  /** Fetch user data about the current user */
  me?: Maybe<User>;
  myFeedback?: Maybe<Array<Maybe<EventLiveFeedback>>>;
  /** Fetch organizations relevant to the current user */
  myOrgs?: Maybe<Array<Organization>>;
  node?: Maybe<Node>;
  questionsByEventId?: Maybe<Array<EventQuestion>>;
  validateInvite: ValidateInviteQueryResponse;
};


export type QueryMyFeedbackArgs = {
  eventId: Scalars['ID'];
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryQuestionsByEventIdArgs = {
  eventId: Scalars['ID'];
};


export type QueryValidateInviteArgs = {
  input: ValidateInvite;
};

/** TODO: #QQRedesign dlete after code complete */
export type QuestionOperation = {
  __typename?: 'QuestionOperation';
  edge: EventQuestionEdge;
  operationType: Operation;
};

export type RegistrationForm = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type RemoveQuestionFromQueue = {
  eventId: Scalars['ID'];
  questionId: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  enqueuedPushQuestion: EventQuestionEdgeContainer;
  enqueuedRemoveQuestion: EventQuestionEdgeContainer;
  enqueuedUnshiftQuestion: EventQuestionEdgeContainer;
  /** New messages as feedback is given */
  eventLiveFeedbackCreated: EventLiveFeedback;
  /** TODO: #QQRedesign delete after code complete */
  eventUpdates: Event;
  feedbackCRUD: FeedbackOperation;
  /** subscription for whenever a new org is added */
  orgUpdated: OrganizationSubscription;
  questionAddedToEnqueued: EventQuestionEdgeContainer;
  questionAddedToRecord: EventQuestionEdgeContainer;
  /**
   * Question subscription for all operations performed on questions
   * TODO: #QQRedesign delete after code complete
   */
  questionCRUD: QuestionOperation;
  questionCreated: EventQuestionEdgeContainer;
  questionDeleted: EventQuestionEdgeContainer;
  /**
   * subscription for whenever questions are added to the queue
   * TODO: #QQRedesign delete once code complete
   */
  questionQueued: EventQuestion;
  questionRemovedFromEnqueued: EventQuestionEdgeContainer;
  questionRemovedFromRecord: EventQuestionEdgeContainer;
  questionUpdated: EventQuestionEdgeContainer;
  recordPushQuestion: EventQuestionEdgeContainer;
  recordRemoveQuestion: EventQuestionEdgeContainer;
  recordUnshiftQuestion: EventQuestionEdgeContainer;
};


export type SubscriptionEnqueuedPushQuestionArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionEnqueuedRemoveQuestionArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionEnqueuedUnshiftQuestionArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionEventLiveFeedbackCreatedArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionEventUpdatesArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionFeedbackCrudArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionQuestionAddedToEnqueuedArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionQuestionAddedToRecordArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionQuestionCrudArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionQuestionCreatedArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionQuestionDeletedArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionQuestionQueuedArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionQuestionRemovedFromEnqueuedArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionQuestionRemovedFromRecordArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionQuestionUpdatedArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionRecordPushQuestionArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionRecordRemoveQuestionArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionRecordUnshiftQuestionArgs = {
  eventId: Scalars['ID'];
};

export type UpdateEmailForm = {
  currentEmail: Scalars['String'];
  newEmail: Scalars['String'];
};

export type UpdateEvent = {
  description?: Maybe<Scalars['String']>;
  endDateTime?: Maybe<Scalars['Date']>;
  eventId: Scalars['String'];
  isCollectRatingsEnabled?: Maybe<Scalars['Boolean']>;
  isForumEnabled?: Maybe<Scalars['Boolean']>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  isQuestionFeedVisible?: Maybe<Scalars['Boolean']>;
  startDateTime?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
  topic?: Maybe<Scalars['String']>;
};

export type UpdateModerator = {
  email: Scalars['String'];
  eventId: Scalars['ID'];
};

/** Information that may be updated by the user */
export type UpdateOrganization = {
  name: Scalars['String'];
  orgId: Scalars['ID'];
};

export type UpdatePasswordForm = {
  confirmNewPassword: Scalars['String'];
  email: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type UpdateQuestionPosition = {
  eventId: Scalars['ID'];
  position: Scalars['Int'];
  questionId: Scalars['ID'];
};

export type UpdateQuestionQueue = {
  adding: Scalars['Boolean'];
  eventId: Scalars['ID'];
  questionId: Scalars['ID'];
};

export type UpdateSpeaker = {
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  eventId: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  pictureUrl?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateVideo = {
  eventId: Scalars['String'];
  lang?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  videoId: Scalars['String'];
};

/** User Data */
export type User = Node & {
  __typename?: 'User';
  /** Avatar URL if null then no avatar is uploaded */
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isEmailVerified?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  /** Organizations that this user belongs to */
  organizations?: Maybe<OrganizationConnection>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<UserEdge>>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  body?: Maybe<User>;
  isError: Scalars['Boolean'];
  message: Scalars['String'];
};

export type UserSettings = {
  __typename?: 'UserSettings';
  currentEmail: Scalars['String'];
  deleteAccount: Scalars['Boolean'];
  isAnonymous: Scalars['Boolean'];
  isNotificationsEnabled: Scalars['Boolean'];
  updateEmail?: Maybe<Scalars['String']>;
  updatePassword?: Maybe<Scalars['String']>;
};

export type ValidateInvite = {
  eventId: Scalars['ID'];
  token: Scalars['String'];
};

export type ValidateInviteQueryResponse = {
  __typename?: 'ValidateInviteQueryResponse';
  valid: Scalars['Boolean'];
};
