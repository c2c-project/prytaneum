/**
 * @generated SignedSource<<6f658c77b9ecee23d92a8aab67e9343d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateFeedbackPrompt = {
  choices: ReadonlyArray<string>;
  eventId: string;
  feedbackType: string;
  isDraft?: boolean | null;
  prompt: string;
  reasoningType: string;
};
export type SubmitLiveFeedbackPromptMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateFeedbackPrompt;
};
export type SubmitLiveFeedbackPromptMutation$data = {
  readonly createFeedbackPrompt: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly createdAt: Date | null;
        readonly id: string;
        readonly isDraft: boolean | null;
        readonly isMultipleChoice: boolean | null;
        readonly isOpenEnded: boolean | null;
        readonly isVote: boolean | null;
        readonly multipleChoiceOptions: ReadonlyArray<string> | null;
        readonly prompt: string;
        readonly " $fragmentSpreads": FragmentRefs<"useLiveFeedbackPromptResponsesFragment">;
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
  "name": "cursor",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "prompt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isVote",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOpenEnded",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMultipleChoice",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "multipleChoiceOptions",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDraft",
  "storageKey": null
},
v14 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SubmitLiveFeedbackPromptMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventFeedbackPromptMutationResponse",
        "kind": "LinkedField",
        "name": "createFeedbackPrompt",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventLiveFeedbackPromptEdge",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventLiveFeedbackPrompt",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "useLiveFeedbackPromptResponsesFragment"
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
    "name": "SubmitLiveFeedbackPromptMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventFeedbackPromptMutationResponse",
        "kind": "LinkedField",
        "name": "createFeedbackPrompt",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventLiveFeedbackPromptEdge",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventLiveFeedbackPrompt",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  {
                    "alias": null,
                    "args": (v14/*: any*/),
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
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventLiveFeedbackPromptResponse",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v6/*: any*/),
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "response",
                                "storageKey": null
                              },
                              (v8/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "vote",
                                "storageKey": null
                              },
                              (v10/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "multipleChoiceResponse",
                                "storageKey": null
                              },
                              (v12/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "User",
                                "kind": "LinkedField",
                                "name": "createdBy",
                                "plural": false,
                                "selections": [
                                  (v6/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "firstName",
                                    "storageKey": null
                                  }
                                ],
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
                                  (v6/*: any*/),
                                  (v7/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "__typename",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageInfo",
                        "kind": "LinkedField",
                        "name": "pageInfo",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "endCursor",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "hasNextPage",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "ClientExtension",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__id",
                            "storageKey": null
                          }
                        ]
                      }
                    ],
                    "storageKey": "responses(first:100)"
                  },
                  {
                    "alias": null,
                    "args": (v14/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "useLiveFeedbackPromptResponsesFragment_responses",
                    "kind": "LinkedHandle",
                    "name": "responses"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
    "cacheID": "dc9002fda557c40fa3496f5a410a6c36",
    "id": null,
    "metadata": {},
    "name": "SubmitLiveFeedbackPromptMutation",
    "operationKind": "mutation",
    "text": "mutation SubmitLiveFeedbackPromptMutation(\n  $input: CreateFeedbackPrompt!\n) {\n  createFeedbackPrompt(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        prompt\n        isVote\n        isOpenEnded\n        isMultipleChoice\n        multipleChoiceOptions\n        createdAt\n        isDraft\n        ...useLiveFeedbackPromptResponsesFragment\n      }\n    }\n  }\n}\n\nfragment useLiveFeedbackPromptResponsesFragment on EventLiveFeedbackPrompt {\n  id\n  responses(first: 100) {\n    edges {\n      cursor\n      node {\n        id\n        isOpenEnded\n        response\n        isVote\n        vote\n        isMultipleChoice\n        multipleChoiceResponse\n        createdAt\n        createdBy {\n          id\n          firstName\n        }\n        prompt {\n          id\n          prompt\n        }\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f74350ab9d12e1620fdfd61e7eab091a";

export default node;
