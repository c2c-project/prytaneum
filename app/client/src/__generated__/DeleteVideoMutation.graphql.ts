/**
 * @generated SignedSource<<330b47716a1759011140d3881e92e584>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteVideo = {
  eventId: string;
  id: string;
};
export type DeleteVideoMutation$variables = {
  connections: ReadonlyArray<string>;
  input: DeleteVideo;
};
export type DeleteVideoMutation$data = {
  readonly deleteVideo: {
    readonly body: {
      readonly id: string;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type DeleteVideoMutation = {
  response: DeleteVideoMutation$data;
  variables: DeleteVideoMutation$variables;
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
    "name": "DeleteVideoMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventVideoMutationResponse",
        "kind": "LinkedField",
        "name": "deleteVideo",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventVideo",
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
    "name": "DeleteVideoMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventVideoMutationResponse",
        "kind": "LinkedField",
        "name": "deleteVideo",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventVideo",
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
    "cacheID": "d4daafa00a44312c1d4f55e2027acb76",
    "id": null,
    "metadata": {},
    "name": "DeleteVideoMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteVideoMutation(\n  $input: DeleteVideo!\n) {\n  deleteVideo(input: $input) {\n    isError\n    message\n    body {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "62024c492aea73a2af93a9ef3a6f33a4";

export default node;
