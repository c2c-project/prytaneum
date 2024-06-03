/**
 * @generated SignedSource<<d909f648a11989e30dc489bf9f879d0e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useBroadcastMessageDeletedSubscription$variables = {
  connections: ReadonlyArray<string>;
  eventId: string;
};
export type useBroadcastMessageDeletedSubscription$data = {
  readonly broadcastMessageDeleted: {
    readonly edge: {
      readonly cursor: string;
      readonly node: {
        readonly broadcastMessage: string;
        readonly createdBy: {
          readonly firstName: string | null;
        } | null;
        readonly id: string;
        readonly isVisible: boolean | null;
        readonly position: number | null;
        readonly " $fragmentSpreads": FragmentRefs<"BroadcastMessageActionsFragment" | "BroadcastMessageAuthorFragment" | "BroadcastMessageContentFragment">;
      };
    };
  };
};
export type useBroadcastMessageDeletedSubscription = {
  response: useBroadcastMessageDeletedSubscription$data;
  variables: useBroadcastMessageDeletedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "broadcastMessage",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isVisible",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useBroadcastMessageDeletedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventBroadcastMessageEdgeContainer",
        "kind": "LinkedField",
        "name": "broadcastMessageDeleted",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventBroadcastMessageEdge",
            "kind": "LinkedField",
            "name": "edge",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventBroadcastMessage",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/)
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
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useBroadcastMessageDeletedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventBroadcastMessageEdgeContainer",
        "kind": "LinkedField",
        "name": "broadcastMessageDeleted",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventBroadcastMessageEdge",
            "kind": "LinkedField",
            "name": "edge",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventBroadcastMessage",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "filters": null,
                    "handle": "deleteEdge",
                    "key": "",
                    "kind": "ScalarHandle",
                    "name": "id",
                    "handleArgs": [
                      {
                        "kind": "Variable",
                        "name": "connections",
                        "variableName": "connections"
                      }
                    ]
                  },
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastName",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "avatar",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "07f5bfd6aa5da916b0a544e4a47ab12f",
    "id": null,
    "metadata": {},
    "name": "useBroadcastMessageDeletedSubscription",
    "operationKind": "subscription",
    "text": "subscription useBroadcastMessageDeletedSubscription(\n  $eventId: ID!\n) {\n  broadcastMessageDeleted(eventId: $eventId) {\n    edge {\n      cursor\n      node {\n        id\n        broadcastMessage\n        position\n        isVisible\n        createdBy {\n          firstName\n          id\n        }\n        ...BroadcastMessageActionsFragment\n        ...BroadcastMessageAuthorFragment\n        ...BroadcastMessageContentFragment\n      }\n    }\n  }\n}\n\nfragment BroadcastMessageActionsFragment on EventBroadcastMessage {\n  id\n  ...DeleteBroadcastMessageButtonFragment\n  ...EditBroadcastMessageButtonFragment\n}\n\nfragment BroadcastMessageAuthorFragment on EventBroadcastMessage {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment BroadcastMessageContentFragment on EventBroadcastMessage {\n  broadcastMessage\n}\n\nfragment DeleteBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n  position\n}\n\nfragment EditBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n}\n"
  }
};
})();

(node as any).hash = "3c283552617e55c7012b960b09aaf887";

export default node;
