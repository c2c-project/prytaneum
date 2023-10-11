/**
 * @generated SignedSource<<73b8972f94c78bef24ae64f79d0f455f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventLiveQuery$variables = {
  eventId: string;
};
export type EventLiveQuery$data = {
  readonly node: {
    readonly id: string;
    readonly isViewerModerator?: boolean | null;
    readonly " $fragmentSpreads": FragmentRefs<"EventSidebarFragment" | "EventVideoFragment" | "SpeakerListFragment" | "useBroadcastMessageListFragment" | "useEventDetailsFragment">;
  } | null;
};
export type EventLiveQuery = {
  response: EventLiveQuery$data;
  variables: EventLiveQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "eventId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isViewerModerator",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v8 = {
  "kind": "Literal",
  "name": "after",
  "value": ""
},
v9 = [
  (v8/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "question",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v11/*: any*/),
    (v2/*: any*/),
    (v12/*: any*/),
    (v13/*: any*/)
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "EventQuestion",
  "kind": "LinkedField",
  "name": "refQuestion",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "createdBy",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/)
      ],
      "storageKey": null
    },
    (v15/*: any*/),
    (v10/*: any*/)
  ],
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isLikedByViewer",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "likedByCount",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endCursor",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNextPage",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    (v20/*: any*/),
    (v21/*: any*/)
  ],
  "storageKey": null
},
v23 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
},
v24 = [
  (v8/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 1000
  }
],
v25 = [
  (v8/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v11/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "eventId",
          "variableName": "eventId"
        }
      ],
      "kind": "ScalarField",
      "name": "moderatorOf",
      "storageKey": null
    },
    (v12/*: any*/),
    (v13/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EventLiveQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EventSidebarFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useBroadcastMessageListFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EventVideoFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useEventDetailsFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SpeakerListFragment"
              }
            ],
            "type": "Event",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EventLiveQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isQuestionFeedVisible",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "EventSpeakerConnection",
                "kind": "LinkedField",
                "name": "speakers",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventSpeakerEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventSpeaker",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "pictureUrl",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          (v5/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currentQuestion",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v9/*: any*/),
                "concreteType": "EventQuestionConnection",
                "kind": "LinkedField",
                "name": "questions",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventQuestionEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventQuestion",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v10/*: any*/),
                          (v14/*: any*/),
                          (v16/*: any*/),
                          (v15/*: any*/),
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v22/*: any*/),
                  (v23/*: any*/)
                ],
                "storageKey": "questions(after:\"\",first:50)"
              },
              {
                "alias": null,
                "args": (v9/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useQuestionListFragment_questions",
                "kind": "LinkedHandle",
                "name": "questions"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currentBroadcastMessage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v9/*: any*/),
                "concreteType": "EventBroadcastMessagesConnection",
                "kind": "LinkedField",
                "name": "broadcastMessages",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventBroadcastMessageEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventBroadcastMessage",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "broadcastMessage",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isVisible",
                            "storageKey": null
                          },
                          (v14/*: any*/),
                          (v18/*: any*/),
                          (v15/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "startCursor",
                        "storageKey": null
                      },
                      (v20/*: any*/),
                      (v21/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v23/*: any*/)
                ],
                "storageKey": "broadcastMessages(after:\"\",first:50)"
              },
              {
                "alias": null,
                "args": (v9/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useBroadcastMessageListFragment_broadcastMessages",
                "kind": "LinkedHandle",
                "name": "broadcastMessages"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestionQueue",
                "kind": "LinkedField",
                "name": "questionQueue",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": (v24/*: any*/),
                    "concreteType": "EventQuestionConnection",
                    "kind": "LinkedField",
                    "name": "questionRecord",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventQuestionEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventQuestion",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v10/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v19/*: any*/),
                              (v18/*: any*/),
                              (v16/*: any*/),
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v22/*: any*/),
                      (v23/*: any*/)
                    ],
                    "storageKey": "questionRecord(after:\"\",first:1000)"
                  },
                  {
                    "alias": null,
                    "args": (v24/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionQueueFragment_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v24/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionCarousel_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v24/*: any*/),
                    "concreteType": "EventQuestionConnection",
                    "kind": "LinkedField",
                    "name": "enqueuedQuestions",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventQuestionEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventQuestion",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v10/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v17/*: any*/),
                              (v18/*: any*/),
                              (v19/*: any*/),
                              (v16/*: any*/),
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v22/*: any*/),
                      (v23/*: any*/)
                    ],
                    "storageKey": "enqueuedQuestions(after:\"\",first:1000)"
                  },
                  {
                    "alias": null,
                    "args": (v24/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionQueueFragment_enqueuedQuestions",
                    "kind": "LinkedHandle",
                    "name": "enqueuedQuestions"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v25/*: any*/),
                "concreteType": "EventLiveFeedbackConnection",
                "kind": "LinkedField",
                "name": "liveFeedback",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventLiveFeedbackEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventLiveFeedback",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v26/*: any*/),
                          (v27/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventLiveFeedback",
                            "kind": "LinkedField",
                            "name": "refFeedback",
                            "plural": false,
                            "selections": [
                              (v27/*: any*/),
                              (v2/*: any*/),
                              (v26/*: any*/),
                              (v15/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v15/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v22/*: any*/),
                  (v23/*: any*/)
                ],
                "storageKey": "liveFeedback(after:\"\",first:100)"
              },
              {
                "alias": null,
                "args": (v25/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useLiveFeedbackListFragment_liveFeedback",
                "kind": "LinkedHandle",
                "name": "liveFeedback"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "EventVideoConnection",
                "kind": "LinkedField",
                "name": "videos",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventVideoEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventVideo",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lang",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "topic",
                "storageKey": null
              },
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startDateTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endDateTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isActive",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPrivate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isViewerInvited",
                "storageKey": null
              }
            ],
            "type": "Event",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9ae779bfb3047569f263037cd305b187",
    "id": null,
    "metadata": {},
    "name": "EventLiveQuery",
    "operationKind": "query",
    "text": "query EventLiveQuery(\n  $eventId: ID!\n) {\n  node(id: $eventId) {\n    __typename\n    id\n    ... on Event {\n      isViewerModerator\n      ...EventSidebarFragment\n      ...useBroadcastMessageListFragment\n      ...EventVideoFragment\n      ...useEventDetailsFragment\n      ...SpeakerListFragment\n    }\n  }\n}\n\nfragment BroadcastMessageActionsFragment on EventBroadcastMessage {\n  id\n  ...DeleteBroadcastMessageButtonFragment\n  ...EditBroadcastMessageButtonFragment\n}\n\nfragment BroadcastMessageAuthorFragment on EventBroadcastMessage {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment BroadcastMessageContentFragment on EventBroadcastMessage {\n  broadcastMessage\n}\n\nfragment DeleteBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n  position\n}\n\nfragment DeleteButtonFragment on EventQuestion {\n  id\n  position\n}\n\nfragment EditBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n}\n\nfragment EventSidebarFragment on Event {\n  id\n  isQuestionFeedVisible\n  isViewerModerator\n  ...SpeakerListFragment\n  ...useQuestionListFragment\n  ...useBroadcastMessageListFragment\n  ...useQuestionQueueFragment\n  ...QuestionCarouselFragment\n  ...useLiveFeedbackListFragment_32qNee\n}\n\nfragment EventVideoFragment on Event {\n  videos {\n    edges {\n      cursor\n      node {\n        url\n        lang\n        id\n      }\n    }\n  }\n  id\n}\n\nfragment LikeFragment on EventQuestion {\n  id\n  isLikedByViewer\n}\n\nfragment LiveFeedbackAuthorFragment_32qNee on EventLiveFeedback {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n    moderatorOf(eventId: $eventId)\n  }\n  createdAt\n}\n\nfragment LiveFeedbackReplyFragment_32qNee on EventLiveFeedback {\n  id\n  message\n  ...LiveFeedbackAuthorFragment_32qNee\n}\n\nfragment QuestionActionsFragment on EventQuestion {\n  id\n  ...QuoteFragment\n  ...LikeFragment\n  ...QueueButtonFragment\n  ...DeleteButtonFragment\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionCarouselFragment on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          position\n          ...QuestionAuthorFragment\n          ...QuestionContentFragment\n          refQuestion {\n            ...QuestionQuoteFragment\n            id\n          }\n          id\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment QuestionContentFragment on EventQuestion {\n  question\n}\n\nfragment QuestionQuoteFragment on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n\nfragment QueueButtonFragment on EventQuestion {\n  id\n  position\n}\n\nfragment QuoteFragment on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment\n}\n\nfragment SpeakerListFragment on Event {\n  speakers {\n    edges {\n      node {\n        id\n        pictureUrl\n        name\n        description\n        title\n      }\n      cursor\n    }\n  }\n  id\n}\n\nfragment useBroadcastMessageListFragment on Event {\n  id\n  currentBroadcastMessage\n  broadcastMessages(first: 50, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        broadcastMessage\n        isVisible\n        createdBy {\n          firstName\n          id\n        }\n        ...BroadcastMessageActionsFragment\n        ...BroadcastMessageAuthorFragment\n        ...BroadcastMessageContentFragment\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useEventDetailsFragment on Event {\n  id\n  title\n  topic\n  description\n  startDateTime\n  endDateTime\n  isActive\n  isViewerModerator\n  isPrivate\n  isViewerInvited\n}\n\nfragment useLiveFeedbackListFragment_32qNee on Event {\n  id\n  liveFeedback(first: 100, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        message\n        createdBy {\n          id\n          firstName\n          moderatorOf(eventId: $eventId)\n        }\n        refFeedback {\n          createdBy {\n            id\n            firstName\n            moderatorOf(eventId: $eventId)\n          }\n          ...LiveFeedbackReplyFragment_32qNee\n          id\n        }\n        ...LiveFeedbackReplyFragment_32qNee\n        ...LiveFeedbackAuthorFragment_32qNee\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useQuestionListFragment on Event {\n  id\n  currentQuestion\n  questions(first: 50, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        question\n        createdBy {\n          firstName\n          id\n        }\n        refQuestion {\n          ...QuestionQuoteFragment\n          id\n        }\n        ...QuestionActionsFragment\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment\n        ...QuestionStatsFragment\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useQuestionQueueFragment on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment\n          position\n          refQuestion {\n            ...QuestionQuoteFragment\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    enqueuedQuestions(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionActionsFragment\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment\n          position\n          refQuestion {\n            ...QuestionQuoteFragment\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "38614c4196568eb889eb819a36e2dcb5";

export default node;
