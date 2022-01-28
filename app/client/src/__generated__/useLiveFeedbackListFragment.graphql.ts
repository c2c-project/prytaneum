/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import {  } from "relay-runtime";
export type useLiveFeedbackListFragment = {
    readonly id: string;
    readonly liveFeedback: {
        readonly __id: string;
        readonly edges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly message: string;
                readonly createdBy: {
                    readonly id: string;
                } | null;
                readonly refFeedback: {
                    readonly createdBy: {
                        readonly id: string;
                    } | null;
                    readonly " $fragmentRefs": FragmentRefs<"LiveFeedbackReplyFragment">;
                } | null;
                readonly " $fragmentRefs": FragmentRefs<"LiveFeedbackReplyFragment" | "LiveFeedbackAuthorFragment">;
            };
        }> | null;
    } | null;
    readonly " $refType": "useLiveFeedbackListFragment";
};
export type useLiveFeedbackListFragment$data = useLiveFeedbackListFragment;
export type useLiveFeedbackListFragment$key = {
    readonly " $data"?: useLiveFeedbackListFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"useLiveFeedbackListFragment">;
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
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v0/*: any*/)
  ],
  "storageKey": null
},
v2 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "LiveFeedbackReplyFragment"
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
          "liveFeedback"
        ]
      }
    ]
  },
  "name": "useLiveFeedbackListFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": "liveFeedback",
      "args": null,
      "concreteType": "EventLiveFeedbackConnection",
      "kind": "LinkedField",
      "name": "__useLiveFeedbackListFragment_liveFeedback_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventLiveFeedbackEdge",
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
              "concreteType": "EventLiveFeedback",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "message",
                  "storageKey": null
                },
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "EventLiveFeedback",
                  "kind": "LinkedField",
                  "name": "refFeedback",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    (v2/*: any*/)
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
                (v2/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "LiveFeedbackAuthorFragment"
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
(node as any).hash = 'fd0a05fc621a67ccb998432d71870586';
export default node;
