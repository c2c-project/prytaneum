/**
 * @generated SignedSource<<b051f208530d28afd756efc8c213ab64>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useLiveFeedbackListFragment$data = {
  readonly id: string;
  readonly liveFeedback: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly createdBy: {
          readonly firstName: string | null;
          readonly id: string;
          readonly moderatorOf: boolean | null;
        } | null;
        readonly id: string;
        readonly message: string;
        readonly refFeedback: {
          readonly createdBy: {
            readonly firstName: string | null;
            readonly id: string;
            readonly moderatorOf: boolean | null;
          } | null;
          readonly " $fragmentSpreads": FragmentRefs<"LiveFeedbackReplyFragment">;
        } | null;
        readonly " $fragmentSpreads": FragmentRefs<"LiveFeedbackAuthorFragment" | "LiveFeedbackReplyFragment">;
      };
    }> | null;
  } | null;
  readonly " $fragmentType": "useLiveFeedbackListFragment";
};
export type useLiveFeedbackListFragment$key = {
  readonly " $data"?: useLiveFeedbackListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useLiveFeedbackListFragment">;
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
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v1/*: any*/),
      "kind": "ScalarField",
      "name": "moderatorOf",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
  "args": (v1/*: any*/),
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
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "eventId"
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
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "EventLiveFeedback",
                  "kind": "LinkedField",
                  "name": "refFeedback",
                  "plural": false,
                  "selections": [
                    (v2/*: any*/),
                    (v3/*: any*/)
                  ],
                  "storageKey": null
                },
                (v3/*: any*/),
                {
                  "args": (v1/*: any*/),
                  "kind": "FragmentSpread",
                  "name": "LiveFeedbackAuthorFragment"
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

(node as any).hash = "d3ec5be05ce4c1e749ac2cc58405ff57";

export default node;
