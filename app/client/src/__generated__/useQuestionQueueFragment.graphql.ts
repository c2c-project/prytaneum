/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useQuestionQueueFragment = {
    readonly id: string;
    readonly currentQuestion: number | null;
    readonly queuedQuestions: {
        readonly edges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly position: number | null;
                readonly " $fragmentRefs": FragmentRefs<"QuestionCardFragment">;
            };
        }> | null;
    } | null;
    readonly " $refType": "useQuestionQueueFragment";
};
export type useQuestionQueueFragment$data = useQuestionQueueFragment;
export type useQuestionQueueFragment$key = {
    readonly " $data"?: useQuestionQueueFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"useQuestionQueueFragment">;
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
  "name": "useQuestionQueueFragment",
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
      "name": "__useQuestionQueueFragment_queuedQuestions_connection",
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
                  "name": "QuestionCardFragment"
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
(node as any).hash = '3dc648f5897bd2766c96ebfb5b419e10';
export default node;
