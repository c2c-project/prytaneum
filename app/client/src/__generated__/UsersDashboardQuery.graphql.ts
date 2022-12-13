/**
 * @generated SignedSource<<049d063b4d8e71bbf3fe863cde2b32e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UsersDashboardQuery$variables = {};
export type UsersDashboardQueryVariables = UsersDashboardQuery$variables;
export type UsersDashboardQuery$data = {
  readonly users: ReadonlyArray<{
    readonly id: string;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly email: string | null;
    readonly avatar: string | null;
    readonly isAdmin: boolean | null;
    readonly canMakeOrgs: boolean | null;
  }>;
};
export type UsersDashboardQueryResponse = UsersDashboardQuery$data;
export type UsersDashboardQuery = {
  variables: UsersDashboardQueryVariables;
  response: UsersDashboardQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "users",
    "plural": true,
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "canMakeOrgs",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersDashboardQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UsersDashboardQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "f3b30c17c74a54669b5e48f5773cd618",
    "id": null,
    "metadata": {},
    "name": "UsersDashboardQuery",
    "operationKind": "query",
    "text": "query UsersDashboardQuery {\n  users {\n    id\n    firstName\n    lastName\n    email\n    avatar\n    isAdmin\n    canMakeOrgs\n  }\n}\n"
  }
};
})();

(node as any).hash = "4ba6162138adf61bea8e91e376a28287";

export default node;
