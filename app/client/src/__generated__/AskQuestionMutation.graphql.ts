/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CreateQuestion = {
    eventId: string;
<<<<<<< HEAD
<<<<<<< HEAD
    isFollowUp?: boolean | null | undefined;
    isQuote?: boolean | null | undefined;
    question: string;
    refQuestion?: string | null | undefined;
=======
=======
>>>>>>> chore(project): updated generation
    isFollowUp?: boolean | null;
    isQuote?: boolean | null;
    question: string;
    refQuestion?: string | null;
<<<<<<< HEAD
>>>>>>> chore(project): updated generation
=======
>>>>>>> chore(project): updated generation
};
export type AskQuestionMutationVariables = {
    input: CreateQuestion;
};
export type AskQuestionMutationResponse = {
    readonly createQuestion: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly createdAt: Date | null;
                readonly question: string | null;
                readonly createdBy: {
                    readonly id: string;
                    readonly firstName: string | null;
                    readonly lastName: string | null;
                } | null;
            };
        } | null;
    };
};
export type AskQuestionMutation = {
    readonly response: AskQuestionMutationResponse;
    readonly variables: AskQuestionMutationVariables;
};



/*
mutation AskQuestionMutation(
  $input: CreateQuestion!
) {
  createQuestion(input: $input) {
    isError
    message
    body {
      cursor
      node {
        id
        createdAt
        question
        createdBy {
          id
          firstName
          lastName
        }
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
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "EventQuestionMutationResponse",
    "kind": "LinkedField",
    "name": "createQuestion",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isError",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "EventQuestionEdge",
        "kind": "LinkedField",
        "name": "body",
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
            "concreteType": "EventQuestion",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "createdBy",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
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
                    "name": "lastName",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AskQuestionMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AskQuestionMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "d00f5cead282251c8c50d706a2b7819c",
    "id": null,
    "metadata": {},
    "name": "AskQuestionMutation",
    "operationKind": "mutation",
    "text": "mutation AskQuestionMutation(\n  $input: CreateQuestion!\n) {\n  createQuestion(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        createdAt\n        question\n        createdBy {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '12c8dcac98bfb6588516e97ac05305e3';
export default node;
