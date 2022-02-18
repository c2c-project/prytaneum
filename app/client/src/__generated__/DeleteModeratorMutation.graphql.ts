/**
 * @generated SignedSource<<b7212194b553e8ccdcf7b38b80b4b99a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteModerator = {
  eventId: string;
  userId: string;
};
export type DeleteModeratorMutation$variables = {
  input: DeleteModerator;
  connections: ReadonlyArray<string>;
};
export type DeleteModeratorMutationVariables = DeleteModeratorMutation$variables;
export type DeleteModeratorMutation$data = {
  readonly deleteModerator: {
    readonly isError: boolean;
    readonly message: string;
    readonly body: {
      readonly id: string;
    } | null;
  };
};
export type DeleteModeratorMutationResponse = DeleteModeratorMutation$data;
export type DeleteModeratorMutation = {
  variables: DeleteModeratorMutationVariables;
  response: DeleteModeratorMutation$data;
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
  "kind": "ScalarField",
  "name": "id",
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
    "name": "DeleteModeratorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ModeratorMutationResponse",
        "kind": "LinkedField",
        "name": "deleteModerator",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v5/*: any*/)
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "DeleteModeratorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ModeratorMutationResponse",
        "kind": "LinkedField",
        "name": "deleteModerator",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  }
                ]
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
    "cacheID": "201d7e457995fd8cd7829c275c75af25",
    "id": null,
    "metadata": {},
    "name": "DeleteModeratorMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteModeratorMutation(\n  $input: DeleteModerator!\n) {\n  deleteModerator(input: $input) {\n    isError\n    message\n    body {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8b34dbebcf4e31ee9011e6eecf4a2e00";

export default node;
