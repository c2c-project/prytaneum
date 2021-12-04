/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import {  } from "relay-runtime";
export type useQuestionListCreatedSubscriptionVariables = {
    eventId: string;
};
export type useQuestionListCreatedSubscriptionResponse = {
    readonly questionCreated: {
        readonly cursor: string;
        readonly node: {
            readonly id: string;
            readonly position: number | null;
            readonly " $fragmentRefs": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment" | "QuestionStatsFragment">;
        };
    };
};
export type useQuestionListCreatedSubscription = {
    readonly response: useQuestionListCreatedSubscriptionResponse;
    readonly variables: useQuestionListCreatedSubscriptionVariables;
};



/*
subscription useQuestionListCreatedSubscription(
  $eventId: ID!
) {
  questionCreated(eventId: $eventId) {
    cursor
    node {
      id
      position
      ...QuestionAuthorFragment
      ...QuestionContentFragment
      ...QuestionStatsFragment
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useQuestionListCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventQuestionEdge",
        "kind": "LinkedField",
        "name": "questionCreated",
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
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "QuestionAuthorFragment"
              },
              {
                "args": null,
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useQuestionListCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventQuestionEdge",
        "kind": "LinkedField",
        "name": "questionCreated",
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
              (v4/*: any*/),
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
      }
    ]
  },
  "params": {
    "cacheID": "c643972813c57fb0825fb0a8e83f1784",
    "id": null,
    "metadata": {},
    "name": "useQuestionListCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription useQuestionListCreatedSubscription(\n  $eventId: ID!\n) {\n  questionCreated(eventId: $eventId) {\n    cursor\n    node {\n      id\n      position\n      ...QuestionAuthorFragment\n      ...QuestionContentFragment\n      ...QuestionStatsFragment\n    }\n  }\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionContentFragment on EventQuestion {\n  question\n}\n\nfragment QuestionStatsFragment on EventQuestion {\n  id\n  likedByCount\n}\n"
  }
};
})();
(node as any).hash = 'ac918b718ef2581fd1c069a04735c63b';
export default node;
