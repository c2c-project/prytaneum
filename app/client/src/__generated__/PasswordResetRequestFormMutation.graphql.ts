/**
 * @generated SignedSource<<0588dbe1aa3f9cc2742bd19950db1364>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResetPasswordRequestForm = {
  email: string;
};
export type PasswordResetRequestFormMutation$variables = {
  input: ResetPasswordRequestForm;
};
export type PasswordResetRequestFormMutationVariables = PasswordResetRequestFormMutation$variables;
export type PasswordResetRequestFormMutation$data = {
  readonly resetPasswordRequest: {
    readonly isError: boolean;
    readonly message: string;
    readonly body: boolean | null;
  };
};
export type PasswordResetRequestFormMutationResponse = PasswordResetRequestFormMutation$data;
export type PasswordResetRequestFormMutation = {
  variables: PasswordResetRequestFormMutationVariables;
  response: PasswordResetRequestFormMutation$data;
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
    "concreteType": "ResetPasswordRequestMutationResponse",
    "kind": "LinkedField",
    "name": "resetPasswordRequest",
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
    "name": "PasswordResetRequestFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PasswordResetRequestFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ead96568648f0213eaf8cf14bae26f09",
    "id": null,
    "metadata": {},
    "name": "PasswordResetRequestFormMutation",
    "operationKind": "mutation",
    "text": "mutation PasswordResetRequestFormMutation(\n  $input: ResetPasswordRequestForm!\n) {\n  resetPasswordRequest(input: $input) {\n    isError\n    message\n    body\n  }\n}\n"
  }
};
})();

(node as any).hash = "231c73825be949869a7c631605a54a10";

export default node;
