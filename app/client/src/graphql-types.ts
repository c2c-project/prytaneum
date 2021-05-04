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
  Date: any;
};

export type AlterLike = {
  id: Scalars['ID'];
  /** True if the user is attempting to like the question; false if they are trying to remove a like */
  to?: Maybe<Scalars['Boolean']>;
};

export type CreateEvent = {
  title: Scalars['String'];
  startDateTime: Scalars['String'];
  endDateTime: Scalars['String'];
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
  eventId: Scalars['ID'];
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

export type HideQuestion = {
  questionId: Scalars['ID'];
  eventId: Scalars['ID'];
  /** Goal state. If we want to change the state to hidden, toggleTo is true; false otherwise. */
  toggleTo: Scalars['Boolean'];
};

export type Like = {
  __typename?: 'Like';
  user?: Maybe<User>;
  question?: Maybe<EventQuestion>;
};

export type LoginForm = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds a new member and returns the new user added */
  addMember?: Maybe<User>;
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
  register?: Maybe<User>;
  reorderQueue?: Maybe<EventQuestion>;
  /** Start the event so that it is "live" */
  startEvent?: Maybe<Event>;
  updateEvent?: Maybe<Event>;
  updateOrganizationById?: Maybe<Organization>;
};


export type MutationAddMemberArgs = {
  input?: Maybe<NewMember>;
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
  eventId: Scalars['String'];
};


export type MutationHideQuestionArgs = {
  input?: Maybe<HideQuestion>;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginForm>;
};


export type MutationRegisterArgs = {
  input?: Maybe<RegistrationForm>;
};


export type MutationReorderQueueArgs = {
  input?: Maybe<ReorderQuestion>;
};


export type MutationStartEventArgs = {
  eventId: Scalars['String'];
};


export type MutationUpdateEventArgs = {
  event?: Maybe<UpdateEvent>;
};


export type MutationUpdateOrganizationByIdArgs = {
  input?: Maybe<UpdateOrg>;
};

/** Info necessary for adding a member to an organization */
export type NewMember = {
  email: Scalars['String'];
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

export type Query = {
  __typename?: 'Query';
  /** Fetch an event by id */
  eventById?: Maybe<Event>;
  /** Fetch user data about the current user */
  me?: Maybe<User>;
  myFeedback?: Maybe<Array<Maybe<EventLiveFeedback>>>;
  /** Fetch organizations relevant to the current user */
  myOrgs?: Maybe<Array<Maybe<Organization>>>;
  /** Fetch data about a particular org */
  orgById?: Maybe<Organization>;
};


export type QueryEventByIdArgs = {
  id: Scalars['ID'];
};


export type QueryOrgByIdArgs = {
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
  eventId: Scalars['ID'];
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
  eventId: Scalars['String'];
};

/** Information that may be updated by the user */
export type UpdateOrg = {
  id: Scalars['ID'];
  name: Scalars['String'];
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

export type LoginMutationVariables = Exact<{
  input: LoginForm;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'avatar'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  input: RegistrationForm;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'avatar'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($input: LoginForm!) {
  login(input: $input) {
    id
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
export const RegisterDocument = gql`
    mutation Register($input: RegistrationForm!) {
  register(input: $input) {
    id
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
export type EventKeySpecifier = ('id' | 'createdBy' | 'orgID' | 'createdAt' | 'updatedAt' | 'title' | 'startDateTime' | 'endDateTime' | 'description' | 'topic' | 'isActive' | 'isQuestionFeedVisible' | 'isCollectRatingsEnabled' | 'isTransformToForumEnabled' | 'isPrivate' | 'questions' | 'speakers' | 'registrants' | 'participants' | 'videos' | 'liveFeedback' | 'moderators' | EventKeySpecifier)[];
export type EventFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	orgID?: FieldPolicy<any> | FieldReadFunction<any>,
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
	isTransformToForumEnabled?: FieldPolicy<any> | FieldReadFunction<any>,
	isPrivate?: FieldPolicy<any> | FieldReadFunction<any>,
	questions?: FieldPolicy<any> | FieldReadFunction<any>,
	speakers?: FieldPolicy<any> | FieldReadFunction<any>,
	registrants?: FieldPolicy<any> | FieldReadFunction<any>,
	participants?: FieldPolicy<any> | FieldReadFunction<any>,
	videos?: FieldPolicy<any> | FieldReadFunction<any>,
	liveFeedback?: FieldPolicy<any> | FieldReadFunction<any>,
	moderators?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventLiveFeedbackKeySpecifier = ('id' | 'message' | 'event' | 'createdAt' | 'createdBy' | EventLiveFeedbackKeySpecifier)[];
export type EventLiveFeedbackFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type EventQuestionKeySpecifier = ('id' | 'event' | 'createdBy' | 'createdAt' | 'refQuestion' | 'question' | 'position' | 'isVisible' | 'isAsked' | 'lang' | 'isFollowUp' | 'isQuote' | 'likes' | 'likedBy' | 'isLikedByMe' | EventQuestionKeySpecifier)[];
export type EventQuestionFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
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
	isLikedByMe?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventSpeakerKeySpecifier = ('user' | 'name' | 'description' | 'title' | 'picture' | EventSpeakerKeySpecifier)[];
export type EventSpeakerFieldPolicy = {
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	picture?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventVideoKeySpecifier = ('url' | 'lang' | EventVideoKeySpecifier)[];
export type EventVideoFieldPolicy = {
	url?: FieldPolicy<any> | FieldReadFunction<any>,
	lang?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LikeKeySpecifier = ('user' | 'question' | LikeKeySpecifier)[];
export type LikeFieldPolicy = {
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	question?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('addMember' | 'alterLike' | 'createEvent' | 'createFeedback' | 'createOrganization' | 'createQuestion' | 'deleteEvent' | 'deleteOrganizationById' | 'endEvent' | 'hideQuestion' | 'login' | 'register' | 'reorderQueue' | 'startEvent' | 'updateEvent' | 'updateOrganizationById' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	addMember?: FieldPolicy<any> | FieldReadFunction<any>,
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
	register?: FieldPolicy<any> | FieldReadFunction<any>,
	reorderQueue?: FieldPolicy<any> | FieldReadFunction<any>,
	startEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	updateEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOrganizationById?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrganizationKeySpecifier = ('id' | 'name' | 'createdAt' | 'members' | 'events' | OrganizationKeySpecifier)[];
export type OrganizationFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	members?: FieldPolicy<any> | FieldReadFunction<any>,
	events?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('eventById' | 'me' | 'myFeedback' | 'myOrgs' | 'orgById' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	eventById?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	myFeedback?: FieldPolicy<any> | FieldReadFunction<any>,
	myOrgs?: FieldPolicy<any> | FieldReadFunction<any>,
	orgById?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('eventLiveFeedbackCreated' | 'eventQuestionCreated' | 'likeCountChanged' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	eventLiveFeedbackCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	eventQuestionCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	likeCountChanged?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | 'firstName' | 'lastName' | 'email' | 'isEmailVerified' | 'avatar' | 'organizations' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
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