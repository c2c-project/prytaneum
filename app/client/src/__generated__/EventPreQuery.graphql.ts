/**
 * @generated SignedSource<<12dcef6dbfb592089816597ed214de26>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventPreQuery$variables = {
  eventId: string;
};
export type EventPreQuery$data = {
  readonly node: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"SpeakerListFragment" | "useEventDetailsFragment" | "useLiveFeedbackListFragment" | "useViewerOnlyQuestionListFragment">;
  } | null;
};
export type EventPreQuery = {
  response: EventPreQuery$data;
  variables: EventPreQuery$variables;
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
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "after",
  "value": ""
},
v5 = [
  (v4/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  },
  {
    "kind": "Literal",
    "name": "viewerOnly",
    "value": true
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "question",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/),
    (v10/*: any*/)
  ],
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v13 = {
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
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v14 = {
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
v15 = [
  (v4/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EventPreQuery",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useViewerOnlyQuestionListFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useLiveFeedbackListFragment"
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
    "name": "EventPreQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currentQuestion",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
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
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventQuestion",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "createdBy",
                            "plural": false,
                            "selections": [
                              (v8/*: any*/),
                              (v2/*: any*/),
                              (v9/*: any*/),
                              (v10/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventQuestion",
                            "kind": "LinkedField",
                            "name": "refQuestion",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v11/*: any*/),
                              (v12/*: any*/),
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v12/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isLikedByViewer",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "position",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "likedByCount",
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v13/*: any*/),
                  (v14/*: any*/)
                ],
                "storageKey": "questions(after:\"\",first:50,viewerOnly:true)"
              },
              {
                "alias": null,
                "args": (v5/*: any*/),
                "filters": [
                  "viewerOnly"
                ],
                "handle": "connection",
                "key": "useViewerOnlyQuestionListFragment_questions",
                "kind": "LinkedHandle",
                "name": "questions"
              },
              {
                "alias": null,
                "args": (v15/*: any*/),
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
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventLiveFeedback",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v16/*: any*/),
                          (v11/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventLiveFeedback",
                            "kind": "LinkedField",
                            "name": "refFeedback",
                            "plural": false,
                            "selections": [
                              (v11/*: any*/),
                              (v2/*: any*/),
                              (v16/*: any*/),
                              (v12/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v12/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v13/*: any*/),
                  (v14/*: any*/)
                ],
                "storageKey": "liveFeedback(after:\"\",first:100)"
              },
              {
                "alias": null,
                "args": (v15/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "useLiveFeedbackListFragment_liveFeedback",
                "kind": "LinkedHandle",
                "name": "liveFeedback"
              },
              (v17/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "topic",
                "storageKey": null
              },
              (v18/*: any*/),
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
                "name": "isViewerModerator",
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
                          (v18/*: any*/),
                          (v17/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
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
    "cacheID": "87f540d57d97a16f20df1a533d79d8df",
    "id": null,
    "metadata": {},
    "name": "EventPreQuery",
    "operationKind": "query",
    "text": "query EventPreQuery(\n  $eventId: ID!\n) {\n  node(id: $eventId) {\n    __typename\n    id\n    ... on Event {\n      ...useViewerOnlyQuestionListFragment\n      ...useLiveFeedbackListFragment\n      ...useEventDetailsFragment\n      ...SpeakerListFragment\n    }\n  }\n}\n\nfragment DeleteButtonFragment on EventQuestion {\n  id\n  position\n}\n\nfragment LikeFragment on EventQuestion {\n  id\n  isLikedByViewer\n}\n\nfragment LiveFeedbackAuthorFragment on EventLiveFeedback {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment LiveFeedbackReplyFragment on EventLiveFeedback {\n  id\n  message\n  ...LiveFeedbackAuthorFragment\n}\n\nfragment QuestionActionsFragment on EventQuestion {\n  id\n  ...QuoteFragment\n  ...LikeFragment\n  ...QueueButtonFragment\n  ...DeleteButtonFragment\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionContentFragment on EventQuestion {\n  question\n}\n\nfragment QuestionQuoteFragment on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n\nfragment QueueButtonFragment on EventQuestion {\n  id\n  position\n}\n\nfragment QuoteFragment on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment\n}\n\nfragment SpeakerListFragment on Event {\n  speakers {\n    edges {\n      node {\n        id\n        pictureUrl\n        name\n        description\n        title\n      }\n      cursor\n    }\n  }\n  id\n}\n\nfragment useEventDetailsFragment on Event {\n  id\n  title\n  topic\n  description\n  startDateTime\n  endDateTime\n  isActive\n  isViewerModerator\n}\n\nfragment useLiveFeedbackListFragment on Event {\n  id\n  liveFeedback(first: 100, after: \"\") {\n    edges {\n      cursor\n      node {\n        id\n        message\n        createdBy {\n          id\n          firstName\n        }\n        refFeedback {\n          createdBy {\n            id\n          }\n          ...LiveFeedbackReplyFragment\n          id\n        }\n        ...LiveFeedbackReplyFragment\n        ...LiveFeedbackAuthorFragment\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment useViewerOnlyQuestionListFragment on Event {\n  id\n  currentQuestion\n  questions(first: 50, after: \"\", viewerOnly: true) {\n    edges {\n      cursor\n      node {\n        id\n        question\n        createdBy {\n          firstName\n          id\n        }\n        refQuestion {\n          ...QuestionQuoteFragment\n          id\n        }\n        ...QuestionActionsFragment\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment\n        ...QuestionStatsFragment\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "71dede6beeecee1bc6c05b022dfd3508";

export default node;
