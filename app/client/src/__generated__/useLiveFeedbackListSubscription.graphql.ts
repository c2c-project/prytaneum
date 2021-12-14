/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
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
      }
    }
  }
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "eventId",
        "variableName": "eventId"
      }
    ],
    "concreteType": "FeedbackOperation",
    "kind": "LinkedField",
    "name": "feedbackCRUD",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "operationType",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "EventLiveFeedbackEdge",
        "kind": "LinkedField",
        "name": "edge",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EventLiveFeedback",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "message",
                "storageKey": null
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useLiveFeedbackListSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useLiveFeedbackListSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4e6790bc467a85ed3d340c2fe11f8eed",
    "id": null,
    "metadata": {},
    "name": "useLiveFeedbackListSubscription",
    "operationKind": "subscription",
    "text": "subscription useLiveFeedbackListSubscription(\n  $eventId: ID!\n) {\n  feedbackCRUD(eventId: $eventId) {\n    operationType\n    edge {\n      cursor\n      node {\n        id\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4dd515f068e03ec1321a4861ca265d65';
export default node;
