/**
 * @generated SignedSource<<fb3157e8b895642133e3aaea52615f50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateOrganizerForm = {
  canMakeOrgs: boolean;
  id: string;
};
export type UpdateOrganizerMutation$variables = {
  input: UpdateOrganizerForm;
};
export type UpdateOrganizerMutationVariables = UpdateOrganizerMutation$variables;
export type UpdateOrganizerMutation$data = {
  readonly updateOrganizer: {
    readonly isError: boolean;
    readonly message: string;
    readonly body: {
      readonly id: string;
      readonly email: string | null;
    } | null;
  };
};
export type UpdateOrganizerMutationResponse = UpdateOrganizerMutation$data;
export type UpdateOrganizerMutation = {
  variables: UpdateOrganizerMutationVariables;
  response: UpdateOrganizerMutation$data;
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
    "concreteType": "UserMutationResponse",
    "kind": "LinkedField",
    "name": "updateOrganizer",
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
        "concreteType": "User",
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
            "name": "email",
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
    "name": "UpdateOrganizerMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateOrganizerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f9cb04c062a3665e0bab56abecd6dcac",
    "id": null,
    "metadata": {},
    "name": "UpdateOrganizerMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateOrganizerMutation(\n  $input: UpdateOrganizerForm!\n) {\n  updateOrganizer(input: $input) {\n    isError\n    message\n    body {\n      id\n      email\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4282ac7a706aadd0d0c1b5be871086e1";

export default node;
