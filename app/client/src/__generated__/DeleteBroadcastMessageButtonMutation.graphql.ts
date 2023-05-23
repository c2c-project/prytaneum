/**
 * @generated SignedSource<<6e9a2356592880eae222730c37b25530>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteBroadcastMessage = {
  broadcastMessageId: string;
  toggleBroadcastMessageVisibility: boolean;
};
export type DeleteBroadcastMessageButtonMutation$variables = {
  input: DeleteBroadcastMessage;
};
export type DeleteBroadcastMessageButtonMutationVariables = DeleteBroadcastMessageButtonMutation$variables;
export type DeleteBroadcastMessageButtonMutation$data = {
  readonly deleteBroadcastMessage: {
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
export type DeleteBroadcastMessageButtonMutationResponse = DeleteBroadcastMessageButtonMutation$data;
export type DeleteBroadcastMessageButtonMutation = {
  variables: DeleteBroadcastMessageButtonMutationVariables;
  response: DeleteBroadcastMessageButtonMutation$data;
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
    "name": "deleteBroadcastMessage",
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
    "name": "DeleteBroadcastMessageButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteBroadcastMessageButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "eb61cce7e1a70c7287ac983ac1de0a1f",
    "id": null,
    "metadata": {},
    "name": "DeleteBroadcastMessageButtonMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteBroadcastMessageButtonMutation(\n  $input: DeleteBroadcastMessage!\n) {\n  deleteBroadcastMessage(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8c358b1f8e37f10b261cfbd3713c631d";

export default node;
