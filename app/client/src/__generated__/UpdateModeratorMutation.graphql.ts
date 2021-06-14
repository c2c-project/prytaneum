/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateModerator = {
    userId: string;
    eventId: string;
};
export type UpdateModeratorMutationVariables = {
    input: UpdateModerator;
};
export type UpdateModeratorMutationResponse = {
    readonly updateModerator: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly id: string;
            readonly firstName: string | null;
            readonly lastName: string | null;
            readonly avatar: string | null;
        } | null;
    };
};
export type UpdateModeratorMutation = {
    readonly response: UpdateModeratorMutationResponse;
    readonly variables: UpdateModeratorMutationVariables;
};



/*
mutation UpdateModeratorMutation(
  $input: UpdateModerator!
) {
  updateModerator(input: $input) {
    isError
    message
    body {
      id
      firstName
      lastName
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
    "concreteType": "ModeratorMutationResponse",
    "kind": "LinkedField",
    "name": "updateModerator",
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
    "name": "UpdateModeratorMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateModeratorMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d33402669f757a1a6a1f6329c0ae9007",
    "id": null,
    "metadata": {},
    "name": "UpdateModeratorMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateModeratorMutation(\n  $input: UpdateModerator!\n) {\n  updateModerator(input: $input) {\n    isError\n    message\n    body {\n      id\n      firstName\n      lastName\n      avatar\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4e5b46bee8639fa543b93f4422885bfa';
export default node;
