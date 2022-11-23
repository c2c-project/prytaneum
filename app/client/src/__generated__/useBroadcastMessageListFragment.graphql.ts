/**
 * @generated SignedSource<<0d2ff35fe4e72057947ea66b3d6845bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useBroadcastMessageListFragment$data = {
  readonly id: string;
  readonly currentBroadcastMessage: number | null;
  readonly broadcastMessages: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly broadcastMessage: string;
        readonly createdBy: {
          readonly firstName: string | null;
        } | null;
        readonly " $fragmentSpreads": FragmentRefs<"BroadcastMessageActionsFragment" | "BroadcastMessageAuthorFragment" | "BroadcastMessageContentFragment">;
      };
    }> | null;
    readonly pageInfo: {
      readonly startCursor: string | null;
      readonly endCursor: string | null;
    };
  } | null;
  readonly " $fragmentType": "useBroadcastMessageListFragment";
};
export type useBroadcastMessageListFragment = useBroadcastMessageListFragment$data;
export type useBroadcastMessageListFragment$key = {
  readonly " $data"?: useBroadcastMessageListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useBroadcastMessageListFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "broadcastMessages"
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
      "defaultValue": 50,
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
      "operation": require('./broadcastMessagePagination.graphql'),
      "identifierField": "id"
    }
  },
  "name": "useBroadcastMessageListFragment",
  "selections": [
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentBroadcastMessage",
      "storageKey": null
    },
    {
      "alias": "broadcastMessages",
      "args": null,
      "concreteType": "EventBroadcastMessagesConnection",
      "kind": "LinkedField",
      "name": "__useBroadcastMessageListFragment_broadcastMessages_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventBroadcastMessageEdge",
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
              "concreteType": "EventBroadcastMessage",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "broadcastMessage",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "BroadcastMessageActionsFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "BroadcastMessageAuthorFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "BroadcastMessageContentFragment"
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
              "name": "startCursor",
              "storageKey": null
            },
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

(node as any).hash = "0f424e8ef3aad6ab2a71a572a1e33ef3";

export default node;
