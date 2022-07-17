/**
 * @generated SignedSource<<4ae986a4b59e806b5161d25b27a11c6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateVideo = {
  eventId: string;
  lang: string;
  url: string;
};
export type CreateVideoMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateVideo;
};
export type CreateVideoMutation$data = {
  readonly createVideo: {
    readonly body: {
      readonly id: string;
      readonly lang: string;
      readonly url: string;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type CreateVideoMutation = {
  response: CreateVideoMutation$data;
  variables: CreateVideoMutation$variables;
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
  "concreteType": "EventVideo",
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
      "name": "url",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lang",
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
    "name": "CreateVideoMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventVideoMutationResponse",
        "kind": "LinkedField",
        "name": "createVideo",
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
    "name": "CreateVideoMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventVideoMutationResponse",
        "kind": "LinkedField",
        "name": "createVideo",
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
                "value": "VideoEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fb3c11b3a9cdee43adcf97f3438738ba",
    "id": null,
    "metadata": {},
    "name": "CreateVideoMutation",
    "operationKind": "mutation",
    "text": "mutation CreateVideoMutation(\n  $input: CreateVideo!\n) {\n  createVideo(input: $input) {\n    isError\n    message\n    body {\n      id\n      url\n      lang\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "35fd696317ec764920f6f83c4fa8c0a7";

export default node;
