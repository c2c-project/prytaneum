/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type useQuestionQueueRemovedFromRecordSubscriptionVariables = {
    eventId: string;
    connections: Array<string>;
};
export type useQuestionQueueRemovedFromRecordSubscriptionResponse = {
    readonly questionRemovedFromRecord: {
        readonly node: {
            readonly id: string;
        };
    };
};
export type useQuestionQueueRemovedFromRecordSubscription = {
    readonly response: useQuestionQueueRemovedFromRecordSubscriptionResponse;
    readonly variables: useQuestionQueueRemovedFromRecordSubscriptionVariables;
};



/*
subscription useQuestionQueueRemovedFromRecordSubscription(
  $eventId: ID!
) {
  questionRemovedFromRecord(eventId: $eventId) {
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
    "name": "useQuestionQueueRemovedFromRecordSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventQuestionEdge",
        "kind": "LinkedField",
        "name": "questionRemovedFromRecord",
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
    "name": "useQuestionQueueRemovedFromRecordSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventQuestionEdge",
        "kind": "LinkedField",
        "name": "questionRemovedFromRecord",
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
    "cacheID": "2b3d05d91acace1c62e642d4e9085594",
    "id": null,
    "metadata": {},
    "name": "useQuestionQueueRemovedFromRecordSubscription",
    "operationKind": "subscription",
    "text": "subscription useQuestionQueueRemovedFromRecordSubscription(\n  $eventId: ID!\n) {\n  questionRemovedFromRecord(eventId: $eventId) {\n    node {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f5f19177bf5a7d088d3640090f52ca60';
export default node;
