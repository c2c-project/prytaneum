/**
 * @generated SignedSource<<ec6f5bf69387ec03e35af0d65f43e196>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BroadcastMessageListQuery$variables = {
  eventId: string;
};
export type BroadcastMessageListQuery$data = {
  readonly eventBroadcastMessages: ReadonlyArray<{
    readonly broadcastMessage: string;
    readonly createdBy: {
      readonly firstName: string | null;
    } | null;
    readonly id: string;
    readonly isVisible: boolean | null;
    readonly " $fragmentSpreads": FragmentRefs<"BroadcastMessageActionsFragment" | "BroadcastMessageAuthorFragment" | "BroadcastMessageContentFragment">;
  }> | null;
};
export type BroadcastMessageListQuery = {
  response: BroadcastMessageListQuery$data;
  variables: BroadcastMessageListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  }
],
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
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "broadcastMessage",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isVisible",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "BroadcastMessageListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventBroadcastMessage",
        "kind": "LinkedField",
        "name": "eventBroadcastMessages",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": [
              (v5/*: any*/)
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BroadcastMessageListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventBroadcastMessage",
        "kind": "LinkedField",
        "name": "eventBroadcastMessages",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v2/*: any*/),
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
            "name": "position",
            "storageKey": null
          },
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
    ]
  },
  "params": {
    "cacheID": "679a1dc81d0fa4c14a6fd76b736dd01f",
    "id": null,
    "metadata": {},
    "name": "BroadcastMessageListQuery",
    "operationKind": "query",
    "text": "query BroadcastMessageListQuery(\n  $eventId: ID!\n) {\n  eventBroadcastMessages(eventId: $eventId) {\n    id\n    broadcastMessage\n    isVisible\n    createdBy {\n      firstName\n      id\n    }\n    ...BroadcastMessageActionsFragment\n    ...BroadcastMessageAuthorFragment\n    ...BroadcastMessageContentFragment\n  }\n}\n\nfragment BroadcastMessageActionsFragment on EventBroadcastMessage {\n  id\n  ...DeleteBroadcastMessageButtonFragment\n  ...EditBroadcastMessageButtonFragment\n}\n\nfragment BroadcastMessageAuthorFragment on EventBroadcastMessage {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment BroadcastMessageContentFragment on EventBroadcastMessage {\n  broadcastMessage\n}\n\nfragment DeleteBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n  position\n}\n\nfragment EditBroadcastMessageButtonFragment on EventBroadcastMessage {\n  id\n}\n"
  }
};
})();

(node as any).hash = "50dc35e223a8367dad91a2e35666d78c";

export default node;
