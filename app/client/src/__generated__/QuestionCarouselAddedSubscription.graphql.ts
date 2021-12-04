/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import {  } from "relay-runtime";
export type QuestionCarouselAddedSubscriptionVariables = {
    eventId: string;
    connections: Array<string>;
};
export type QuestionCarouselAddedSubscriptionResponse = {
    readonly questionAddedToRecord: {
        readonly node: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment">;
        };
    };
};
export type QuestionCarouselAddedSubscription = {
    readonly response: QuestionCarouselAddedSubscriptionResponse;
    readonly variables: QuestionCarouselAddedSubscriptionVariables;
};



/*
subscription QuestionCarouselAddedSubscription(
  $eventId: ID!
) {
  questionAddedToRecord(eventId: $eventId) {
    node {
      id
      ...QuestionAuthorFragment
      ...QuestionContentFragment
    }
  }
}

fragment QuestionAuthorFragment on EventQuestion {
  createdBy {
    id
    firstName
    avatar
  }
  createdAt
}

fragment QuestionContentFragment on EventQuestion {
  question
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
    "name": "QuestionCarouselAddedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventQuestionEdge",
        "kind": "LinkedField",
        "name": "questionAddedToRecord",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "QuestionAuthorFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "QuestionContentFragment"
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
    "name": "QuestionCarouselAddedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventQuestionEdge",
        "kind": "LinkedField",
        "name": "questionAddedToRecord",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "question",
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
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "appendEdge",
        "key": "",
        "kind": "LinkedHandle",
        "name": "questionAddedToRecord",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "b83c6b27475393c822352f4694512170",
    "id": null,
    "metadata": {},
    "name": "QuestionCarouselAddedSubscription",
    "operationKind": "subscription",
    "text": "subscription QuestionCarouselAddedSubscription(\n  $eventId: ID!\n) {\n  questionAddedToRecord(eventId: $eventId) {\n    node {\n      id\n      ...QuestionAuthorFragment\n      ...QuestionContentFragment\n    }\n  }\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionContentFragment on EventQuestion {\n  question\n}\n"
  }
};
})();
(node as any).hash = '9e10ad21e3a86c8fcc1e8e212fdb34a8';
export default node;
