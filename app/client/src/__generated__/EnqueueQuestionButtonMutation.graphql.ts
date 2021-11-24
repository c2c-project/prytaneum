/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
<<<<<<< HEAD:app/client/src/__generated__/EnqueueQuestionButtonMutation.graphql.ts

export type AddQuestionToQueue = {
=======
export type UpdateQuestionQueue = {
    adding: boolean;
>>>>>>> chore(project): updated generation:app/client/src/__generated__/QueueButtonMutation.graphql.ts
    eventId: string;
    questionId: string;
};
export type EnqueueQuestionButtonMutationVariables = {
    input: AddQuestionToQueue;
};
export type EnqueueQuestionButtonMutationResponse = {
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
export type EnqueueQuestionButtonMutation = {
    readonly response: EnqueueQuestionButtonMutationResponse;
    readonly variables: EnqueueQuestionButtonMutationVariables;
};



/*
mutation EnqueueQuestionButtonMutation(
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
    "name": "EnqueueQuestionButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EnqueueQuestionButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2ee72ea7f24025d17ead982a6985c51c",
    "id": null,
    "metadata": {},
    "name": "EnqueueQuestionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation EnqueueQuestionButtonMutation(\n  $input: AddQuestionToQueue!\n) {\n  addQuestionToQueue(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        position\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '442b6fd88947fc2bcf3172aec73d9a08';
export default node;
