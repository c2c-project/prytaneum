/**
 * @generated SignedSource<<22a53736e7f027464412e270628bb8a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateFeedbackPrompt = {
  eventId: string;
  feedbackType: string;
  prompt: string;
};
export type SubmitLiveFeedbackPromptMutation$variables = {
  input: CreateFeedbackPrompt;
};
export type SubmitLiveFeedbackPromptMutation$data = {
  readonly createFeedbackPrompt: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly createdAt: Date | null;
        readonly id: string;
        readonly prompt: string;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type SubmitLiveFeedbackPromptMutation = {
  response: SubmitLiveFeedbackPromptMutation$data;
  variables: SubmitLiveFeedbackPromptMutation$variables;
};

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
    "concreteType": "EventFeedbackPromptMutationResponse",
    "kind": "LinkedField",
    "name": "createFeedbackPrompt",
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
        "concreteType": "EventLiveFeedbackPromptEdge",
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
            "concreteType": "EventLiveFeedbackPrompt",
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
                "name": "createdAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "prompt",
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
    "name": "SubmitLiveFeedbackPromptMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmitLiveFeedbackPromptMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a078d8b00b1ca67c2f3a2be949836e8a",
    "id": null,
    "metadata": {},
    "name": "SubmitLiveFeedbackPromptMutation",
    "operationKind": "mutation",
    "text": "mutation SubmitLiveFeedbackPromptMutation(\n  $input: CreateFeedbackPrompt!\n) {\n  createFeedbackPrompt(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        createdAt\n        prompt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1526af588ad93ae620168862b0f64a3f";

export default node;
