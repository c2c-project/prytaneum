/**
 * @generated SignedSource<<963f4a05618ca29de93ecf56efb02913>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionCarouselFragment$data = {
  readonly id: string;
  readonly currentQuestion: number | null;
  readonly questionQueue: {
    readonly questionRecord: {
      readonly __id: string;
      readonly edges: ReadonlyArray<{
        readonly cursor: string;
        readonly node: {
          readonly position: number | null;
          readonly " $fragmentSpreads": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment">;
        };
      }> | null;
    } | null;
  } | null;
  readonly " $fragmentType": "QuestionCarouselFragment";
};
export type QuestionCarouselFragment = QuestionCarouselFragment$data;
export type QuestionCarouselFragment$key = {
  readonly " $data"?: QuestionCarouselFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionCarouselFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "questionQueue",
  "questionRecord"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 1000,
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
      "operation": require('./QuestionCarouselFragmentRefetchable.graphql'),
      "identifierField": "id"
    }
  },
  "name": "QuestionCarouselFragment",
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
      "name": "currentQuestion",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EventQuestionQueue",
      "kind": "LinkedField",
      "name": "questionQueue",
      "plural": false,
      "selections": [
        {
          "alias": "questionRecord",
          "args": null,
          "concreteType": "EventQuestionConnection",
          "kind": "LinkedField",
          "name": "__QuestionCarousel_questionRecord_connection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "EventQuestionEdge",
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
                  "concreteType": "EventQuestion",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "position",
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "QuestionAuthorFragment"
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "QuestionContentFragment"
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
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "53bfaeeea5fa71c95f9c1ec7e6d9d1ee";

export default node;
