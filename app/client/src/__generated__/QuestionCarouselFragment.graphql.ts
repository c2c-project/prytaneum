/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import QuestionCarouselFragmentRefetchable from "./QuestionCarouselFragmentRefetchable.graphql";
import {  } from "relay-runtime";
export type QuestionCarouselFragment = {
    readonly id: string;
    readonly currentQuestion: number | null;
    readonly questionQueue: {
        readonly questionRecord: {
            readonly __id: string;
            readonly edges: ReadonlyArray<{
                readonly cursor: string;
                readonly node: {
                    readonly position: number | null;
                    readonly " $fragmentRefs": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment">;
                };
            }> | null;
        } | null;
    } | null;
    readonly " $refType": "QuestionCarouselFragment";
};
export type QuestionCarouselFragment$data = QuestionCarouselFragment;
export type QuestionCarouselFragment$key = {
    readonly " $data"?: QuestionCarouselFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"QuestionCarouselFragment">;
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
      "operation": QuestionCarouselFragmentRefetchable,
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
(node as any).hash = '83e92b6754fa8996590a9319134e91f7';
export default node;
