import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type AddModerator = {
  email: Scalars['String'];
  id: Scalars['String'];
};

export type AlterLike = {
  id: Scalars['ID'];
  /** True if the user is attempting to like the question; false if they are trying to remove a like */
  to?: Maybe<Scalars['Boolean']>;
};

export type CreateEvent = {
  title: Scalars['String'];
  startDateTime: Scalars['Date'];
  endDateTime: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  topic: Scalars['String'];
  orgId: Scalars['String'];
};

export type CreateFeedback = {
  message: Scalars['String'];
};

/** Necessary information for org creation */
export type CreateOrg = {
  name: Scalars['String'];
};

export type CreateQuestion = {
  question: Scalars['String'];
  isQuote?: Maybe<Scalars['Boolean']>;
  isFollowUp?: Maybe<Scalars['Boolean']>;
  refQuestion?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
};

export type CreateVideo = {
  url: Scalars['String'];
  lang: Scalars['String'];
  eventId: Scalars['String'];
};


export type DeleteEvent = {
  id: Scalars['String'];
};

/** Information necessary for deleting an org */
export type DeleteOrg = {
  id: Scalars['ID'];
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

export type Event = {
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

export type EventLiveFeedback = {
  __typename?: 'EventLiveFeedback';
  feedbackId: Scalars['ID'];
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

export type EventSpeaker = {
  __typename?: 'EventSpeaker';
  /** Speaker eventId */
  id: Scalars['String'];
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

export type EventVideo = {
  __typename?: 'EventVideo';
  id: Scalars['String'];
  url: Scalars['String'];
  lang: Scalars['String'];
  event?: Maybe<Event>;
};

export type HideQuestion = {
  questionId: Scalars['ID'];
  id: Scalars['ID'];
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

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds a new member and returns the new user added */
  addMember?: Maybe<User>;
  /** Add a new moderator to the given event */
  addModerator?: Maybe<User>;
  addSpeaker?: Maybe<EventSpeaker>;
  addVideo: EventVideo;
  alterLike?: Maybe<Like>;
  createEvent?: Maybe<Event>;
  createFeedback?: Maybe<EventLiveFeedback>;
  createOrganization?: Maybe<Organization>;
  createQuestion?: Maybe<EventQuestion>;
  deleteEvent?: Maybe<Event>;
  deleteOrganizationById?: Maybe<Organization>;
  /** End the eent so that it is not live */
  endEvent?: Maybe<Event>;
  hideQuestion?: Maybe<EventQuestion>;
  login?: Maybe<User>;
  /** Advance the current question */
  nextQuestion: Scalars['Int'];
  /** Go to the previous question */
  prevQuestion: Scalars['Int'];
  register?: Maybe<User>;
  removeSpeaker?: Maybe<EventSpeaker>;
  removeVideo?: Maybe<EventVideo>;
  reorderQueue?: Maybe<EventQuestion>;
  /** Start the event so that it is "live" */
  startEvent?: Maybe<Event>;
  updateEvent?: Maybe<Event>;
  updateOrganizationById?: Maybe<Organization>;
  updateSpeaker?: Maybe<EventSpeaker>;
  updateVideo?: Maybe<EventVideo>;
};


export type MutationAddMemberArgs = {
  input?: Maybe<NewMember>;
};


export type MutationAddModeratorArgs = {
  input?: Maybe<AddModerator>;
};


export type MutationAddSpeakerArgs = {
  input?: Maybe<SpeakerForm>;
};


export type MutationAddVideoArgs = {
  input: CreateVideo;
};


export type MutationAlterLikeArgs = {
  input?: Maybe<AlterLike>;
};


export type MutationCreateEventArgs = {
  event?: Maybe<CreateEvent>;
};


export type MutationCreateFeedbackArgs = {
  input?: Maybe<CreateFeedback>;
};


export type MutationCreateOrganizationArgs = {
  input?: Maybe<CreateOrg>;
};


export type MutationCreateQuestionArgs = {
  input?: Maybe<CreateQuestion>;
};


export type MutationDeleteEventArgs = {
  event?: Maybe<DeleteEvent>;
};


export type MutationDeleteOrganizationByIdArgs = {
  input?: Maybe<DeleteOrg>;
};


export type MutationEndEventArgs = {
  id: Scalars['String'];
};


export type MutationHideQuestionArgs = {
  input?: Maybe<HideQuestion>;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginForm>;
};


export type MutationNextQuestionArgs = {
  id: Scalars['ID'];
};


export type MutationPrevQuestionArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterArgs = {
  input?: Maybe<RegistrationForm>;
};


export type MutationRemoveSpeakerArgs = {
  input?: Maybe<DeleteSpeaker>;
};


export type MutationRemoveVideoArgs = {
  input?: Maybe<DeleteVideo>;
};


export type MutationReorderQueueArgs = {
  input?: Maybe<ReorderQuestion>;
};


export type MutationStartEventArgs = {
  id: Scalars['String'];
};


export type MutationUpdateEventArgs = {
  event?: Maybe<UpdateEvent>;
};


export type MutationUpdateOrganizationByIdArgs = {
  input?: Maybe<UpdateOrg>;
};


export type MutationUpdateSpeakerArgs = {
  input?: Maybe<UpdateSpeaker>;
};


export type MutationUpdateVideoArgs = {
  input: UpdateVideo;
};

/** Info necessary for adding a member to an organization */
export type NewMember = {
  email: Scalars['String'];
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
  members?: Maybe<Array<User>>;
  /** Events owned by this organization */
  events?: Maybe<Array<Event>>;
};

export type Query = {
  __typename?: 'Query';
  /** Fetch an event by id */
  eventById?: Maybe<Event>;
  /** Fetch all events */
  events?: Maybe<Array<Event>>;
  /** The logout just returns the timestamp of the logout action */
  logout?: Maybe<Scalars['Date']>;
  /** Fetch user data about the current user */
  me?: Maybe<User>;
  myFeedback?: Maybe<Array<Maybe<EventLiveFeedback>>>;
  /** Fetch organizations relevant to the current user */
  myOrgs?: Maybe<Array<Organization>>;
  /** Fetch data about a particular org */
  orgById?: Maybe<Organization>;
  questionsByid?: Maybe<Array<EventQuestion>>;
};


export type QueryEventByIdArgs = {
  id: Scalars['ID'];
};


export type QueryOrgByIdArgs = {
  id: Scalars['ID'];
};


export type QueryQuestionsByidArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};

export type SpeakerForm = {
  eventId: Scalars['String'];
  name: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  pictureUrl: Scalars['String'];
  /** This is for matching the speaker to an account */
  email: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** New messages as feedback is given */
  eventLiveFeedbackCreated?: Maybe<EventLiveFeedback>;
  eventQuestionCreated: EventQuestion;
  likeCountChanged: Like;
  questionPosition: Scalars['Int'];
};


export type SubscriptionEventLiveFeedbackCreatedArgs = {
  id: Scalars['ID'];
};


export type SubscriptionEventQuestionCreatedArgs = {
  id: Scalars['ID'];
};


export type SubscriptionLikeCountChangedArgs = {
  id: Scalars['ID'];
};


export type SubscriptionQuestionPositionArgs = {
  id: Scalars['ID'];
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
  id: Scalars['String'];
};

/** Information that may be updated by the user */
export type UpdateOrg = {
  id: Scalars['ID'];
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

export type LoginMutationVariables = Exact<{
  input: LoginForm;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'firstName' | 'lastName' | 'email' | 'avatar'>
  )> }
);

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  input: RegistrationForm;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'firstName' | 'lastName' | 'email' | 'avatar'>
  )> }
);

export type MyUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MyUserInfoQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'firstName' | 'lastName' | 'avatar' | 'email'>
  )> }
);

export type FullEventSettingsQueryVariables = Exact<{
  input: Scalars['ID'];
}>;


export type FullEventSettingsQuery = (
  { __typename?: 'Query' }
  & { eventById?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id'>
    & EventDetailsFragment
    & EventSettingsFragment
    & EventSpeakersFragment
    & EventVideosFragment
    & EventModeratorsFragment
  )> }
);

export type UpdateEventMutationVariables = Exact<{
  input?: Maybe<UpdateEvent>;
}>;


export type UpdateEventMutation = (
  { __typename?: 'Mutation' }
  & { updateEvent?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'startDateTime' | 'endDateTime' | 'description' | 'topic' | 'isQuestionFeedVisible' | 'isCollectRatingsEnabled' | 'isForumEnabled' | 'isPrivate'>
  )> }
);

export type QuestionCardFragment = (
  { __typename?: 'EventQuestion' }
  & Pick<EventQuestion, 'questionId' | 'question' | 'createdAt'>
  & { createdBy?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'firstName'>
  )> }
);

export type CreateQuestionMutationVariables = Exact<{
  input?: Maybe<CreateQuestion>;
}>;


export type CreateQuestionMutation = (
  { __typename?: 'Mutation' }
  & { createQuestion?: Maybe<(
    { __typename?: 'EventQuestion' }
    & Pick<EventQuestion, 'questionId' | 'question'>
  )> }
);

export type NewQuestionsSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NewQuestionsSubscription = (
  { __typename?: 'Subscription' }
  & { eventQuestionCreated: (
    { __typename?: 'EventQuestion' }
    & QuestionCardFragment
  ) }
);

export type QuestionsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type QuestionsQuery = (
  { __typename?: 'Query' }
  & { questionsByid?: Maybe<Array<(
    { __typename?: 'EventQuestion' }
    & QuestionCardFragment
  )>> }
);

export type EventSettingsFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'isQuestionFeedVisible' | 'isCollectRatingsEnabled' | 'isForumEnabled' | 'isPrivate'>
);

export type EventModeratorsFragment = (
  { __typename?: 'Event' }
  & { moderators?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'firstName' | 'lastName' | 'email' | 'avatar'>
  )>> }
);

export type EventVideosFragment = (
  { __typename?: 'Event' }
  & { videos?: Maybe<Array<(
    { __typename?: 'EventVideo' }
    & Pick<EventVideo, 'url' | 'lang'>
  )>> }
);

export type EventSpeakersFragment = (
  { __typename?: 'Event' }
  & { speakers?: Maybe<Array<(
    { __typename?: 'EventSpeaker' }
    & Pick<EventSpeaker, 'id' | 'eventId' | 'name' | 'title' | 'description' | 'pictureUrl' | 'email'>
  )>> }
);

export type EventDetailsFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'title' | 'topic' | 'description' | 'startDateTime' | 'endDateTime' | 'isActive'>
);

export type CreateEventMutationVariables = Exact<{
  input?: Maybe<CreateEvent>;
}>;


export type CreateEventMutation = (
  { __typename?: 'Mutation' }
  & { createEvent?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'topic' | 'startDateTime'>
  )> }
);

export type EventListQueryVariables = Exact<{ [key: string]: never; }>;


export type EventListQuery = (
  { __typename?: 'Query' }
  & { events?: Maybe<Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'topic' | 'startDateTime'>
  )>> }
);

export type MyOrgsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyOrgsQuery = (
  { __typename?: 'Query' }
  & { myOrgs?: Maybe<Array<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'orgId' | 'name'>
  )>> }
);

export type OrgInfoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OrgInfoQuery = (
  { __typename?: 'Query' }
  & { orgById?: Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'orgId' | 'name'>
    & { members?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'userId' | 'firstName' | 'lastName'>
    )>>, events?: Maybe<Array<(
      { __typename?: 'Event' }
      & Pick<Event, 'id' | 'title' | 'topic' | 'startDateTime'>
    )>> }
  )> }
);

export type CreateOrgMutationVariables = Exact<{
  input: CreateOrg;
}>;


export type CreateOrgMutation = (
  { __typename?: 'Mutation' }
  & { createOrganization?: Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'orgId' | 'name'>
  )> }
);

export const QuestionCardFragmentDoc = gql`
    fragment QuestionCard on EventQuestion {
  questionId
  question
  createdBy {
    userId
    firstName
  }
  createdAt
}
    `;
export const EventSettingsFragmentDoc = gql`
    fragment EventSettings on Event {
  isQuestionFeedVisible
  isCollectRatingsEnabled
  isForumEnabled
  isPrivate
}
    `;
export const EventModeratorsFragmentDoc = gql`
    fragment EventModerators on Event {
  moderators {
    userId
    firstName
    lastName
    email
    avatar
  }
}
    `;
export const EventVideosFragmentDoc = gql`
    fragment EventVideos on Event {
  videos {
    url
    lang
  }
}
    `;
export const EventSpeakersFragmentDoc = gql`
    fragment EventSpeakers on Event {
  speakers {
    id
    eventId
    name
    title
    description
    pictureUrl
    email
  }
}
    `;
export const EventDetailsFragmentDoc = gql`
    fragment EventDetails on Event {
  title
  topic
  description
  startDateTime
  endDateTime
  isActive
}
    `;
export const LoginDocument = gql`
    mutation Login($input: LoginForm!) {
  login(input: $input) {
    userId
    firstName
    lastName
    email
    avatar
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegistrationForm!) {
  register(input: $input) {
    userId
    firstName
    lastName
    email
    avatar
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MyUserInfoDocument = gql`
    query MyUserInfo {
  me {
    userId
    firstName
    lastName
    avatar
    email
  }
}
    `;

/**
 * __useMyUserInfoQuery__
 *
 * To run a query within a React component, call `useMyUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<MyUserInfoQuery, MyUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyUserInfoQuery, MyUserInfoQueryVariables>(MyUserInfoDocument, options);
      }
export function useMyUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyUserInfoQuery, MyUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyUserInfoQuery, MyUserInfoQueryVariables>(MyUserInfoDocument, options);
        }
export type MyUserInfoQueryHookResult = ReturnType<typeof useMyUserInfoQuery>;
export type MyUserInfoLazyQueryHookResult = ReturnType<typeof useMyUserInfoLazyQuery>;
export type MyUserInfoQueryResult = Apollo.QueryResult<MyUserInfoQuery, MyUserInfoQueryVariables>;
export const FullEventSettingsDocument = gql`
    query FullEventSettings($input: ID!) {
  eventById(id: $input) {
    id
    ...EventDetails
    ...EventSettings
    ...EventSpeakers
    ...EventVideos
    ...EventModerators
  }
}
    ${EventDetailsFragmentDoc}
${EventSettingsFragmentDoc}
${EventSpeakersFragmentDoc}
${EventVideosFragmentDoc}
${EventModeratorsFragmentDoc}`;

/**
 * __useFullEventSettingsQuery__
 *
 * To run a query within a React component, call `useFullEventSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullEventSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFullEventSettingsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFullEventSettingsQuery(baseOptions: Apollo.QueryHookOptions<FullEventSettingsQuery, FullEventSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FullEventSettingsQuery, FullEventSettingsQueryVariables>(FullEventSettingsDocument, options);
      }
export function useFullEventSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FullEventSettingsQuery, FullEventSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FullEventSettingsQuery, FullEventSettingsQueryVariables>(FullEventSettingsDocument, options);
        }
export type FullEventSettingsQueryHookResult = ReturnType<typeof useFullEventSettingsQuery>;
export type FullEventSettingsLazyQueryHookResult = ReturnType<typeof useFullEventSettingsLazyQuery>;
export type FullEventSettingsQueryResult = Apollo.QueryResult<FullEventSettingsQuery, FullEventSettingsQueryVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($input: UpdateEvent) {
  updateEvent(event: $input) {
    id
    title
    startDateTime
    endDateTime
    description
    topic
    isQuestionFeedVisible
    isCollectRatingsEnabled
    isForumEnabled
    isPrivate
  }
}
    `;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($input: CreateQuestion) {
  createQuestion(input: $input) {
    questionId
    question
  }
}
    `;
export type CreateQuestionMutationFn = Apollo.MutationFunction<CreateQuestionMutation, CreateQuestionMutationVariables>;

/**
 * __useCreateQuestionMutation__
 *
 * To run a mutation, you first call `useCreateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionMutation, { data, loading, error }] = useCreateQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestionMutation, CreateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument, options);
      }
export type CreateQuestionMutationHookResult = ReturnType<typeof useCreateQuestionMutation>;
export type CreateQuestionMutationResult = Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const NewQuestionsDocument = gql`
    subscription NewQuestions($id: ID!) {
  eventQuestionCreated(id: $id) {
    ...QuestionCard
  }
}
    ${QuestionCardFragmentDoc}`;

/**
 * __useNewQuestionsSubscription__
 *
 * To run a query within a React component, call `useNewQuestionsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewQuestionsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewQuestionsSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNewQuestionsSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewQuestionsSubscription, NewQuestionsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewQuestionsSubscription, NewQuestionsSubscriptionVariables>(NewQuestionsDocument, options);
      }
export type NewQuestionsSubscriptionHookResult = ReturnType<typeof useNewQuestionsSubscription>;
export type NewQuestionsSubscriptionResult = Apollo.SubscriptionResult<NewQuestionsSubscription>;
export const QuestionsDocument = gql`
    query Questions($id: ID!) {
  questionsByid(id: $id) {
    ...QuestionCard
  }
}
    ${QuestionCardFragmentDoc}`;

/**
 * __useQuestionsQuery__
 *
 * To run a query within a React component, call `useQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuestionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQuestionsQuery(baseOptions: Apollo.QueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options);
      }
export function useQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionsQuery, QuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionsQuery, QuestionsQueryVariables>(QuestionsDocument, options);
        }
export type QuestionsQueryHookResult = ReturnType<typeof useQuestionsQuery>;
export type QuestionsLazyQueryHookResult = ReturnType<typeof useQuestionsLazyQuery>;
export type QuestionsQueryResult = Apollo.QueryResult<QuestionsQuery, QuestionsQueryVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($input: CreateEvent) {
  createEvent(event: $input) {
    id
    title
    topic
    startDateTime
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const EventListDocument = gql`
    query EventList {
  events {
    id
    title
    topic
    startDateTime
  }
}
    `;

/**
 * __useEventListQuery__
 *
 * To run a query within a React component, call `useEventListQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventListQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventListQuery(baseOptions?: Apollo.QueryHookOptions<EventListQuery, EventListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventListQuery, EventListQueryVariables>(EventListDocument, options);
      }
export function useEventListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventListQuery, EventListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventListQuery, EventListQueryVariables>(EventListDocument, options);
        }
export type EventListQueryHookResult = ReturnType<typeof useEventListQuery>;
export type EventListLazyQueryHookResult = ReturnType<typeof useEventListLazyQuery>;
export type EventListQueryResult = Apollo.QueryResult<EventListQuery, EventListQueryVariables>;
export const MyOrgsDocument = gql`
    query MyOrgs {
  myOrgs {
    orgId
    name
  }
}
    `;

/**
 * __useMyOrgsQuery__
 *
 * To run a query within a React component, call `useMyOrgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrgsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrgsQuery(baseOptions?: Apollo.QueryHookOptions<MyOrgsQuery, MyOrgsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrgsQuery, MyOrgsQueryVariables>(MyOrgsDocument, options);
      }
export function useMyOrgsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrgsQuery, MyOrgsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrgsQuery, MyOrgsQueryVariables>(MyOrgsDocument, options);
        }
export type MyOrgsQueryHookResult = ReturnType<typeof useMyOrgsQuery>;
export type MyOrgsLazyQueryHookResult = ReturnType<typeof useMyOrgsLazyQuery>;
export type MyOrgsQueryResult = Apollo.QueryResult<MyOrgsQuery, MyOrgsQueryVariables>;
export const OrgInfoDocument = gql`
    query OrgInfo($id: ID!) {
  orgById(id: $id) {
    orgId
    name
    members {
      userId
      firstName
      lastName
    }
    events {
      id
      title
      topic
      startDateTime
    }
  }
}
    `;

/**
 * __useOrgInfoQuery__
 *
 * To run a query within a React component, call `useOrgInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrgInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrgInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrgInfoQuery(baseOptions: Apollo.QueryHookOptions<OrgInfoQuery, OrgInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrgInfoQuery, OrgInfoQueryVariables>(OrgInfoDocument, options);
      }
export function useOrgInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrgInfoQuery, OrgInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrgInfoQuery, OrgInfoQueryVariables>(OrgInfoDocument, options);
        }
export type OrgInfoQueryHookResult = ReturnType<typeof useOrgInfoQuery>;
export type OrgInfoLazyQueryHookResult = ReturnType<typeof useOrgInfoLazyQuery>;
export type OrgInfoQueryResult = Apollo.QueryResult<OrgInfoQuery, OrgInfoQueryVariables>;
export const CreateOrgDocument = gql`
    mutation CreateOrg($input: CreateOrg!) {
  createOrganization(input: $input) {
    orgId
    name
  }
}
    `;
export type CreateOrgMutationFn = Apollo.MutationFunction<CreateOrgMutation, CreateOrgMutationVariables>;

/**
 * __useCreateOrgMutation__
 *
 * To run a mutation, you first call `useCreateOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrgMutation, { data, loading, error }] = useCreateOrgMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrgMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrgMutation, CreateOrgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrgMutation, CreateOrgMutationVariables>(CreateOrgDocument, options);
      }
export type CreateOrgMutationHookResult = ReturnType<typeof useCreateOrgMutation>;
export type CreateOrgMutationResult = Apollo.MutationResult<CreateOrgMutation>;
export type CreateOrgMutationOptions = Apollo.BaseMutationOptions<CreateOrgMutation, CreateOrgMutationVariables>;
export type EventKeySpecifier = ('id' | 'createdBy' | 'organization' | 'createdAt' | 'updatedAt' | 'title' | 'startDateTime' | 'endDateTime' | 'description' | 'topic' | 'isActive' | 'isQuestionFeedVisible' | 'isCollectRatingsEnabled' | 'isForumEnabled' | 'isPrivate' | 'questions' | 'speakers' | 'registrants' | 'participants' | 'videos' | 'liveFeedback' | 'moderators' | EventKeySpecifier)[];
export type EventFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	organization?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	startDateTime?: FieldPolicy<any> | FieldReadFunction<any>,
	endDateTime?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	topic?: FieldPolicy<any> | FieldReadFunction<any>,
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	isQuestionFeedVisible?: FieldPolicy<any> | FieldReadFunction<any>,
	isCollectRatingsEnabled?: FieldPolicy<any> | FieldReadFunction<any>,
	isForumEnabled?: FieldPolicy<any> | FieldReadFunction<any>,
	isPrivate?: FieldPolicy<any> | FieldReadFunction<any>,
	questions?: FieldPolicy<any> | FieldReadFunction<any>,
	speakers?: FieldPolicy<any> | FieldReadFunction<any>,
	registrants?: FieldPolicy<any> | FieldReadFunction<any>,
	participants?: FieldPolicy<any> | FieldReadFunction<any>,
	videos?: FieldPolicy<any> | FieldReadFunction<any>,
	liveFeedback?: FieldPolicy<any> | FieldReadFunction<any>,
	moderators?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventLiveFeedbackKeySpecifier = ('feedbackId' | 'message' | 'event' | 'createdAt' | 'createdBy' | EventLiveFeedbackKeySpecifier)[];
export type EventLiveFeedbackFieldPolicy = {
	feedbackId?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventParticipantKeySpecifier = ('user' | 'questions' | 'liveFeedBack' | EventParticipantKeySpecifier)[];
export type EventParticipantFieldPolicy = {
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	questions?: FieldPolicy<any> | FieldReadFunction<any>,
	liveFeedBack?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventQuestionKeySpecifier = ('questionId' | 'event' | 'createdById' | 'createdBy' | 'createdAt' | 'refQuestionId' | 'refQuestion' | 'question' | 'position' | 'isVisible' | 'isAsked' | 'lang' | 'isFollowUp' | 'isQuote' | 'likes' | 'likedBy' | 'likedByCount' | 'isLikedByMe' | EventQuestionKeySpecifier)[];
export type EventQuestionFieldPolicy = {
	questionId?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	createdById?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	refQuestionId?: FieldPolicy<any> | FieldReadFunction<any>,
	refQuestion?: FieldPolicy<any> | FieldReadFunction<any>,
	question?: FieldPolicy<any> | FieldReadFunction<any>,
	position?: FieldPolicy<any> | FieldReadFunction<any>,
	isVisible?: FieldPolicy<any> | FieldReadFunction<any>,
	isAsked?: FieldPolicy<any> | FieldReadFunction<any>,
	lang?: FieldPolicy<any> | FieldReadFunction<any>,
	isFollowUp?: FieldPolicy<any> | FieldReadFunction<any>,
	isQuote?: FieldPolicy<any> | FieldReadFunction<any>,
	likes?: FieldPolicy<any> | FieldReadFunction<any>,
	likedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	likedByCount?: FieldPolicy<any> | FieldReadFunction<any>,
	isLikedByMe?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventSpeakerKeySpecifier = ('id' | 'email' | 'eventId' | 'user' | 'name' | 'description' | 'title' | 'pictureUrl' | EventSpeakerKeySpecifier)[];
export type EventSpeakerFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	pictureUrl?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventVideoKeySpecifier = ('id' | 'url' | 'lang' | 'event' | EventVideoKeySpecifier)[];
export type EventVideoFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>,
	lang?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LikeKeySpecifier = ('user' | 'question' | LikeKeySpecifier)[];
export type LikeFieldPolicy = {
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	question?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('addMember' | 'addModerator' | 'addSpeaker' | 'addVideo' | 'alterLike' | 'createEvent' | 'createFeedback' | 'createOrganization' | 'createQuestion' | 'deleteEvent' | 'deleteOrganizationById' | 'endEvent' | 'hideQuestion' | 'login' | 'nextQuestion' | 'prevQuestion' | 'register' | 'removeSpeaker' | 'removeVideo' | 'reorderQueue' | 'startEvent' | 'updateEvent' | 'updateOrganizationById' | 'updateSpeaker' | 'updateVideo' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	addMember?: FieldPolicy<any> | FieldReadFunction<any>,
	addModerator?: FieldPolicy<any> | FieldReadFunction<any>,
	addSpeaker?: FieldPolicy<any> | FieldReadFunction<any>,
	addVideo?: FieldPolicy<any> | FieldReadFunction<any>,
	alterLike?: FieldPolicy<any> | FieldReadFunction<any>,
	createEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	createFeedback?: FieldPolicy<any> | FieldReadFunction<any>,
	createOrganization?: FieldPolicy<any> | FieldReadFunction<any>,
	createQuestion?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOrganizationById?: FieldPolicy<any> | FieldReadFunction<any>,
	endEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	hideQuestion?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	nextQuestion?: FieldPolicy<any> | FieldReadFunction<any>,
	prevQuestion?: FieldPolicy<any> | FieldReadFunction<any>,
	register?: FieldPolicy<any> | FieldReadFunction<any>,
	removeSpeaker?: FieldPolicy<any> | FieldReadFunction<any>,
	removeVideo?: FieldPolicy<any> | FieldReadFunction<any>,
	reorderQueue?: FieldPolicy<any> | FieldReadFunction<any>,
	startEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	updateEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOrganizationById?: FieldPolicy<any> | FieldReadFunction<any>,
	updateSpeaker?: FieldPolicy<any> | FieldReadFunction<any>,
	updateVideo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrganizationKeySpecifier = ('orgId' | 'name' | 'createdAt' | 'members' | 'events' | OrganizationKeySpecifier)[];
export type OrganizationFieldPolicy = {
	orgId?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	members?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('eventById' | 'events' | 'logout' | 'me' | 'myFeedback' | 'myOrgs' | 'orgById' | 'questionsByid' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	eventById?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	logout?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	myFeedback?: FieldPolicy<any> | FieldReadFunction<any>,
	myOrgs?: FieldPolicy<any> | FieldReadFunction<any>,
	orgById?: FieldPolicy<any> | FieldReadFunction<any>,
	questionsByid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('eventLiveFeedbackCreated' | 'eventQuestionCreated' | 'likeCountChanged' | 'questionPosition' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	eventLiveFeedbackCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	eventQuestionCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	likeCountChanged?: FieldPolicy<any> | FieldReadFunction<any>,
	questionPosition?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('userId' | 'firstName' | 'lastName' | 'email' | 'isEmailVerified' | 'avatar' | 'organizations' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	isEmailVerified?: FieldPolicy<any> | FieldReadFunction<any>,
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	organizations?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Event?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventKeySpecifier | (() => undefined | EventKeySpecifier),
		fields?: EventFieldPolicy,
	},
	EventLiveFeedback?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventLiveFeedbackKeySpecifier | (() => undefined | EventLiveFeedbackKeySpecifier),
		fields?: EventLiveFeedbackFieldPolicy,
	},
	EventParticipant?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventParticipantKeySpecifier | (() => undefined | EventParticipantKeySpecifier),
		fields?: EventParticipantFieldPolicy,
	},
	EventQuestion?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventQuestionKeySpecifier | (() => undefined | EventQuestionKeySpecifier),
		fields?: EventQuestionFieldPolicy,
	},
	EventSpeaker?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventSpeakerKeySpecifier | (() => undefined | EventSpeakerKeySpecifier),
		fields?: EventSpeakerFieldPolicy,
	},
	EventVideo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventVideoKeySpecifier | (() => undefined | EventVideoKeySpecifier),
		fields?: EventVideoFieldPolicy,
	},
	Like?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LikeKeySpecifier | (() => undefined | LikeKeySpecifier),
		fields?: LikeFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Organization?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrganizationKeySpecifier | (() => undefined | OrganizationKeySpecifier),
		fields?: OrganizationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};