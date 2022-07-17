/**
 * @generated SignedSource<<0aa0156b678c8da779ecec690e2e0429>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateFeedback = {
  eventId: string;
  isReply?: boolean | null;
  message: string;
  refFeedbackId?: string | null;
};
export type SubmitLiveFeedbackMutation$variables = {
  input: CreateFeedback;
};
export type SubmitLiveFeedbackMutation$data = {
  readonly createFeedback: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly createdAt: Date | null;
        readonly createdBy: {
          readonly firstName: string | null;
          readonly id: string;
          readonly lastName: string | null;
        } | null;
        readonly id: string;
        readonly message: string;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type SubmitLiveFeedbackMutation = {
  response: SubmitLiveFeedbackMutation$data;
  variables: SubmitLiveFeedbackMutation$variables;
};

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

(node as any).hash = "f5314b45540745841310fd8a809d1b87";

export default node;
