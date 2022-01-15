/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ResetPasswordForm = {
    confirmNewPassword: string;
    newPassword: string;
    token: string;
};
export type PasswordResetFormMutationVariables = {
    input: ResetPasswordForm;
};
export type PasswordResetFormMutationResponse = {
    readonly resetPassword: {
        readonly isError: boolean;
        readonly message: string;
    };
};
export type PasswordResetFormMutation = {
    readonly response: PasswordResetFormMutationResponse;
    readonly variables: PasswordResetFormMutationVariables;
};



/*
mutation PasswordResetFormMutation(
  $input: ResetPasswordForm!
) {
  resetPassword(input: $input) {
    __typename
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
    "name": "PasswordResetFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "resetPassword",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
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
    "name": "PasswordResetFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "resetPassword",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4e74390fec7ddcd687563965ab736dbe",
    "id": null,
    "metadata": {},
    "name": "PasswordResetFormMutation",
    "operationKind": "mutation",
    "text": "mutation PasswordResetFormMutation(\n  $input: ResetPasswordForm!\n) {\n  resetPassword(input: $input) {\n    __typename\n    isError\n    message\n  }\n}\n"
  }
};
})();
(node as any).hash = '3fec9a227a8c3816330a0aacc9871cca';
export default node;
