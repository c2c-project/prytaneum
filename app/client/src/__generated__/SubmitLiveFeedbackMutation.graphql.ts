/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateFeedback = {
    eventId: string;
    isReply?: boolean | null;
    message: string;
    refFeedbackId?: string | null;
};
export type SubmitLiveFeedbackMutationVariables = {
    input: CreateFeedback;
};
export type SubmitLiveFeedbackMutationResponse = {
    readonly createFeedback: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly createdAt: Date | null;
                readonly message: string;
                readonly createdBy: {
                    readonly id: string;
                    readonly firstName: string | null;
                    readonly lastName: string | null;
                } | null;
            };
        } | null;
    } | null;
};
export type SubmitLiveFeedbackMutation = {
    readonly response: SubmitLiveFeedbackMutationResponse;
    readonly variables: SubmitLiveFeedbackMutationVariables;
};



/*
mutation SubmitLiveFeedbackMutation(
  $input: CreateFeedback!
) {
  createFeedback(input: $input) {
    isError
    message
    body {
      cursor
      node {
        id
        createdAt
        message
        createdBy {
          id
          firstName
          lastName
        }
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "EventFeedbackMutationResponse",
    "kind": "LinkedField",
    "name": "createFeedback",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isError",
        "storageKey": null
      },
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "EventLiveFeedbackEdge",
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
            "concreteType": "EventLiveFeedback",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
                "storageKey": null
              },
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "createdBy",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SubmitLiveFeedbackMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmitLiveFeedbackMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "b1390731fc095265360c3aadf82c2aa5",
    "id": null,
    "metadata": {},
    "name": "SubmitLiveFeedbackMutation",
    "operationKind": "mutation",
    "text": "mutation SubmitLiveFeedbackMutation(\n  $input: CreateFeedback!\n) {\n  createFeedback(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        createdAt\n        message\n        createdBy {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f5314b45540745841310fd8a809d1b87';
export default node;
