/**
 * @generated SignedSource<<97b75d125d47d0c29a8e9891b0527079>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateFeedbackFlowInput = {
  eventId: string;
  flowDescription?: string | null;
  flowName: string;
  isDraft: boolean;
  prompts: ReadonlyArray<CreateFeedbackPrompt>;
};
export type CreateFeedbackPrompt = {
  choices: ReadonlyArray<string>;
  eventId: string;
  feedbackType: string;
  isDraft?: boolean | null;
  prompt: string;
  reasoningType: string;
};
export type SubmitLiveFeedbackFlowMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateFeedbackFlowInput;
};
export type SubmitLiveFeedbackFlowMutation$data = {
  readonly createFeedbackFlow: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly flowDescription: string | null;
        readonly flowName: string;
        readonly id: string;
        readonly prompts: ReadonlyArray<{
          readonly id: string;
          readonly order: number;
          readonly prompt: {
            readonly id: string;
            readonly isDraft: boolean | null;
            readonly isMultipleChoice: boolean | null;
            readonly isOpenEnded: boolean | null;
            readonly isVote: boolean | null;
            readonly multipleChoiceOptions: ReadonlyArray<string> | null;
            readonly prompt: string;
            readonly reasoningType: string | null;
          };
        }>;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type SubmitLiveFeedbackFlowMutation = {
  response: SubmitLiveFeedbackFlowMutation$data;
  variables: SubmitLiveFeedbackFlowMutation$variables;
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
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "FeedbackFlowEdge",
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
      "concreteType": "FeedbackFlow",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        (v5/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "flowName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "flowDescription",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "FeedbackFlowPrompt",
          "kind": "LinkedField",
          "name": "prompts",
          "plural": true,
          "selections": [
            (v5/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "order",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "EventLiveFeedbackPrompt",
              "kind": "LinkedField",
              "name": "prompt",
              "plural": false,
              "selections": [
                (v5/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "prompt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isVote",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isOpenEnded",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isMultipleChoice",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "multipleChoiceOptions",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isDraft",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "reasoningType",
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SubmitLiveFeedbackFlowMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "FeedbackFlowMutationResponse",
        "kind": "LinkedField",
        "name": "createFeedbackFlow",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/)
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
    "name": "SubmitLiveFeedbackFlowMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "FeedbackFlowMutationResponse",
        "kind": "LinkedField",
        "name": "createFeedbackFlow",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "body",
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
    ]
  },
  "params": {
    "cacheID": "110e4fe0b2cdb97125449c84bdf06e1f",
    "id": null,
    "metadata": {},
    "name": "SubmitLiveFeedbackFlowMutation",
    "operationKind": "mutation",
    "text": "mutation SubmitLiveFeedbackFlowMutation(\n  $input: CreateFeedbackFlowInput!\n) {\n  createFeedbackFlow(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        flowName\n        flowDescription\n        prompts {\n          id\n          order\n          prompt {\n            id\n            prompt\n            isVote\n            isOpenEnded\n            isMultipleChoice\n            multipleChoiceOptions\n            isDraft\n            reasoningType\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0ddd645df90302d20c432fa02a74770a";

export default node;
