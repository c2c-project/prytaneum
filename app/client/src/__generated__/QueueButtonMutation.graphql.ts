/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AddQuestionToQueue = {
    questionId: string;
    eventId: string;
};
export type QueueButtonMutationVariables = {
    input: AddQuestionToQueue;
};
export type QueueButtonMutationResponse = {
    readonly addQuestionToQueue: {
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
  $input: AddQuestionToQueue!
) {
  addQuestionToQueue(input: $input) {
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
    "name": "addQuestionToQueue",
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
    "cacheID": "c90fcdcd9cb60a6922a40ae70956e7f8",
    "id": null,
    "metadata": {},
    "name": "QueueButtonMutation",
    "operationKind": "mutation",
    "text": "mutation QueueButtonMutation(\n  $input: AddQuestionToQueue!\n) {\n  addQuestionToQueue(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        position\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '30912632b7b00d3443b815cff9dd78ea';
export default node;
