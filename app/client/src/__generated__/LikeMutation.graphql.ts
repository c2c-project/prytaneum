/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AlterLike = {
    questionId: string;
    to: boolean;
};
export type LikeMutationVariables = {
    input: AlterLike;
};
export type LikeMutationResponse = {
    readonly alterLike: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly isLikedByViewer: boolean | null;
            };
        } | null;
    };
};
export type LikeMutation = {
    readonly response: LikeMutationResponse;
    readonly variables: LikeMutationVariables;
};



/*
mutation LikeMutation(
  $input: AlterLike!
) {
  alterLike(input: $input) {
    isError
    message
    body {
      cursor
      node {
        id
        isLikedByViewer
      }
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
    "concreteType": "EventQuestionMutationResponse",
    "kind": "LinkedField",
    "name": "alterLike",
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
        "concreteType": "EventQuestionEdge",
        "kind": "LinkedField",
        "name": "body",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestion",
            "kind": "LinkedField",
            "name": "node",
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
                "name": "isLikedByViewer",
                "storageKey": null
              }
            ],
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
    "name": "LikeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LikeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8dfedccd4ab3b8a2c51f34aafcf9c3be",
    "id": null,
    "metadata": {},
    "name": "LikeMutation",
    "operationKind": "mutation",
    "text": "mutation LikeMutation(\n  $input: AlterLike!\n) {\n  alterLike(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        isLikedByViewer\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '554bc19afbc9e9df04cd60d28097e10e';
export default node;
