/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type QuestionCarouselRemovedSubscriptionVariables = {
    eventId: string;
    connections: Array<string>;
};
export type QuestionCarouselRemovedSubscriptionResponse = {
    readonly questionRemovedFromRecord: {
        readonly edge: {
            readonly node: {
                readonly id: string;
            };
        };
    };
};
export type QuestionCarouselRemovedSubscription = {
    readonly response: QuestionCarouselRemovedSubscriptionResponse;
    readonly variables: QuestionCarouselRemovedSubscriptionVariables;
};



/*
subscription QuestionCarouselRemovedSubscription(
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
    "name": "QuestionCarouselRemovedSubscription",
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
    "name": "QuestionCarouselRemovedSubscription",
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
    "cacheID": "805d358c046b157b3a5c3ddcebfa7c5c",
    "id": null,
    "metadata": {},
    "name": "QuestionCarouselRemovedSubscription",
    "operationKind": "subscription",
    "text": "subscription QuestionCarouselRemovedSubscription(\n  $eventId: ID!\n) {\n  questionRemovedFromRecord(eventId: $eventId) {\n    edge {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '45f7989afdce9cd84c8d184b4e5c7caf';
export default node;
