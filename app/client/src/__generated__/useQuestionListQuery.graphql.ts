/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useQuestionListQueryVariables = {
    eventId: string;
};
export type useQuestionListQueryResponse = {
    readonly questionsByEventId: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"QuestionCardFragment">;
    }> | null;
};
export type useQuestionListQuery = {
    readonly response: useQuestionListQueryResponse;
    readonly variables: useQuestionListQueryVariables;
};



/*
query useQuestionListQuery(
  $eventId: ID!
) {
  questionsByEventId(eventId: $eventId) {
    id
    ...QuestionCardFragment
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useQuestionListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventQuestion",
        "kind": "LinkedField",
        "name": "questionsByEventId",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "QuestionCardFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useQuestionListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventQuestion",
        "kind": "LinkedField",
        "name": "questionsByEventId",
        "plural": true,
        "selections": [
          (v2/*: any*/),
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
              (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "2ba74adaf238cb0002f20b1929830b18",
    "id": null,
    "metadata": {},
    "name": "useQuestionListQuery",
    "operationKind": "query",
    "text": "query useQuestionListQuery(\n  $eventId: ID!\n) {\n  questionsByEventId(eventId: $eventId) {\n    id\n    ...QuestionCardFragment\n  }\n}\n\nfragment QuestionCardFragment on EventQuestion {\n  id\n  question\n  createdBy {\n    id\n    firstName\n  }\n  createdAt\n}\n"
  }
};
})();
(node as any).hash = '148645215abd9489f1b71ed4d1360a2e';
export default node;
