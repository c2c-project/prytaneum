/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateQuestion = {
    question: string;
    isQuote?: boolean | null;
    isFollowUp?: boolean | null;
    refQuestion?: string | null;
    eventId: string;
};
export type AskQuestionMutationVariables = {
    input: CreateQuestion;
};
export type AskQuestionMutationResponse = {
    readonly createQuestion: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly node: {
                readonly id: string;
                readonly question: string | null;
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
      node {
        id
        question
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
v1 = [
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
            "concreteType": "EventQuestion",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
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
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AskQuestionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "721a1a5453514891d6c1ad50e1699cff",
    "id": null,
    "metadata": {},
    "name": "AskQuestionMutation",
    "operationKind": "mutation",
    "text": "mutation AskQuestionMutation(\n  $input: CreateQuestion!\n) {\n  createQuestion(input: $input) {\n    isError\n    message\n    body {\n      node {\n        id\n        question\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3456d7db9631af9e39a77a20159fff90';
export default node;
