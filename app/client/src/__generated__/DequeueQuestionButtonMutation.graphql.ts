/**
 * @generated SignedSource<<67763c79e768ac846332d13571c49c25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveQuestionFromQueue = {
  eventId: string;
  questionId: string;
};
export type DequeueQuestionButtonMutation$variables = {
  input: RemoveQuestionFromQueue;
};
export type DequeueQuestionButtonMutationVariables = DequeueQuestionButtonMutation$variables;
export type DequeueQuestionButtonMutation$data = {
  readonly removeQuestionFromQueue: {
    readonly isError: boolean;
    readonly message: string;
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly position: string;
      };
    } | null;
  };
};
export type DequeueQuestionButtonMutationResponse = DequeueQuestionButtonMutation$data;
export type DequeueQuestionButtonMutation = {
  variables: DequeueQuestionButtonMutationVariables;
  response: DequeueQuestionButtonMutation$data;
};

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
    "name": "removeQuestionFromQueue",
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
    "name": "DequeueQuestionButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DequeueQuestionButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bab3fafa5cacc48aa6447ba39cfd9f21",
    "id": null,
    "metadata": {},
    "name": "DequeueQuestionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation DequeueQuestionButtonMutation(\n  $input: RemoveQuestionFromQueue!\n) {\n  removeQuestionFromQueue(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        position\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b6633a932e23782c1244f9b332e9766a";

export default node;
