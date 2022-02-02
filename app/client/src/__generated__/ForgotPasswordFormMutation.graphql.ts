/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ForgotPassRequestForm = {
    email: string;
};
export type ForgotPasswordFormMutationVariables = {
    input: ForgotPassRequestForm;
};
export type ForgotPasswordFormMutationResponse = {
    readonly requestResetPassword: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: string | null;
    };
};
export type ForgotPasswordFormMutation = {
    readonly response: ForgotPasswordFormMutationResponse;
    readonly variables: ForgotPasswordFormMutationVariables;
};



/*
mutation ForgotPasswordFormMutation(
  $input: ForgotPassRequestForm!
) {
  requestResetPassword(input: $input) {
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
    "concreteType": "ForgotPassRequestResponse",
    "kind": "LinkedField",
    "name": "requestResetPassword",
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
    "name": "ForgotPasswordFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ForgotPasswordFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5d82653cfab4cb7382287dbe6fc6cf1b",
    "id": null,
    "metadata": {},
    "name": "ForgotPasswordFormMutation",
    "operationKind": "mutation",
    "text": "mutation ForgotPasswordFormMutation(\n  $input: ForgotPassRequestForm!\n) {\n  requestResetPassword(input: $input) {\n    isError\n    message\n    body\n  }\n}\n"
  }
};
})();
(node as any).hash = '7d32b2d6cd76a24eafc5594f807fd540';
export default node;
