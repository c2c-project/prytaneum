/**
 * @generated SignedSource<<445d90033ef00c8f957d9f00133b627e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useQuestionCreatedSubscription$variables = {
  connections: ReadonlyArray<string>;
  eventId: string;
  lang: string;
  viewerOnly?: boolean | null;
};
export type useQuestionCreatedSubscription$data = {
  readonly questionCreated: {
    readonly edge: {
      readonly cursor: string;
      readonly node: {
        readonly createdBy: {
          readonly firstName: string | null;
        } | null;
        readonly id: string;
        readonly isVisible: boolean;
        readonly onDeckPosition: string;
        readonly position: string;
        readonly question: string;
        readonly refQuestion: {
          readonly " $fragmentSpreads": FragmentRefs<"QuestionQuoteFragment">;
        } | null;
        readonly topics: ReadonlyArray<{
          readonly description: string;
          readonly position: string;
          readonly topic: string;
        }> | null;
        readonly " $fragmentSpreads": FragmentRefs<"QuestionActionsFragment" | "QuestionAuthorFragment" | "QuestionContentFragment" | "QuestionStatsFragment">;
      };
    };
  };
};
export type useQuestionCreatedSubscription = {
  response: useQuestionCreatedSubscription$data;
  variables: useQuestionCreatedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lang"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "viewerOnly"
},
v4 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  },
  {
    "kind": "Variable",
    "name": "viewerOnly",
    "variableName": "viewerOnly"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "name": "position",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isVisible",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "onDeckPosition",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "EventQuestionTopic",
  "kind": "LinkedField",
  "name": "topics",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "topic",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    (v8/*: any*/)
  ],
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v13 = [
  {
    "kind": "Variable",
    "name": "lang",
    "variableName": "lang"
  }
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lang",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": (v13/*: any*/),
  "kind": "ScalarField",
  "name": "questionTranslated",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useQuestionCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "EventQuestionEdgeContainer",
        "kind": "LinkedField",
        "name": "questionCreated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestionEdge",
            "kind": "LinkedField",
            "name": "edge",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestion",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v12/*: any*/)
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
                      {
                        "args": (v13/*: any*/),
                        "kind": "FragmentSpread",
                        "name": "QuestionQuoteFragment"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "args": (v13/*: any*/),
                    "kind": "FragmentSpread",
                    "name": "QuestionActionsFragment"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "QuestionAuthorFragment"
                  },
                  {
                    "args": (v13/*: any*/),
                    "kind": "FragmentSpread",
                    "name": "QuestionContentFragment"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "QuestionStatsFragment"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "useQuestionCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "EventQuestionEdgeContainer",
        "kind": "LinkedField",
        "name": "questionCreated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestionEdge",
            "kind": "LinkedField",
            "name": "edge",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestion",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v12/*: any*/),
                      (v6/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/)
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
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "createdBy",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          (v12/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v16/*: any*/),
                      (v7/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
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
                    "name": "likedByCount",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "edge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "69553f4cd4f13f0ab39f264ba5ac2468",
    "id": null,
    "metadata": {},
    "name": "useQuestionCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription useQuestionCreatedSubscription(\n  $eventId: ID!\n  $lang: String!\n  $viewerOnly: Boolean\n) {\n  questionCreated(eventId: $eventId, viewerOnly: $viewerOnly) {\n    edge {\n      cursor\n      node {\n        id\n        question\n        position\n        isVisible\n        onDeckPosition\n        topics {\n          topic\n          description\n          position\n        }\n        createdBy {\n          firstName\n          id\n        }\n        refQuestion {\n          ...QuestionQuoteFragment_3iqx2P\n          id\n        }\n        ...QuestionActionsFragment_3iqx2P\n        ...QuestionAuthorFragment\n        ...QuestionContentFragment_3iqx2P\n        ...QuestionStatsFragment\n      }\n    }\n  }\n}\n\nfragment DeleteButtonFragment on EventQuestion {\n  id\n  position\n}\n\nfragment LikeFragment on EventQuestion {\n  id\n  isLikedByViewer\n}\n\nfragment QuestionActionsFragment_3iqx2P on EventQuestion {\n  id\n  ...QuoteFragment_3iqx2P\n  ...LikeFragment\n  ...QueueButtonFragment\n  ...DeleteButtonFragment\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionContentFragment_3iqx2P on EventQuestion {\n  question\n  lang\n  questionTranslated(lang: $lang)\n}\n\nfragment QuestionQuoteFragment_3iqx2P on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_3iqx2P\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n\nfragment QueueButtonFragment on EventQuestion {\n  id\n  question\n  position\n  topics {\n    topic\n    position\n  }\n}\n\nfragment QuoteFragment_3iqx2P on EventQuestion {\n  id\n  ...QuestionAuthorFragment\n  ...QuestionContentFragment_3iqx2P\n}\n"
  }
};
})();

(node as any).hash = "a2c5fb4eb067cffae61a6ba0aff02a86";

export default node;
