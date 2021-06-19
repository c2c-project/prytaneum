/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useQuestionListSubscriptionVariables = {
    eventId: string;
};
export type useQuestionListSubscriptionResponse = {
    readonly questionCRUD: {
        readonly cursor: string;
        readonly node: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"QuestionStatsFragment">;
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
  questionCRUD(eventId: $eventId) {
    cursor
    node {
      id
      ...QuestionStatsFragment
    }
  }
}

fragment QuestionStatsFragment on EventQuestion {
  id
  likedByCount
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
        "name": "questionCRUD",
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
                "name": "QuestionStatsFragment"
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
        "name": "questionCRUD",
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
                "name": "likedByCount",
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
    "cacheID": "73c1ad47bf8fceaa9bae92b1b07a93b2",
    "id": null,
    "metadata": {},
    "name": "useQuestionListSubscription",
    "operationKind": "subscription",
    "text": "subscription useQuestionListSubscription(\n  $eventId: ID!\n) {\n  questionCRUD(eventId: $eventId) {\n    cursor\n    node {\n      id\n      ...QuestionStatsFragment\n    }\n  }\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n"
  }
};
})();
(node as any).hash = '2eb4614e7dc040a593f38a1ce56ffba7';
export default node;
