/**
 * @generated SignedSource<<c97f7cb04e727da1e12f35ba12a29d94>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateModerator = {
  email: string;
  eventId: string;
};
export type CreateModeratorMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateModerator;
};
export type CreateModeratorMutation$data = {
  readonly createModerator: {
    readonly body: {
      readonly avatar: string | null;
      readonly firstName: string | null;
      readonly id: string;
      readonly lastName: string | null;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type CreateModeratorMutation = {
  response: CreateModeratorMutation$data;
  variables: CreateModeratorMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isError",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateModeratorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ModeratorMutationResponse",
        "kind": "LinkedField",
        "name": "createModerator",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateModeratorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ModeratorMutationResponse",
        "kind": "LinkedField",
        "name": "createModerator",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "body",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "UserEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6163bbbfc157ddbce61963e1c490e6e7",
    "id": null,
    "metadata": {},
    "name": "CreateModeratorMutation",
    "operationKind": "mutation",
    "text": "mutation CreateModeratorMutation(\n  $input: CreateModerator!\n) {\n  createModerator(input: $input) {\n    isError\n    message\n    body {\n      id\n      firstName\n      lastName\n      avatar\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "874bb64474bf711f22a3d4e5be0427f1";

export default node;
