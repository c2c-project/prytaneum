/**
 * @generated SignedSource<<9bb0c1f48036aa620c9f9d3d0030fc8e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ValidateInviteQuery$variables = {
  eventId: string;
  token: string;
};
export type ValidateInviteQuery$data = {
  readonly validateInvite: {
    readonly user: {
      readonly avatar: string | null;
      readonly email: string | null;
      readonly firstName: string | null;
      readonly id: string;
      readonly isAdmin: boolean | null;
      readonly lastName: string | null;
    } | null;
    readonly valid: boolean;
  };
};
export type ValidateInviteQuery = {
  response: ValidateInviteQuery$data;
  variables: ValidateInviteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "token"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "eventId",
            "variableName": "eventId"
          },
          {
            "kind": "Variable",
            "name": "token",
            "variableName": "token"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "ValidateInviteQueryResponse",
    "kind": "LinkedField",
    "name": "validateInvite",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "valid",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
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
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatar",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isAdmin",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ValidateInviteQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ValidateInviteQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "3dd2c3c4d1e09b57841afdbb8d19c1b6",
    "id": null,
    "metadata": {},
    "name": "ValidateInviteQuery",
    "operationKind": "query",
    "text": "query ValidateInviteQuery(\n  $token: String!\n  $eventId: ID!\n) {\n  validateInvite(input: {token: $token, eventId: $eventId}) {\n    valid\n    user {\n      id\n      firstName\n      lastName\n      email\n      avatar\n      isAdmin\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f88ecc14ac9c525ae385ada4bafb4543";

export default node;
