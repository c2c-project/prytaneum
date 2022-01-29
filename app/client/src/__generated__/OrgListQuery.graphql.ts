/**
 * @generated SignedSource<<9b853ee745eee4df4220980ffb410147>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type OrgListQuery$variables = {};
export type OrgListQueryVariables = OrgListQuery$variables;
export type OrgListQuery$data = {
  readonly myOrgs: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly createdAt: Date | null;
  }> | null;
};
export type OrgListQueryResponse = OrgListQuery$data;
export type OrgListQuery = {
  variables: OrgListQueryVariables;
  response: OrgListQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Organization",
    "kind": "LinkedField",
    "name": "myOrgs",
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
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
    "name": "OrgListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OrgListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ac86bc73d1ced611bdd89c663b1b8335",
    "id": null,
    "metadata": {},
    "name": "OrgListQuery",
    "operationKind": "query",
    "text": "query OrgListQuery {\n  myOrgs {\n    id\n    name\n    createdAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "4c1ff725496c6c16d0ddba1d45ba77b6";

export default node;
