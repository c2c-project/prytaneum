/**
 * @generated SignedSource<<0df17330308483dbe38194f2a3eaaaf1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventLiveNewModeratorViewQuery$variables = {
  eventId: string;
  userLang: string;
};
export type EventLiveNewModeratorViewQuery$data = {
  readonly node: {
    readonly id: string;
    readonly isActive?: boolean | null;
    readonly isPrivate?: boolean | null;
    readonly isViewerModerator?: boolean | null;
    readonly topics?: ReadonlyArray<{
      readonly description: string;
      readonly id: string;
      readonly topic: string;
    }> | null;
    readonly " $fragmentSpreads": FragmentRefs<"EventVideoFragment" | "QuestionCarouselFragment" | "SpeakerListFragment" | "useBroadcastMessageListFragment" | "useEventDetailsFragment" | "useLiveFeedbackListFragment" | "useOnDeckFragment" | "useQuestionModQueueFragment" | "useQuestionQueueFragment" | "useQuestionsByTopicFragment" | "useQueueByTopicFragment">;
  } | null;
};
export type EventLiveNewModeratorViewQuery = {
  response: EventLiveNewModeratorViewQuery$data;
  variables: EventLiveNewModeratorViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userLang"
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
  "name": "isActive",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPrivate",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "topic",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "EventTopic",
  "kind": "LinkedField",
  "name": "topics",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v6/*: any*/),
    (v7/*: any*/)
  ],
  "storageKey": null
},
v9 = [
  {
    "kind": "Variable",
    "name": "userLang",
    "variableName": "userLang"
  }
],
v10 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v12 = {
  "kind": "Literal",
  "name": "after",
  "value": ""
},
v13 = [
  (v12/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  }
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v15/*: any*/),
    (v2/*: any*/),
    (v16/*: any*/),
    (v17/*: any*/)
  ],
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endCursor",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNextPage",
  "storageKey": null
},
v23 = {
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
    (v21/*: any*/),
    (v22/*: any*/)
  ],
  "storageKey": null
},
v24 = {
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
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lang",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v27 = [
  (v12/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 1000
  }
],
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "question",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "likedByCount",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "lang",
      "variableName": "userLang"
    }
  ],
  "kind": "ScalarField",
  "name": "questionTranslated",
  "storageKey": null
},
v31 = {
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
        (v15/*: any*/),
        (v16/*: any*/),
        (v17/*: any*/)
      ],
      "storageKey": null
    },
    (v20/*: any*/),
    (v28/*: any*/),
    (v25/*: any*/),
    (v30/*: any*/)
  ],
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "concreteType": "EventQuestionTopic",
  "kind": "LinkedField",
  "name": "topics",
  "plural": true,
  "selections": [
    (v6/*: any*/),
    (v7/*: any*/),
    (v19/*: any*/)
  ],
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isLikedByViewer",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "onDeckPosition",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    (v21/*: any*/),
    (v22/*: any*/)
  ],
  "storageKey": null
},
v36 = {
  "kind": "Literal",
  "name": "first",
  "value": 100
},
v37 = [
  (v12/*: any*/),
  (v36/*: any*/)
],
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v15/*: any*/),
    {
      "alias": null,
      "args": (v10/*: any*/),
      "kind": "ScalarField",
      "name": "moderatorOf",
      "storageKey": null
    },
    (v16/*: any*/),
    (v17/*: any*/)
  ],
  "storageKey": null
},
v40 = {
  "kind": "Literal",
  "name": "topic",
  "value": "default"
},
v41 = [
  (v12/*: any*/),
  (v36/*: any*/),
  (v40/*: any*/)
],
v42 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "EventQuestionEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      (v14/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "EventQuestion",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v28/*: any*/),
          (v19/*: any*/),
          (v34/*: any*/),
          (v32/*: any*/),
          (v18/*: any*/),
          (v31/*: any*/),
          (v20/*: any*/),
          (v25/*: any*/),
          (v30/*: any*/),
          (v33/*: any*/),
          (v29/*: any*/),
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v23/*: any*/),
  (v24/*: any*/)
],
v43 = [
  "topic"
],
v44 = [
  (v12/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 500
  },
  (v40/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EventLiveNewModeratorViewQuery",
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
              (v4/*: any*/),
              (v5/*: any*/),
              (v8/*: any*/),
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
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "useQuestionQueueFragment"
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "QuestionCarouselFragment"
              },
              {
                "args": (v10/*: any*/),
                "kind": "FragmentSpread",
                "name": "useLiveFeedbackListFragment"
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "useQuestionsByTopicFragment"
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "useQueueByTopicFragment"
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "useOnDeckFragment"
              },
              {
                "args": (v9/*: any*/),
                "kind": "FragmentSpread",
                "name": "useQuestionModQueueFragment"
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
    "name": "EventLiveNewModeratorViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v11/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currentBroadcastMessage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v13/*: any*/),
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
                      (v14/*: any*/),
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
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v20/*: any*/),
                          (v11/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v23/*: any*/),
                  (v24/*: any*/)
                ],
                "storageKey": "broadcastMessages(after:\"\",first:50)"
              },
              {
                "alias": null,
                "args": (v13/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useBroadcastMessageListFragment_broadcastMessages",
                "kind": "LinkedHandle",
                "name": "broadcastMessages"
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
                      (v14/*: any*/),
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
                          (v25/*: any*/),
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
              (v26/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
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
                "name": "isViewerInvited",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "issueGuideUrl",
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
                          (v7/*: any*/),
                          (v26/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v14/*: any*/)
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
                "args": null,
                "concreteType": "EventQuestionQueue",
                "kind": "LinkedField",
                "name": "questionQueue",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": (v27/*: any*/),
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
                          (v14/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventQuestion",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v28/*: any*/),
                              (v18/*: any*/),
                              (v20/*: any*/),
                              (v29/*: any*/),
                              (v25/*: any*/),
                              (v30/*: any*/),
                              (v19/*: any*/),
                              (v31/*: any*/),
                              (v11/*: any*/),
                              (v32/*: any*/),
                              (v33/*: any*/),
                              (v34/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v35/*: any*/),
                      (v24/*: any*/)
                    ],
                    "storageKey": "questionRecord(after:\"\",first:1000)"
                  },
                  {
                    "alias": null,
                    "args": (v27/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionQueueFragment_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v27/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionCarousel_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v27/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "useOnDeckFragment_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  },
                  {
                    "alias": null,
                    "args": (v27/*: any*/),
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
                          (v14/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventQuestion",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v28/*: any*/),
                              (v18/*: any*/),
                              (v20/*: any*/),
                              (v25/*: any*/),
                              (v30/*: any*/),
                              (v33/*: any*/),
                              (v19/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "EventQuestionTopic",
                                "kind": "LinkedField",
                                "name": "topics",
                                "plural": true,
                                "selections": [
                                  (v6/*: any*/),
                                  (v19/*: any*/),
                                  (v7/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v29/*: any*/),
                              (v31/*: any*/),
                              (v11/*: any*/),
                              (v34/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v35/*: any*/),
                      (v24/*: any*/)
                    ],
                    "storageKey": "enqueuedQuestions(after:\"\",first:1000)"
                  },
                  {
                    "alias": null,
                    "args": (v27/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionQueueFragment_enqueuedQuestions",
                    "kind": "LinkedHandle",
                    "name": "enqueuedQuestions"
                  },
                  {
                    "alias": null,
                    "args": (v27/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "useOnDeckFragment_enqueuedQuestions",
                    "kind": "LinkedHandle",
                    "name": "enqueuedQuestions"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v37/*: any*/),
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
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventLiveFeedback",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v38/*: any*/),
                          (v39/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventLiveFeedback",
                            "kind": "LinkedField",
                            "name": "refFeedback",
                            "plural": false,
                            "selections": [
                              (v39/*: any*/),
                              (v2/*: any*/),
                              (v38/*: any*/),
                              (v20/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v20/*: any*/),
                          (v11/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v35/*: any*/),
                  (v24/*: any*/)
                ],
                "storageKey": "liveFeedback(after:\"\",first:100)"
              },
              {
                "alias": null,
                "args": (v37/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useLiveFeedbackListFragment_liveFeedback",
                "kind": "LinkedHandle",
                "name": "liveFeedback"
              },
              {
                "alias": null,
                "args": (v41/*: any*/),
                "concreteType": "EventQuestionConnection",
                "kind": "LinkedField",
                "name": "questionsByTopic",
                "plural": false,
                "selections": (v42/*: any*/),
                "storageKey": "questionsByTopic(after:\"\",first:100,topic:\"default\")"
              },
              {
                "alias": null,
                "args": (v41/*: any*/),
                "filters": (v43/*: any*/),
                "handle": "connection",
                "key": "useQuestionsByTopicFragment_questionsByTopic",
                "kind": "LinkedHandle",
                "name": "questionsByTopic"
              },
              {
                "alias": null,
                "args": (v44/*: any*/),
                "concreteType": "EventQuestionConnection",
                "kind": "LinkedField",
                "name": "topicQueue",
                "plural": false,
                "selections": (v42/*: any*/),
                "storageKey": "topicQueue(after:\"\",first:500,topic:\"default\")"
              },
              {
                "alias": null,
                "args": (v44/*: any*/),
                "filters": (v43/*: any*/),
                "handle": "connection",
                "key": "useQueueByTopicFragment_topicQueue",
                "kind": "LinkedHandle",
                "name": "topicQueue"
              },
              {
                "alias": null,
                "args": (v27/*: any*/),
                "concreteType": "EventQuestionConnection",
                "kind": "LinkedField",
                "name": "questionModQueue",
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
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventQuestion",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v28/*: any*/),
                          (v25/*: any*/),
                          (v30/*: any*/),
                          (v19/*: any*/),
                          (v34/*: any*/),
                          (v32/*: any*/),
                          (v18/*: any*/),
                          (v31/*: any*/),
                          (v20/*: any*/),
                          (v33/*: any*/),
                          (v29/*: any*/),
                          (v11/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v23/*: any*/),
                  (v24/*: any*/)
                ],
                "storageKey": "questionModQueue(after:\"\",first:1000)"
              },
              {
                "alias": null,
                "args": (v27/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useQuestionModQueueFragment_questionModQueue",
                "kind": "LinkedHandle",
                "name": "questionModQueue"
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
    "cacheID": "456bf5912be534e275f0ef7aaa66bf9a",
    "id": null,
    "metadata": {},
    "name": "EventLiveNewModeratorViewQuery",
    "operationKind": "query",
    "text": "query EventLiveNewModeratorViewQuery(\n  $eventId: ID!\n  $userLang: String!\n) {\n  node(id: $eventId) {\n    __typename\n    id\n    ... on Event {\n      isViewerModerator\n      isActive\n      isPrivate\n      topics {\n        id\n        topic\n        description\n      }\n      ...useBroadcastMessageListFragment\n      ...EventVideoFragment\n      ...useEventDetailsFragment\n      ...SpeakerListFragment\n      ...useQuestionQueueFragment_2ktdWx\n      ...QuestionCarouselFragment_2ktdWx\n      ...useLiveFeedbackListFragment_32qNee\n      ...useQuestionsByTopicFragment_2ktdWx\n      ...useQueueByTopicFragment_2ktdWx\n      ...useOnDeckFragment_2ktdWx\n      ...useQuestionModQueueFragment_2ktdWx\n    }\n  }\n}\n\nfragment BroadcastMessageActionsFragment on EventBroadcastMessage {\n  id\n  ...DeleteBroadcastMessageButtonFragment\n  ...EditBroadcastMessageButtonFragment\n}\n\nfragment BroadcastMessageAuthorFragment on EventBroadcastMessage {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment BroadcastMessageContentFragment on EventBroadcastMessage {\n  broadcastMessage\n}\n\nfragment DeleteBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n  position\n}\n\nfragment DeleteButtonFragment on EventQuestion {\n  id\n  position\n}\n\nfragment EditBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n}\n\nfragment EventVideoFragment on Event {\n  videos {\n    edges {\n      cursor\n      node {\n        url\n        lang\n        id\n      }\n    }\n  }\n  id\n}\n\nfragment LikeFragment on EventQuestion {\n  id\n  isLikedByViewer\n}\n\nfragment LiveFeedbackAuthorFragment_32qNee on EventLiveFeedback {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n    moderatorOf(eventId: $eventId)\n  }\n  createdAt\n}\n\nfragment LiveFeedbackReplyFragment_32qNee on EventLiveFeedback {\n  id\n  message\n  ...LiveFeedbackAuthorFragment_32qNee\n}\n\nfragment QuestionActionsFragment_43mCLt on EventQuestion {\n  id\n  ...QuoteFragment_43mCLt\n  ...LikeFragment\n  ...QueueButtonFragment\n  ...DeleteButtonFragment\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionCarouselFragment_2ktdWx on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          position\n          ...QuestionAuthorFragment\n          ...QuestionContentFragment_43mCLt\n          refQuestion {\n            ...QuestionQuoteFragment_43mCLt\n            id\n          }\n          id\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment QuestionContentFragment_43mCLt on EventQuestion {\n  question\n  lang\n  questionTranslated(lang: $userLang)\n}\n\nfragment QuestionQuoteFragment_43mCLt on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_43mCLt\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n\nfragment QuestionTopicsFragment on EventQuestion {\n  topics {\n    topic\n    description\n    position\n  }\n}\n\nfragment QueueButtonFragment on EventQuestion {\n  id\n  question\n  position\n  topics {\n    topic\n    position\n  }\n}\n\nfragment QuoteFragment_43mCLt on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_43mCLt\n}\n\nfragment SpeakerListFragment on Event {\n  speakers {\n    edges {\n      node {\n        id\n        pictureUrl\n        name\n        description\n        title\n      }\n      cursor\n    }\n  }\n  id\n}\n\nfragment useBroadcastMessageListFragment on Event {\n  id\n  currentBroadcastMessage\n  broadcastMessages(first: 50, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        broadcastMessage\n        isVisible\n        createdBy {\n          firstName\n          id\n        }\n        ...BroadcastMessageActionsFragment\n        ...BroadcastMessageAuthorFragment\n        ...BroadcastMessageContentFragment\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useEventDetailsFragment on Event {\n  id\n  title\n  topic\n  description\n  startDateTime\n  endDateTime\n  isActive\n  isViewerModerator\n  isPrivate\n  isViewerInvited\n  issueGuideUrl\n  topics {\n    id\n    topic\n    description\n  }\n}\n\nfragment useLiveFeedbackListFragment_32qNee on Event {\n  id\n  liveFeedback(first: 100, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        message\n        createdBy {\n          id\n          firstName\n          moderatorOf(eventId: $eventId)\n        }\n        refFeedback {\n          createdBy {\n            id\n            firstName\n            moderatorOf(eventId: $eventId)\n          }\n          ...LiveFeedbackReplyFragment_32qNee\n          id\n        }\n        ...LiveFeedbackReplyFragment_32qNee\n        ...LiveFeedbackAuthorFragment_32qNee\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useOnDeckFragment_2ktdWx on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          topics {\n            topic\n            description\n            position\n          }\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionActionsFragment_43mCLt\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment_43mCLt\n          ...QuestionTopicsFragment\n          position\n          onDeckPosition\n          refQuestion {\n            ...QuestionQuoteFragment_43mCLt\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    enqueuedQuestions(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          topics {\n            topic\n            description\n            position\n          }\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionActionsFragment_43mCLt\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment_43mCLt\n          ...QuestionTopicsFragment\n          position\n          onDeckPosition\n          refQuestion {\n            ...QuestionQuoteFragment_43mCLt\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment useQuestionModQueueFragment_2ktdWx on Event {\n  id\n  currentQuestion\n  questionModQueue(first: 1000, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        question\n        lang\n        questionTranslated(lang: $userLang)\n        position\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n        createdBy {\n          firstName\n          id\n        }\n        refQuestion {\n          ...QuestionQuoteFragment_43mCLt\n          id\n        }\n        ...QuestionActionsFragment_43mCLt\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment_43mCLt\n        ...QuestionStatsFragment\n        ...QuestionTopicsFragment\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useQuestionQueueFragment_2ktdWx on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment_43mCLt\n          position\n          refQuestion {\n            ...QuestionQuoteFragment_43mCLt\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    enqueuedQuestions(first: 1000, after: \"\") {\n      edges {\n        cursor\n        node {\n          id\n          question\n          createdBy {\n            firstName\n            id\n          }\n          ...QuestionActionsFragment_43mCLt\n          ...QuestionAuthorFragment\n          ...QuestionStatsFragment\n          ...QuestionContentFragment_43mCLt\n          position\n          refQuestion {\n            ...QuestionQuoteFragment_43mCLt\n            id\n          }\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment useQuestionsByTopicFragment_2ktdWx on Event {\n  id\n  currentQuestion\n  questionsByTopic(first: 100, after: \"\", topic: \"default\") {\n    edges {\n      cursor\n      node {\n        id\n        question\n        position\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n        createdBy {\n          firstName\n          id\n        }\n        refQuestion {\n          ...QuestionQuoteFragment_43mCLt\n          id\n        }\n        ...QuestionActionsFragment_43mCLt\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment_43mCLt\n        ...QuestionStatsFragment\n        ...QuestionTopicsFragment\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useQueueByTopicFragment_2ktdWx on Event {\n  id\n  currentQuestion\n  topicQueue(first: 500, after: \"\", topic: \"default\") {\n    edges {\n      cursor\n      node {\n        id\n        question\n        position\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n        createdBy {\n          firstName\n          id\n        }\n        refQuestion {\n          ...QuestionQuoteFragment_43mCLt\n          id\n        }\n        ...QuestionActionsFragment_43mCLt\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment_43mCLt\n        ...QuestionStatsFragment\n        ...QuestionTopicsFragment\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fda64dbc5d5155a7bd606743d13f979c";

export default node;
