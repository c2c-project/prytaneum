/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type LoginForm = {
    email: string;
    password: string;
};
export type LoginFormMutationVariables = {
    input: LoginForm;
};
export type LoginFormMutationResponse = {
    readonly login: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly id: string;
            readonly firstName: string | null;
            readonly lastName: string | null;
            readonly email: string | null;
            readonly avatar: string | null;
        } | null;
    };
};
export type LoginFormMutation = {
    readonly response: LoginFormMutationResponse;
    readonly variables: LoginFormMutationVariables;
};



/*
mutation LoginFormMutation(
  $input: LoginForm!
) {
  login(input: $input) {
    isError
    message
    body {
      id
      firstName
      lastName
      email
      avatar
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
    "name": "login",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatar",
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
    "name": "LoginFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5a011536a12152527569d37caa87e6e0",
    "id": null,
    "metadata": {},
    "name": "LoginFormMutation",
    "operationKind": "mutation",
    "text": "mutation LoginFormMutation(\n  $input: LoginForm!\n) {\n  login(input: $input) {\n    isError\n    message\n    body {\n      id\n      firstName\n      lastName\n      email\n      avatar\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '76be9b14b2649968644551c7b40b15fc';
export default node;
