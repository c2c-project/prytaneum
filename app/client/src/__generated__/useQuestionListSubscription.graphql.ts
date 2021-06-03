/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useQuestionListSubscriptionVariables = {
    eventId: string;
};
export type useQuestionListSubscriptionResponse = {
    readonly eventQuestionCreated: {
        readonly cursor: string;
        readonly node: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"QuestionCardFragment">;
        };
    };
};
export type useQuestionListSubscription = {
    readonly response: useQuestionListSubscriptionResponse;
    readonly variables: useQuestionListSubscriptionVariables;
};



/*
subscription useQuestionListSubscription(
  $eventId: ID!
) {
  eventQuestionCreated(eventId: $eventId) {
    cursor
    node {
      id
      ...QuestionCardFragment
    }
  }
}

fragment QuestionCardFragment on EventQuestion {
  id
  question
  createdBy {
    id
    firstName
  }
  createdAt
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
  "name": "cursor",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useQuestionListSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventQuestionEdge",
        "kind": "LinkedField",
        "name": "eventQuestionCreated",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "QuestionCardFragment"
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
    "name": "useQuestionListSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventQuestionEdge",
        "kind": "LinkedField",
        "name": "eventQuestionCreated",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                "kind": "ScalarField",
                "name": "question",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "createdBy",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "firstName",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
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
    "cacheID": "8422d746abd0d6511e3874fef41e4198",
    "id": null,
    "metadata": {},
    "name": "useQuestionListSubscription",
    "operationKind": "subscription",
    "text": "subscription useQuestionListSubscription(\n  $eventId: ID!\n) {\n  eventQuestionCreated(eventId: $eventId) {\n    cursor\n    node {\n      id\n      ...QuestionCardFragment\n    }\n  }\n}\n\nfragment QuestionCardFragment on EventQuestion {\n  id\n  question\n  createdBy {\n    id\n    firstName\n  }\n  createdAt\n}\n"
  }
};
})();
(node as any).hash = 'd98b39582c32907f1180d2ea48a40b96';
export default node;
