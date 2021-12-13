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
        readonly edge: {
            readonly node: {
                readonly id: string;
            };
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
    edge {
      node {
        id
      }
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
        "concreteType": "EventQuestionEdgeContainer",
        "kind": "LinkedField",
        "name": "questionRemovedFromRecord",
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
        "concreteType": "EventQuestionEdgeContainer",
        "kind": "LinkedField",
        "name": "questionRemovedFromRecord",
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a09384b87e0f29a551c173e778de2f81",
    "id": null,
    "metadata": {},
    "name": "useQuestionQueueRemovedFromRecordSubscription",
    "operationKind": "subscription",
    "text": "subscription useQuestionQueueRemovedFromRecordSubscription(\n  $eventId: ID!\n) {\n  questionRemovedFromRecord(eventId: $eventId) {\n    edge {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '63e1e1d736dd42bdf061fde38eb12ffd';
export default node;
