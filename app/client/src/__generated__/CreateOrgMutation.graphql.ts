/**
 * @generated SignedSource<<971ecd1fd0eb727b6fe02a8b6c6836f1>>
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
  input: CreateOrganization;
};
export type CreateOrgMutationVariables = CreateOrgMutation$variables;
export type CreateOrgMutation$data = {
  readonly createOrganization: {
    readonly isError: boolean;
    readonly message: string;
    readonly body: {
      readonly id: string;
      readonly name: string;
      readonly createdAt: Date | null;
    } | null;
  };
};
export type CreateOrgMutationResponse = CreateOrgMutation$data;
export type CreateOrgMutation = {
  variables: CreateOrgMutationVariables;
  response: CreateOrgMutation$data;
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
    "concreteType": "OrganizationMutationResponse",
    "kind": "LinkedField",
    "name": "createOrganization",
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
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "body",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateOrgMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateOrgMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e293501afc4b02667c09f9d6f5227c46",
    "id": null,
    "metadata": {},
    "name": "CreateOrgMutation",
    "operationKind": "mutation",
    "text": "mutation CreateOrgMutation(\n  $input: CreateOrganization!\n) {\n  createOrganization(input: $input) {\n    isError\n    message\n    body {\n      id\n      name\n      createdAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "88409ef053597e667288c5b8720d31d9";

export default node;
