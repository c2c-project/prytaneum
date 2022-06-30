/**
 * @generated SignedSource<<9e052a4ac560b553475f888db93fd8e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateEmailForm = {
  currentEmail: string;
  newEmail: string;
};
export type UpdateEmailFormMutation$variables = {
  input: UpdateEmailForm;
};
export type UpdateEmailFormMutationVariables = UpdateEmailFormMutation$variables;
export type UpdateEmailFormMutation$data = {
  readonly updateEmail: {
    readonly isError: boolean;
    readonly message: string;
    readonly body: {
      readonly " $fragmentSpreads": FragmentRefs<"useUserFragment">;
    } | null;
  };
};
export type UpdateEmailFormMutationResponse = UpdateEmailFormMutation$data;
export type UpdateEmailFormMutation = {
  variables: UpdateEmailFormMutationVariables;
  response: UpdateEmailFormMutation$data;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isError",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateEmailFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserMutationResponse",
        "kind": "LinkedField",
        "name": "updateEmail",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useUserFragment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateEmailFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserMutationResponse",
        "kind": "LinkedField",
        "name": "updateEmail",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
                "name": "isOrganizer",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "36199969d06c432f252d3da10bdf2cac",
    "id": null,
    "metadata": {},
    "name": "UpdateEmailFormMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateEmailFormMutation(\n  $input: UpdateEmailForm!\n) {\n  updateEmail(input: $input) {\n    isError\n    message\n    body {\n      ...useUserFragment\n      id\n    }\n  }\n}\n\nfragment useUserFragment on User {\n  id\n  firstName\n  lastName\n  email\n  avatar\n  isOrganizer\n}\n"
  }
};
})();

(node as any).hash = "6ac72dd60d5a3e1a85087b7701b1753a";

export default node;
