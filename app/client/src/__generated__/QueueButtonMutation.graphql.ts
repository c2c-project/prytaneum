/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateQuestionQueue = {
    adding: boolean;
    eventId: string;
    questionId: string;
};
export type QueueButtonMutationVariables = {
    input: UpdateQuestionQueue;
};
export type QueueButtonMutationResponse = {
    readonly updateQuestionQueue: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly position: number | null;
            };
        } | null;
    };
};
export type QueueButtonMutation = {
    readonly response: QueueButtonMutationResponse;
    readonly variables: QueueButtonMutationVariables;
};



/*
mutation QueueButtonMutation(
  $input: UpdateQuestionQueue!
) {
  updateQuestionQueue(input: $input) {
    isError
    message
    body {
      cursor
      node {
        id
        position
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
    "name": "updateQuestionQueue",
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
                "name": "position",
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
    "name": "QueueButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QueueButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d51abd2e7798ca5a080972f29a933fb4",
    "id": null,
    "metadata": {},
    "name": "QueueButtonMutation",
    "operationKind": "mutation",
    "text": "mutation QueueButtonMutation(\n  $input: UpdateQuestionQueue!\n) {\n  updateQuestionQueue(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        position\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1adf653c2e16503d73593819b657ff52';
export default node;
