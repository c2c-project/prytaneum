/**
 * @generated SignedSource<<f7050f4bc16b2c24a40d2c44779e9818>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useLiveFeedbackPromptsFragment$data = {
  readonly id: string;
  readonly liveFeedbackPrompts: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly createdAt: Date | null;
        readonly id: string;
        readonly isOpenEnded: boolean | null;
        readonly isVote: boolean | null;
        readonly prompt: string;
        readonly " $fragmentSpreads": FragmentRefs<"useLiveFeedbackPromptResponsesFragment">;
      };
    }> | null;
    readonly pageInfo: {
      readonly endCursor: string | null;
    };
  } | null;
  readonly " $fragmentType": "useLiveFeedbackPromptsFragment";
};
export type useLiveFeedbackPromptsFragment$key = {
  readonly " $data"?: useLiveFeedbackPromptsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useLiveFeedbackPromptsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "liveFeedbackPrompts"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": "",
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
      "operation": require('./liveFeedbackPromptPagination.graphql'),
      "identifierField": "id"
    }
  },
  "name": "useLiveFeedbackPromptsFragment",
  "selections": [
    (v1/*: any*/),
    {
      "alias": "liveFeedbackPrompts",
      "args": null,
      "concreteType": "EventLiveFeedbackPromptConnection",
      "kind": "LinkedField",
      "name": "__useLiveFeedbackPromptsFragment_liveFeedbackPrompts_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventLiveFeedbackPromptEdge",
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
              "concreteType": "EventLiveFeedbackPrompt",
              "kind": "LinkedField",
              "name": "node",
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
                  "name": "createdAt",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "useLiveFeedbackPromptResponsesFragment"
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

(node as any).hash = "c2b59a234a10b7a15a32749b775ab6d6";

export default node;
