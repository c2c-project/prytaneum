/**
 * @generated SignedSource<<7a27093fadd9fa47fd9801198dc04476>>
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
          readonly question: string | null;
          readonly createdBy: {
            readonly firstName: string | null;
          } | null;
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
          readonly question: string | null;
          readonly createdBy: {
            readonly firstName: string | null;
          } | null;
          readonly position: number | null;
          readonly refQuestion: {
            readonly " $fragmentSpreads": FragmentRefs<"QuestionQuoteFragment">;
          } | null;
          readonly " $fragmentSpreads": FragmentRefs<"QuestionActionsFragment" | "QuestionAuthorFragment" | "QuestionStatsFragment" | "QuestionContentFragment">;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "question",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
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
v4 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "QuestionAuthorFragment"
},
v5 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "QuestionStatsFragment"
},
v6 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "QuestionContentFragment"
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v8 = {
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
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
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
v11 = {
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
};
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
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "EventQuestionEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "EventQuestion",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
                    (v2/*: any*/),
                    (v3/*: any*/),
                    (v4/*: any*/),
                    (v5/*: any*/),
                    (v6/*: any*/),
                    (v7/*: any*/),
                    (v8/*: any*/),
                    (v9/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            (v10/*: any*/),
            (v11/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": "enqueuedQuestions",
          "args": null,
          "concreteType": "EventQuestionConnection",
          "kind": "LinkedField",
          "name": "__QuestionQueueFragment_enqueuedQuestions_connection",
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
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "EventQuestion",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
                    (v2/*: any*/),
                    (v3/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "QuestionActionsFragment"
                    },
                    (v4/*: any*/),
                    (v5/*: any*/),
                    (v6/*: any*/),
                    (v7/*: any*/),
                    (v8/*: any*/),
                    (v9/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            (v10/*: any*/),
            (v11/*: any*/)
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

(node as any).hash = "83041d7b8a3882356dbe791565b11e26";

export default node;
