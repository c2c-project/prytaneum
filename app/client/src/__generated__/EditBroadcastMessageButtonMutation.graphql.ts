/**
 * @generated SignedSource<<5d893038a303fbec438f9de51e9ac4a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditBroadcastMessage = {
  broadcastMessage: string;
  broadcastMessageId: string;
};
export type EditBroadcastMessageButtonMutation$variables = {
  input: EditBroadcastMessage;
};
export type EditBroadcastMessageButtonMutationVariables = EditBroadcastMessageButtonMutation$variables;
export type EditBroadcastMessageButtonMutation$data = {
  readonly editBroadcastMessage: {
    readonly isError: boolean;
    readonly message: string;
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
      };
    } | null;
  };
};
export type EditBroadcastMessageButtonMutationResponse = EditBroadcastMessageButtonMutation$data;
export type EditBroadcastMessageButtonMutation = {
  variables: EditBroadcastMessageButtonMutationVariables;
  response: EditBroadcastMessageButtonMutation$data;
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
    "concreteType": "EventBroadcastMessageMutationResponse",
    "kind": "LinkedField",
    "name": "editBroadcastMessage",
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
        "concreteType": "EventBroadcastMessageEdge",
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
            "concreteType": "EventBroadcastMessage",
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
    "name": "EditBroadcastMessageButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditBroadcastMessageButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "99e7ffbff2430327082c24fbd5eb66f9",
    "id": null,
    "metadata": {},
    "name": "EditBroadcastMessageButtonMutation",
    "operationKind": "mutation",
    "text": "mutation EditBroadcastMessageButtonMutation(\n  $input: EditBroadcastMessage!\n) {\n  editBroadcastMessage(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3106b41cd3b42012134da2da00729428";

export default node;
