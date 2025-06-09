/**
 * @generated SignedSource<<730e8a81e20acd2da584ae2545abfceb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useLiveFeedbackPromptFlowsFragment$data = {
  readonly feedbackFlows: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
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
            readonly viewpoints: ReadonlyArray<string> | null;
            readonly voteViewpoints: any | null;
            readonly " $fragmentSpreads": FragmentRefs<"useLiveFeedbackPromptResponsesFragment">;
          };
        }>;
      };
    }> | null;
    readonly pageInfo: {
      readonly endCursor: string | null;
      readonly hasNextPage: boolean;
    };
  } | null;
  readonly id: string;
  readonly " $fragmentType": "useLiveFeedbackPromptFlowsFragment";
};
export type useLiveFeedbackPromptFlowsFragment$key = {
  readonly " $data"?: useLiveFeedbackPromptFlowsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useLiveFeedbackPromptFlowsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "feedbackFlows"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDraft",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 100,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./feedbackFlowPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "useLiveFeedbackPromptFlowsFragment",
  "selections": [
    (v1/*: any*/),
    {
      "alias": "feedbackFlows",
      "args": null,
      "concreteType": "FeedbackFlowConnection",
      "kind": "LinkedField",
      "name": "__useLiveFeedbackPromptFlowsFragment_feedbackFlows_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FeedbackFlowEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
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
                (v1/*: any*/),
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
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "FeedbackFlowPrompt",
                  "kind": "LinkedField",
                  "name": "prompts",
                  "plural": true,
                  "selections": [
                    (v1/*: any*/),
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
                        (v1/*: any*/),
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
                          "name": "createdAt",
                          "storageKey": null
                        },
                        (v2/*: any*/),
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
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "useLiveFeedbackPromptResponsesFragment"
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
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "b14b2f278f7990fedcb0378bb55de91b";

export default node;
