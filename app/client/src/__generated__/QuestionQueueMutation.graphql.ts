/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UpdateQuestionPosition = {
    eventId: string;
    position: number;
    questionId: string;
};
export type QuestionQueueMutationVariables = {
    input: UpdateQuestionPosition;
};
export type QuestionQueueMutationResponse = {
    readonly updateQuestionPosition: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly position: number | null;
            };
        } | null;
    };
};
export type QuestionQueueMutationRawResponse = {
    readonly updateQuestionPosition: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: ({
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly position: number | null;
            };
        }) | null;
    };
};
export type QuestionQueueMutation = {
    readonly response: QuestionQueueMutationResponse;
    readonly variables: QuestionQueueMutationVariables;
    readonly rawResponse: QuestionQueueMutationRawResponse;
};



/*
mutation QuestionQueueMutation(
  $input: UpdateQuestionPosition!
) {
  updateQuestionPosition(input: $input) {
    isError
    message
    body {
      cursor
      node {
        id
        position
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
    "name": "updateQuestionPosition",
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
                "name": "position",
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
    "name": "QuestionQueueMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestionQueueMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2d7a5e85f80973632c7bb58ebdcd6a72",
    "id": null,
    "metadata": {},
    "name": "QuestionQueueMutation",
    "operationKind": "mutation",
    "text": "mutation QuestionQueueMutation(\n  $input: UpdateQuestionPosition!\n) {\n  updateQuestionPosition(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        position\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8ab3dc1fc2c96fa3f35bf76e9ca90b47';
export default node;
