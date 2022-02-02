/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ResetPasswordForm = {
    confirmNewPassword: string;
    newPassword: string;
    token: string;
};
export type ResetPasswordRequestMutationVariables = {
    input: ResetPasswordForm;
};
export type ResetPasswordRequestMutationResponse = {
    readonly resetPassword: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: Date | null;
    };
};
export type ResetPasswordRequestMutation = {
    readonly response: ResetPasswordRequestMutationResponse;
    readonly variables: ResetPasswordRequestMutationVariables;
};



/*
mutation ResetPasswordRequestMutation(
  $input: ResetPasswordForm!
) {
  resetPassword(input: $input) {
    isError
    message
    body
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ResetPasswordResponse",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "body",
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
    "name": "ResetPasswordRequestMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResetPasswordRequestMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "94c1598be8d5f1bff79dcdcae31c1c6d",
    "id": null,
    "metadata": {},
    "name": "ResetPasswordRequestMutation",
    "operationKind": "mutation",
    "text": "mutation ResetPasswordRequestMutation(\n  $input: ResetPasswordForm!\n) {\n  resetPassword(input: $input) {\n    isError\n    message\n    body\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd60dc2ed3298bf746e615fa03125e590';
export default node;
