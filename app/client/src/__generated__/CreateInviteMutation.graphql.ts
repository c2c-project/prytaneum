/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CreateInvite = {
    email: string;
    eventId: string;
};
export type CreateInviteMutationVariables = {
    input: CreateInvite;
};
export type CreateInviteMutationResponse = {
    readonly createInvite: {
        readonly isError: boolean;
        readonly message: string;
    };
};
export type CreateInviteMutation = {
    readonly response: CreateInviteMutationResponse;
    readonly variables: CreateInviteMutationVariables;
};



/*
mutation CreateInviteMutation(
  $input: CreateInvite!
) {
  createInvite(input: $input) {
    isError
    message
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
    "concreteType": "InviteMutationResponse",
    "kind": "LinkedField",
    "name": "createInvite",
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
    "name": "CreateInviteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateInviteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9a1cb027be23c9ee155a628002b6efe1",
    "id": null,
    "metadata": {},
    "name": "CreateInviteMutation",
    "operationKind": "mutation",
    "text": "mutation CreateInviteMutation(\n  $input: CreateInvite!\n) {\n  createInvite(input: $input) {\n    isError\n    message\n  }\n}\n"
  }
};
})();
(node as any).hash = '858a870da81b55350eaf926fe62ff37c';
export default node;
