/**
 * @generated SignedSource<<358dd7e396cfb00672d2ed6553389dcc>>
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
export type EventLiveMutation$variables = {
  input: CreateBroadcastMessage;
};
export type EventLiveMutationVariables = EventLiveMutation$variables;
export type EventLiveMutation$data = {
  readonly createBroadcastMessage: {
    readonly isError: boolean;
    readonly message: string;
  };
};
export type EventLiveMutationResponse = EventLiveMutation$data;
export type EventLiveMutation = {
  variables: EventLiveMutationVariables;
  response: EventLiveMutation$data;
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
    "name": "EventLiveMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EventLiveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e0a3068f6486c22c4ca94e3068e7dd7b",
    "id": null,
    "metadata": {},
    "name": "EventLiveMutation",
    "operationKind": "mutation",
    "text": "mutation EventLiveMutation(\n  $input: CreateBroadcastMessage!\n) {\n  createBroadcastMessage(input: $input) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "acd31aa8f8896f430ef857809b713424";

export default node;
