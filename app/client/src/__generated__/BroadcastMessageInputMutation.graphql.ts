/**
 * @generated SignedSource<<478815fae46ce2160f151bf15d624230>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateBroadcastMessage = {
  broadcastMessage: string;
  eventId: string;
};
export type BroadcastMessageInputMutation$variables = {
  input: CreateBroadcastMessage;
};
export type BroadcastMessageInputMutationVariables = BroadcastMessageInputMutation$variables;
export type BroadcastMessageInputMutation$data = {
  readonly createBroadcastMessage: {
    readonly isError: boolean;
    readonly message: string;
  };
};
export type BroadcastMessageInputMutationResponse = BroadcastMessageInputMutation$data;
export type BroadcastMessageInputMutation = {
  variables: BroadcastMessageInputMutationVariables;
  response: BroadcastMessageInputMutation$data;
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
    "name": "createBroadcastMessage",
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
    "name": "BroadcastMessageInputMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BroadcastMessageInputMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "00da74e10c7a95e2e8e9dd36dbeeac94",
    "id": null,
    "metadata": {},
    "name": "BroadcastMessageInputMutation",
    "operationKind": "mutation",
    "text": "mutation BroadcastMessageInputMutation(\n  $input: CreateBroadcastMessage!\n) {\n  createBroadcastMessage(input: $input) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "96581741703032518e3bb19f8671b924";

export default node;
