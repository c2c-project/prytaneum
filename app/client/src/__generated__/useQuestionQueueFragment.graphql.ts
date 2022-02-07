/**
 * @generated SignedSource<<2d680f70ccd83c9da17862d6461473ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useQuestionQueueFragment$data = {
  readonly id: string;
  readonly currentQuestion: number | null;
  readonly questionQueue: {
    readonly questionRecord: {
      readonly __id: string;
      readonly edges: ReadonlyArray<{
        readonly cursor: string;
        readonly node: {
          readonly id: string;
          readonly position: number | null;
          readonly refQuestion: {
            readonly " $fragmentSpreads": FragmentRefs<"QuestionQuoteFragment">;
          } | null;
          readonly " $fragmentSpreads": FragmentRefs<"QuestionAuthorFragment" | "QuestionStatsFragment" | "QuestionContentFragment">;
        };
      }> | null;
    } | null;
    readonly enqueuedQuestions: {
      readonly __id: string;
      readonly edges: ReadonlyArray<{
        readonly cursor: string;
        readonly node: {
          readonly id: string;
          readonly position: number | null;
          readonly refQuestion: {
            readonly " $fragmentSpreads": FragmentRefs<"QuestionQuoteFragment">;
          } | null;
          readonly " $fragmentSpreads": FragmentRefs<"QuestionAuthorFragment" | "QuestionStatsFragment" | "QuestionContentFragment">;
        };
      }> | null;
    } | null;
  } | null;
  readonly " $fragmentType": "useQuestionQueueFragment";
};
export type useQuestionQueueFragment = useQuestionQueueFragment$data;
export type useQuestionQueueFragment$key = {
  readonly " $data"?: useQuestionQueueFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useQuestionQueueFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
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
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "QuestionAuthorFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "QuestionStatsFragment"
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
            "name": "position",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestion",
            "kind": "LinkedField",
            "name": "refQuestion",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "QuestionQuoteFragment"
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
        "path": [
          "questionQueue",
          "questionRecord"
        ]
      },
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "questionQueue",
          "enqueuedQuestions"
        ]
      }
    ]
  },
  "name": "useQuestionQueueFragment",
  "selections": [
    (v0/*: any*/),
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
          "name": "__QuestionQueueFragment_questionRecord_connection",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": "enqueuedQuestions",
          "args": null,
          "concreteType": "EventQuestionConnection",
          "kind": "LinkedField",
          "name": "__QuestionQueueFragment_enqueuedQuestions_connection",
          "plural": false,
          "selections": (v1/*: any*/),
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

(node as any).hash = "bf9a1f6c7fd332126002af6c4448e3dd";

export default node;
