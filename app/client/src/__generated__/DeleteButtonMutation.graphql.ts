/**
 * @generated SignedSource<<fa4d1a0a009a8103e4779f5ed010b314>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteQuestion = {
  isVisible: boolean;
  questionId: string;
};
export type DeleteButtonMutation$variables = {
  input: DeleteQuestion;
};
export type DeleteButtonMutation$data = {
  readonly deleteQuestion: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type DeleteButtonMutation = {
  response: DeleteButtonMutation$data;
  variables: DeleteButtonMutation$variables;
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
    "name": "deleteQuestion",
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
    "name": "DeleteButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2091a5c713d7f841827d2977c3fe6d43",
    "id": null,
    "metadata": {},
    "name": "DeleteButtonMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteButtonMutation(\n  $input: DeleteQuestion!\n) {\n  deleteQuestion(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c729a68f29d653d84b862b865b0ad78b";

export default node;
