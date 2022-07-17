/**
 * @generated SignedSource<<7e6359ace9aa4c1af07470db683b72e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResetPasswordForm = {
  confirmNewPassword: string;
  newPassword: string;
  token: string;
};
export type PasswordResetFormMutation$variables = {
  input: ResetPasswordForm;
};
export type PasswordResetFormMutation$data = {
  readonly resetPassword: {
    readonly isError: boolean;
    readonly message: string;
  };
};
export type PasswordResetFormMutation = {
  response: PasswordResetFormMutation$data;
  variables: PasswordResetFormMutation$variables;
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
    "concreteType": "ResetPasswordMutationResponse",
    "kind": "LinkedField",
    "name": "resetPassword",
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
    "name": "PasswordResetFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PasswordResetFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9e3c62760b4e814a348fbcbbb8c74b06",
    "id": null,
    "metadata": {},
    "name": "PasswordResetFormMutation",
    "operationKind": "mutation",
    "text": "mutation PasswordResetFormMutation(\n  $input: ResetPasswordForm!\n) {\n  resetPassword(input: $input) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "3fec9a227a8c3816330a0aacc9871cca";

export default node;
