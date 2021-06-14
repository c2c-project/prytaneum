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

export type AlterLike = {
  questionId: Scalars['ID'];
  /** True if the user is attempting to like the question; false if they are trying to remove a like */
  to: Scalars['Boolean'];
};

export type CreateEvent = {
  title: Scalars['String'];
  startDateTime: Scalars['Date'];
  endDateTime: Scalars['Date'];
  description: Scalars['String'];
  topic: Scalars['String'];
  orgId: Scalars['String'];
};

export type CreateFeedback = {
  message: Scalars['String'];
};

export type CreateModerator = {
  email: Scalars['String'];
  eventId: Scalars['String'];
};

/** Necessary information for org creation */
export type CreateOrganization = {
  name: Scalars['String'];
};

export type CreateQuestion = {
  question: Scalars['String'];
  isQuote?: Maybe<Scalars['Boolean']>;
  isFollowUp?: Maybe<Scalars['Boolean']>;
  refQuestion?: Maybe<Scalars['ID']>;
  eventId: Scalars['ID'];
};

export type CreateSpeaker = {
  eventId: Scalars['String'];
  name: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  pictureUrl: Scalars['String'];
  /** This is for matching the speaker to an account */
  email: Scalars['String'];
};

export type CreateVideo = {
  url: Scalars['String'];
  lang: Scalars['String'];
  eventId: Scalars['String'];
};


export type DeleteEvent = {
  eventId: Scalars['String'];
};

export type DeleteModerator = {
  userId: Scalars['String'];
  eventId: Scalars['String'];
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
  id: Scalars['ID'];
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
  questions?: Maybe<EventQuestionConnection>;
  /** Speakers for this event */
  speakers?: Maybe<EventSpeakerConnection>;
  /** Registrants for this event -- individuals invited */
  registrants?: Maybe<UserConnection>;
  /** Participants of the event -- individuals who showed up */
  participants?: Maybe<EventParticipantConnection>;
  /** Video feeds and the languages */
  videos?: Maybe<EventVideoConnection>;
  /** Live Feedback given during the event */
  liveFeedback?: Maybe<EventLiveFeedbackConnection>;
  /** List of moderators for this particular event */
  moderators?: Maybe<UserConnection>;
  /** Whether or not the viewer is a moderator */
  isViewerModerator?: Maybe<Scalars['Boolean']>;
  /** Questions queued in this session by the moderator(s) */
  queuedQuestions?: Maybe<EventQuestionConnection>;
  /** The question currently being asked, corresponds to a "position" value on the event question */
  currentQuestion?: Maybe<Scalars['Int']>;
};


export type EventQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type EventSpeakersArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type EventParticipantsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type EventVideosArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type EventLiveFeedbackArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type EventModeratorsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type EventQueuedQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
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
  node: Event;
  cursor: Scalars['String'];
};

export type EventLiveFeedback = Node & {
  __typename?: 'EventLiveFeedback';
  id: Scalars['ID'];
  message: Scalars['String'];
  event?: Maybe<Event>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
};

export type EventLiveFeedbackConnection = {
  __typename?: 'EventLiveFeedbackConnection';
  edges?: Maybe<Array<EventLiveFeedbackEdge>>;
  pageInfo: PageInfo;
};

export type EventLiveFeedbackEdge = {
  __typename?: 'EventLiveFeedbackEdge';
  node: EventLiveFeedback;
  cursor: Scalars['String'];
};

export type EventMutationResponse = MutationResponse & {
  __typename?: 'EventMutationResponse';
  isError: Scalars['Boolean'];
  message: Scalars['String'];
  body?: Maybe<Event>;
};

export type EventParticipant = {
  __typename?: 'EventParticipant';
  user?: Maybe<User>;
  questions?: Maybe<Array<Maybe<EventQuestion>>>;
  liveFeedBack?: Maybe<Array<Maybe<EventLiveFeedback>>>;
};

export type EventParticipantConnection = {
  __typename?: 'EventParticipantConnection';
  edges?: Maybe<Array<EventParticipantEdge>>;
  pageInfo: PageInfo;
};

export type EventParticipantEdge = {
  __typename?: 'EventParticipantEdge';
  node: EventParticipant;
  cursor: Scalars['String'];
};

export type EventQuestion = Node & {
  __typename?: 'EventQuestion';
  id: Scalars['ID'];
  event?: Maybe<Event>;
  /** The user id of the creator */
  createdById?: Maybe<Scalars['ID']>;
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
  /** The users who have liked this question */
  likedBy?: Maybe<UserConnection>;
  /** Find the count of the likes only */
  likedByCount?: Maybe<Scalars['Int']>;
  /** Whether or not the current user likes the question */
  isLikedByViewer?: Maybe<Scalars['Boolean']>;
  /** If the question is owned by the current viewer */
  isMyQuestion?: Maybe<Scalars['Boolean']>;
};

export type EventQuestionConnection = {
  __typename?: 'EventQuestionConnection';
  edges?: Maybe<Array<EventQuestionEdge>>;
  pageInfo: PageInfo;
};

export type EventQuestionEdge = {
  __typename?: 'EventQuestionEdge';
  node: EventQuestion;
  cursor: Scalars['String'];
};

export type EventQuestionMutationResponse = MutationResponse & {
  __typename?: 'EventQuestionMutationResponse';
  isError: Scalars['Boolean'];
  message: Scalars['String'];
  body?: Maybe<EventQuestionEdge>;
};

export type EventSpeaker = Node & {
  __typename?: 'EventSpeaker';
  /** Speaker id */
  id: Scalars['ID'];
  /** email of the speaker */
  email?: Maybe<Scalars['String']>;
  /** Event eventId that this user is speaking at */
  eventId?: Maybe<Scalars['ID']>;
  /** The related user account associated with the speaker */
  user?: Maybe<User>;
  /** Name set by the organizer of the event */
  name?: Maybe<Scalars['String']>;
  /** Description set by the organizer of the event */
  description?: Maybe<Scalars['String']>;
  /** Title set by the organizer of the event */
  title?: Maybe<Scalars['String']>;
  /** Picture set by the organizer of the event */
  pictureUrl?: Maybe<Scalars['String']>;
};

export type EventSpeakerConnection = {
  __typename?: 'EventSpeakerConnection';
  edges?: Maybe<Array<EventSpeakerEdge>>;
  pageInfo: PageInfo;
};

export type EventSpeakerEdge = {
  __typename?: 'EventSpeakerEdge';
  node: EventSpeaker;
  cursor: Scalars['String'];
};

export type EventSpeakerMutationResponse = MutationResponse & {
  __typename?: 'EventSpeakerMutationResponse';
  isError: Scalars['Boolean'];
  message: Scalars['String'];
  body?: Maybe<EventSpeaker>;
};

export type EventVideo = Node & {
  __typename?: 'EventVideo';
  id: Scalars['ID'];
  url: Scalars['String'];
  lang: Scalars['String'];
  event?: Maybe<Event>;
};

export type EventVideoConnection = {
  __typename?: 'EventVideoConnection';
  edges?: Maybe<Array<EventVideoEdge>>;
  pageInfo: PageInfo;
};

export type EventVideoEdge = {
  __typename?: 'EventVideoEdge';
  node: EventVideo;
  cursor: Scalars['String'];
};

export type EventVideoMutationResponse = MutationResponse & {
  __typename?: 'EventVideoMutationResponse';
  isError: Scalars['Boolean'];
  message: Scalars['String'];
  body?: Maybe<EventVideo>;
};

export type HideQuestion = {
  questionId: Scalars['ID'];
  eventId: Scalars['ID'];
  /** Goal state. If we want to change the state to hidden, toggleTo is true; false otherwise. */
  toggleTo: Scalars['Boolean'];
};

export type Like = {
  __typename?: 'Like';
  user: User;
  question: EventQuestion;
};

export type LoginForm = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ModeratorMutationResponse = MutationResponse & {
  __typename?: 'ModeratorMutationResponse';
  isError: Scalars['Boolean'];
  message: Scalars['String'];
  body?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds a new member and returns the new user added */
  addMember?: Maybe<User>;
  alterLike: EventQuestionMutationResponse;
  createEvent: EventMutationResponse;
  createFeedback?: Maybe<EventLiveFeedback>;
  /** Add a new moderator to the given event */
  createModerator: ModeratorMutationResponse;
  createOrganization: OrganizationMutationResponse;
  createQuestion: EventQuestionMutationResponse;
  createSpeaker: EventSpeakerMutationResponse;
  createVideo: EventVideoMutationResponse;
  deleteEvent: EventMutationResponse;
  /** Removes a moderator from a given event */
  deleteModerator: ModeratorMutationResponse;
  deleteOrganizationById: OrganizationMutationResponse;
  deleteSpeaker: EventSpeakerMutationResponse;
  deleteVideo: EventVideoMutationResponse;
  /** End the event so that it is not live */
  endEvent: EventMutationResponse;
  hideQuestion?: Maybe<EventQuestion>;
  login: UserMutationResponse;
  /** The logout just returns the timestamp of the logout action */
  logout: Scalars['Date'];
  /** Advance the current question */
  nextQuestion: Scalars['Int'];
  /** Go to the previous question */
  prevQuestion: Scalars['Int'];
  register: UserMutationResponse;
  reorderQueue?: Maybe<EventQuestion>;
  /** Start the event so that it is "live" */
  startEvent: EventMutationResponse;
  updateEvent: EventMutationResponse;
  updateModerator: ModeratorMutationResponse;
  updateOrganizationById: OrganizationMutationResponse;
  updateSpeaker: EventSpeakerMutationResponse;
  updateVideo: EventVideoMutationResponse;
};


export type MutationAddMemberArgs = {
  input: NewMember;
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


export type MutationDeleteEventArgs = {
  event: DeleteEvent;
};


export type MutationDeleteModeratorArgs = {
  input: DeleteModerator;
};


export type MutationDeleteOrganizationByIdArgs = {
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


export type MutationReorderQueueArgs = {
  input: ReorderQuestion;
};


export type MutationStartEventArgs = {
  eventId: Scalars['String'];
};


export type MutationUpdateEventArgs = {
  event: UpdateEvent;
};


export type MutationUpdateModeratorArgs = {
  input: UpdateModerator;
};


export type MutationUpdateOrganizationByIdArgs = {
  input: UpdateOrganization;
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

/** Info necessary for adding a member to an organization */
export type NewMember = {
  email: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Organization = Node & {
  __typename?: 'Organization';
  /** Unique identifier for this org */
  id: Scalars['ID'];
  /** name of the org */
  name: Scalars['String'];
  /** When this org was created */
  createdAt?: Maybe<Scalars['Date']>;
  /** all members of this org */
  members?: Maybe<UserConnection>;
  /** Events owned by this organization */
  events?: Maybe<EventConnection>;
  /** Whether or not the current viewer is a member */
  isViewerMember?: Maybe<Scalars['Boolean']>;
};


export type OrganizationMembersArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};


export type OrganizationEventsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};

export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  edges?: Maybe<Array<OrganizationEdge>>;
  pageInfo: PageInfo;
};

export type OrganizationEdge = {
  __typename?: 'OrganizationEdge';
  node: Organization;
  cursor: Scalars['String'];
};

export type OrganizationMutationResponse = MutationResponse & {
  __typename?: 'OrganizationMutationResponse';
  isError: Scalars['Boolean'];
  message: Scalars['String'];
  body?: Maybe<Organization>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
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
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryQuestionsByEventIdArgs = {
  eventId: Scalars['ID'];
};

export type RegistrationForm = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
};

export type ReorderQuestion = {
  questionId: Scalars['ID'];
  position: Scalars['Int'];
  eventId: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** New messages as feedback is given */
  eventLiveFeedbackCreated: EventLiveFeedback;
  eventQuestionCreated: EventQuestionEdge;
  likeCountChanged: EventQuestionEdge;
  /** Question subscription for all operations performed on questions */
  questionCRUD: EventQuestionEdge;
  /** Whenever a moderator updates a question's position -- questions newly added to the queue is considered a position update */
  questionLikeOrPositionUpdate: EventQuestion;
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


export type SubscriptionQuestionCrudArgs = {
  eventId: Scalars['ID'];
};


export type SubscriptionQuestionLikeOrPositionUpdateArgs = {
  eventId: Scalars['ID'];
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

export type UpdateModerator = {
  userId: Scalars['String'];
  eventId: Scalars['String'];
};

/** Information that may be updated by the user */
export type UpdateOrganization = {
  orgId: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateSpeaker = {
  name?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  pictureUrl?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  eventId: Scalars['String'];
};

export type UpdateVideo = {
  videoId: Scalars['String'];
  eventId: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  lang?: Maybe<Scalars['String']>;
};

/** User Data */
export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  isEmailVerified?: Maybe<Scalars['Boolean']>;
  /** Avatar URL if null then no avatar is uploaded */
  avatar?: Maybe<Scalars['String']>;
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
  node: User;
  cursor: Scalars['String'];
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  isError: Scalars['Boolean'];
  message: Scalars['String'];
  body?: Maybe<User>;
};
