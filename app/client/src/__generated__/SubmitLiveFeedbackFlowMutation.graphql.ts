/**
 * @generated SignedSource<<e1974298f656d51cb531cb7f0c341b51>>
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
        readonly eventId: string;
        readonly flowDescription: string | null;
        readonly flowName: string;
        readonly id: string;
        readonly isDraft: boolean;
        readonly prompts: ReadonlyArray<{
          readonly id: string;
          readonly order: number;
          readonly prompt: {
            readonly createdAt: Date | null;
            readonly id: string;
            readonly isDraft: boolean | null;
            readonly isMultipleChoice: boolean | null;
            readonly isOpenEnded: boolean | null;
            readonly isVote: boolean | null;
            readonly multipleChoiceOptions: ReadonlyArray<string> | null;
            readonly prompt: string;
            readonly reasoningType: string | null;
            readonly simulationResponses: {
              readonly edges: ReadonlyArray<{
                readonly node: {
                  readonly id: string;
                };
              }> | null;
            } | null;
            readonly viewpoints: ReadonlyArray<string> | null;
            readonly voteViewpoints: any | null;
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
  "kind": "ScalarField",
  "name": "isDraft",
  "storageKey": null
},
v7 = {
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
          "name": "eventId",
          "storageKey": null
        },
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
        (v6/*: any*/),
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
                (v6/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "reasoningType",
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
                  "name": "viewpoints",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "voteViewpoints",
                  "storageKey": null
                },
                {
                  "alias": "simulationResponses",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "first",
                      "value": 1
                    }
                  ],
                  "concreteType": "EventLiveFeedbackPromptResponseConnection",
                  "kind": "LinkedField",
                  "name": "responses",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "EventLiveFeedbackPromptResponseEdge",
                      "kind": "LinkedField",
                      "name": "edges",
                      "plural": true,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "EventLiveFeedbackPromptResponse",
                          "kind": "LinkedField",
                          "name": "node",
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
                  "storageKey": "responses(first:1)"
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
          (v7/*: any*/)
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
          (v7/*: any*/),
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
    "cacheID": "93b5200a350d789485871d4c5ce28489",
    "id": null,
    "metadata": {},
    "name": "SubmitLiveFeedbackFlowMutation",
    "operationKind": "mutation",
    "text": "mutation SubmitLiveFeedbackFlowMutation(\n  $input: CreateFeedbackFlowInput!\n) {\n  createFeedbackFlow(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        eventId\n        flowName\n        flowDescription\n        isDraft\n        prompts {\n          id\n          order\n          prompt {\n            id\n            prompt\n            isVote\n            isOpenEnded\n            isMultipleChoice\n            multipleChoiceOptions\n            isDraft\n            reasoningType\n            createdAt\n            viewpoints\n            voteViewpoints\n            simulationResponses: responses(first: 1) {\n              edges {\n                node {\n                  id\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d441c69b816f925b3f0c6867c6f7d700";

export default node;
