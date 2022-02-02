/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CreateQuestion = {
    eventId: string;
    isFollowUp?: boolean | null | undefined;
    isQuote?: boolean | null | undefined;
    question: string;
    refQuestion?: string | null | undefined;
};
export type QuestionDialogMutationVariables = {
    input: CreateQuestion;
};
export type QuestionDialogMutationResponse = {
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
export type QuestionDialogMutation = {
    readonly response: QuestionDialogMutationResponse;
    readonly variables: QuestionDialogMutationVariables;
};



/*
mutation QuestionDialogMutation(
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
    "name": "QuestionDialogMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestionDialogMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "21f2dd9d5acd685c8446ea89974d0417",
    "id": null,
    "metadata": {},
    "name": "QuestionDialogMutation",
    "operationKind": "mutation",
    "text": "mutation QuestionDialogMutation(\n  $input: CreateQuestion!\n) {\n  createQuestion(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        createdAt\n        question\n        createdBy {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '28eef0dd4276b1f1cb82758a031d2353';
export default node;
