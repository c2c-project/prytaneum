/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestionCarouselFragment = {
    readonly id: string;
    readonly currentQuestion: number | null;
    readonly queuedQuestions: {
        readonly edges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly position: number | null;
                readonly " $fragmentRefs": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment">;
            };
        }> | null;
    } | null;
    readonly " $refType": "QuestionCarouselFragment";
};
export type QuestionCarouselFragment$data = QuestionCarouselFragment;
export type QuestionCarouselFragment$key = {
    readonly " $data"?: QuestionCarouselFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"QuestionCarouselFragment">;
};



const node: ReaderFragment = {
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
        "path": [
          "queuedQuestions"
        ]
      }
    ]
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
      "alias": "queuedQuestions",
      "args": null,
      "concreteType": "EventQuestionConnection",
      "kind": "LinkedField",
      "name": "__QuestionCarousel_queuedQuestions_connection",
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
(node as any).hash = 'cd75865c3f4e4c81f3d84294861dded9';
export default node;
