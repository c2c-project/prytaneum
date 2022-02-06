/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import {  } from "relay-runtime";
export type Operation = "CREATE" | "DELETE" | "UPDATE" | "%future added value";
export type useLiveFeedbackListSubscriptionVariables = {
    eventId: string;
};
export type useLiveFeedbackListSubscriptionResponse = {
    readonly feedbackCRUD: {
        readonly operationType: Operation;
        readonly edge: {
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly message: string;
                readonly createdBy: {
                    readonly id: string;
                } | null;
                readonly refFeedback: {
                    readonly createdBy: {
                        readonly id: string;
                    } | null;
                    readonly " $fragmentRefs": FragmentRefs<"LiveFeedbackReplyFragment">;
                } | null;
                readonly " $fragmentRefs": FragmentRefs<"LiveFeedbackReplyFragment" | "LiveFeedbackAuthorFragment">;
            };
        };
    };
};
export type useLiveFeedbackListSubscription = {
    readonly response: useLiveFeedbackListSubscriptionResponse;
    readonly variables: useLiveFeedbackListSubscriptionVariables;
};



/*
subscription useLiveFeedbackListSubscription(
  $eventId: ID!
) {
  feedbackCRUD(eventId: $eventId) {
    operationType
    edge {
      cursor
      node {
        id
        message
        createdBy {
          id
        }
        refFeedback {
          createdBy {
            id
          }
          ...LiveFeedbackReplyFragment
          id
        }
        ...LiveFeedbackReplyFragment
        ...LiveFeedbackAuthorFragment
      }
    }
  }
}

fragment LiveFeedbackAuthorFragment on EventLiveFeedback {
  createdBy {
    id
    firstName
    avatar
  }
  createdAt
}

fragment LiveFeedbackReplyFragment on EventLiveFeedback {
  id
  message
  ...LiveFeedbackAuthorFragment
}
*/

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
    "name": "eventId",
    "variableName": "eventId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "operationType",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v4/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "LiveFeedbackReplyFragment"
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useLiveFeedbackListSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FeedbackOperation",
        "kind": "LinkedField",
        "name": "feedbackCRUD",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventLiveFeedbackEdge",
            "kind": "LinkedField",
            "name": "edge",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventLiveFeedback",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventLiveFeedback",
                    "kind": "LinkedField",
                    "name": "refFeedback",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "LiveFeedbackAuthorFragment"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useLiveFeedbackListSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FeedbackOperation",
        "kind": "LinkedField",
        "name": "feedbackCRUD",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventLiveFeedbackEdge",
            "kind": "LinkedField",
            "name": "edge",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventLiveFeedback",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EventLiveFeedback",
                    "kind": "LinkedField",
                    "name": "refFeedback",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "09d0b7abfb397ca6e066d562d5284311",
    "id": null,
    "metadata": {},
    "name": "useLiveFeedbackListSubscription",
    "operationKind": "subscription",
    "text": "subscription useLiveFeedbackListSubscription(\n  $eventId: ID!\n) {\n  feedbackCRUD(eventId: $eventId) {\n    operationType\n    edge {\n      cursor\n      node {\n        id\n        message\n        createdBy {\n          id\n        }\n        refFeedback {\n          createdBy {\n            id\n          }\n          ...LiveFeedbackReplyFragment\n          id\n        }\n        ...LiveFeedbackReplyFragment\n        ...LiveFeedbackAuthorFragment\n      }\n    }\n  }\n}\n\nfragment LiveFeedbackAuthorFragment on EventLiveFeedback {\n  createdBy {\n    id\n    firstName\n    avatar\n  }\n  createdAt\n}\n\nfragment LiveFeedbackReplyFragment on EventLiveFeedback {\n  id\n  message\n  ...LiveFeedbackAuthorFragment\n}\n"
  }
};
})();
(node as any).hash = '79317d818502fdfb191313facf1e3a2b';
export default node;
