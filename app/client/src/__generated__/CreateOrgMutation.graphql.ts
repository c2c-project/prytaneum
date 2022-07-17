/**
 * @generated SignedSource<<daeb1461b1f6a4614c279750f62addaf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateOrganization = {
  name: string;
};
export type CreateOrgMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateOrganization;
};
export type CreateOrgMutation$data = {
  readonly createOrganization: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly createdAt: Date | null;
        readonly id: string;
        readonly name: string;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type CreateOrgMutation = {
  response: CreateOrgMutation$data;
  variables: CreateOrgMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isError",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "OrganizationEdge",
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
      "concreteType": "Organization",
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
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateOrgMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "OrganizationMutationResponse",
        "kind": "LinkedField",
        "name": "createOrganization",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateOrgMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "OrganizationMutationResponse",
        "kind": "LinkedField",
        "name": "createOrganization",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "body",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8823beb68ccf936bf9ae8626e3f772c1",
    "id": null,
    "metadata": {},
    "name": "CreateOrgMutation",
    "operationKind": "mutation",
    "text": "mutation CreateOrgMutation(\n  $input: CreateOrganization!\n) {\n  createOrganization(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        name\n        createdAt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0f761fe0455741f0f5972d0bcd716c08";

export default node;
