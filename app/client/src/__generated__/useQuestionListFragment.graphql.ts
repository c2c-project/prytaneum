/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useQuestionListFragment = {
    readonly id: string;
    readonly questions: {
        readonly __id: string;
        readonly edges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly question: string | null;
                readonly createdBy: {
                    readonly firstName: string | null;
                } | null;
                readonly refQuestion: {
                    readonly " $fragmentRefs": FragmentRefs<"QuestionCardFragment">;
                } | null;
                readonly " $fragmentRefs": FragmentRefs<"QuestionCardFragment" | "QuestionActionsFragment" | "QuestionAuthorFragment" | "QuestionContentFragment">;
            };
        }> | null;
    } | null;
    readonly " $refType": "useQuestionListFragment";
};
export type useQuestionListFragment$data = useQuestionListFragment;
export type useQuestionListFragment$key = {
    readonly " $data"?: useQuestionListFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"useQuestionListFragment">;
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
  "args": null,
  "kind": "FragmentSpread",
  "name": "QuestionCardFragment"
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
        "path": [
          "questions"
        ]
      }
    ]
  },
  "name": "useQuestionListFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": "questions",
      "args": null,
      "concreteType": "EventQuestionConnection",
      "kind": "LinkedField",
      "name": "__useQuestionListFragment_questions_connection",
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
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "question",
                  "storageKey": null
                },
                {
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
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "EventQuestion",
                  "kind": "LinkedField",
                  "name": "refQuestion",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/)
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "QuestionActionsFragment"
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
(node as any).hash = 'd0455a69534decb0968cd4687b0e8f6a';
export default node;
