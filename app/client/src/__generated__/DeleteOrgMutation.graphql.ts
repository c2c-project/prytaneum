/**
 * @generated SignedSource<<e50bfbeab0c8ea8febeaed49dc229c54>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteOrganization = {
  orgId: string;
};
export type DeleteOrgMutation$variables = {
  input: DeleteOrganization;
  connections: ReadonlyArray<string>;
};
export type DeleteOrgMutationVariables = DeleteOrgMutation$variables;
export type DeleteOrgMutation$data = {
  readonly deleteOrganization: {
    readonly isError: boolean;
    readonly message: string;
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly createdAt: Date | null;
      };
    } | null;
  };
};
export type DeleteOrgMutationResponse = DeleteOrgMutation$data;
export type DeleteOrgMutation = {
  variables: DeleteOrgMutationVariables;
  response: DeleteOrgMutation$data;
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
    "name": "DeleteOrgMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "OrganizationMutationResponse",
        "kind": "LinkedField",
        "name": "deleteOrganization",
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
    "name": "DeleteOrgMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "OrganizationMutationResponse",
        "kind": "LinkedField",
        "name": "deleteOrganization",
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
    "cacheID": "6dc67658dd17af7454acf00e3c218c0f",
    "id": null,
    "metadata": {},
    "name": "DeleteOrgMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteOrgMutation(\n  $input: DeleteOrganization!\n) {\n  deleteOrganization(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        name\n        createdAt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d0d880b32c315ba9d10579e15cf2f429";

export default node;
