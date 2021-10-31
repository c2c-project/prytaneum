/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type useQuestionQueueRemovedFromEnqueuedSubscriptionVariables = {
    eventId: string;
    connections: Array<string>;
};
export type useQuestionQueueRemovedFromEnqueuedSubscriptionResponse = {
    readonly questionRemovedFromEnqueued: {
        readonly node: {
            readonly id: string;
        };
    };
};
export type useQuestionQueueRemovedFromEnqueuedSubscription = {
    readonly response: useQuestionQueueRemovedFromEnqueuedSubscriptionResponse;
    readonly variables: useQuestionQueueRemovedFromEnqueuedSubscriptionVariables;
};



/*
subscription useQuestionQueueRemovedFromEnqueuedSubscription(
  $eventId: ID!
) {
  questionRemovedFromEnqueued(eventId: $eventId) {
    node {
      id
    }
  }
}
*/

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
v2 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useQuestionQueueRemovedFromEnqueuedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventQuestionEdge",
        "kind": "LinkedField",
        "name": "questionRemovedFromEnqueued",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestion",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v3/*: any*/)
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
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useQuestionQueueRemovedFromEnqueuedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventQuestionEdge",
        "kind": "LinkedField",
        "name": "questionRemovedFromEnqueued",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestion",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6336bcb2a20459d4e9851ff58c320549",
    "id": null,
    "metadata": {},
    "name": "useQuestionQueueRemovedFromEnqueuedSubscription",
    "operationKind": "subscription",
    "text": "subscription useQuestionQueueRemovedFromEnqueuedSubscription(\n  $eventId: ID!\n) {\n  questionRemovedFromEnqueued(eventId: $eventId) {\n    node {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '08b4974104c8fe93a70edfb37127d559';
export default node;
