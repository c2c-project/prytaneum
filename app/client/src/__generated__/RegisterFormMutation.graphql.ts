/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RegistrationForm = {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
};
export type RegisterFormMutationVariables = {
    input: RegistrationForm;
};
export type RegisterFormMutationResponse = {
    readonly register: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly id: string;
            readonly firstName: string | null;
            readonly lastName: string | null;
            readonly email: string | null;
        } | null;
    };
};
export type RegisterFormMutation = {
    readonly response: RegisterFormMutationResponse;
    readonly variables: RegisterFormMutationVariables;
};



/*
mutation RegisterFormMutation(
  $input: RegistrationForm!
) {
  register(input: $input) {
    isError
    message
    body {
      id
      firstName
      lastName
      email
    }
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
    "concreteType": "UserMutationResponse",
    "kind": "LinkedField",
    "name": "register",
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
    "name": "RegisterFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RegisterFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "eb41bdf47e706bdab89822bac34dd383",
    "id": null,
    "metadata": {},
    "name": "RegisterFormMutation",
    "operationKind": "mutation",
    "text": "mutation RegisterFormMutation(\n  $input: RegistrationForm!\n) {\n  register(input: $input) {\n    isError\n    message\n    body {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0f181a77996af87af40f3f860c72917b';
export default node;
