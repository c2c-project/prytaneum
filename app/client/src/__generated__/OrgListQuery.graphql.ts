/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type OrgListQueryVariables = {};
export type OrgListQueryResponse = {
    readonly myOrgs: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly createdAt: Date | null;
    }> | null;
};
export type OrgListQuery = {
    readonly response: OrgListQueryResponse;
    readonly variables: OrgListQueryVariables;
};



/*
query OrgListQuery {
  myOrgs {
    id
    name
    createdAt
  }
}
*/

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
(node as any).hash = '4c1ff725496c6c16d0ddba1d45ba77b6';
export default node;
