/**
 * @generated SignedSource<<97971320478c9b7ac6b739fa424ebca6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useBroadcastMessageCreatedSubscription$variables = {
  connections: ReadonlyArray<string>;
  eventId: string;
};
export type useBroadcastMessageCreatedSubscription$data = {
  readonly broadcastMessageCreated: {
    readonly edge: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly isVisible: boolean | null;
        readonly position: number | null;
        readonly " $fragmentSpreads": FragmentRefs<"BroadcastMessageAuthorFragment" | "BroadcastMessageContentFragment">;
      };
    };
  };
};
export type useBroadcastMessageCreatedSubscription = {
  response: useBroadcastMessageCreatedSubscription$data;
  variables: useBroadcastMessageCreatedSubscription$variables;
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
  "name": "position",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isVisible",
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
    "name": "useBroadcastMessageCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventBroadcastMessageEdgeContainer",
        "kind": "LinkedField",
        "name": "broadcastMessageCreated",
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
    "name": "useBroadcastMessageCreatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventBroadcastMessageEdgeContainer",
        "kind": "LinkedField",
        "name": "broadcastMessageCreated",
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "firstName",
                        "storageKey": null
                      },
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "broadcastMessage",
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
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "edge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "876ac8e43df935274dd5037f65fe8ecd",
    "id": null,
    "metadata": {},
    "name": "useBroadcastMessageCreatedSubscription",
    "operationKind": "subscription",
    "text": "subscription useBroadcastMessageCreatedSubscription(\n  $eventId: ID!\n) {\n  broadcastMessageCreated(eventId: $eventId) {\n    edge {\n      cursor\n      node {\n        id\n        position\n        isVisible\n        ...BroadcastMessageAuthorFragment\n        ...BroadcastMessageContentFragment\n      }\n    }\n  }\n}\n\nfragment BroadcastMessageAuthorFragment on EventBroadcastMessage {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment BroadcastMessageContentFragment on EventBroadcastMessage {\n  broadcastMessage\n}\n"
  }
};
})();

(node as any).hash = "7daaa2dcbdbea450bc5ad5ce9055b5e8";

export default node;
