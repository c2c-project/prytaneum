/**
 * @generated SignedSource<<8feddedb6b114df02443465ba4262a36>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveMessagesQuery$variables = {
  eventId: string;
};
export type LiveMessagesQuery$data = {
  readonly eventBroadcastMessages: ReadonlyArray<{
    readonly broadcastMessage: string;
    readonly createdBy: {
      readonly firstName: string | null;
    } | null;
    readonly id: string;
    readonly isVisible: boolean | null;
    readonly " $fragmentSpreads": FragmentRefs<"BroadcastMessageAuthorFragment" | "BroadcastMessageContentFragment">;
  }> | null;
};
export type LiveMessagesQuery = {
  response: LiveMessagesQuery$data;
  variables: LiveMessagesQuery$variables;
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
    "name": "LiveMessagesQuery",
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
    "name": "LiveMessagesQuery",
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
            "name": "createdAt",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2a798727fc273a3265655953364e6f1c",
    "id": null,
    "metadata": {},
    "name": "LiveMessagesQuery",
    "operationKind": "query",
    "text": "query LiveMessagesQuery(\n  $eventId: ID!\n) {\n  eventBroadcastMessages(eventId: $eventId) {\n    id\n    broadcastMessage\n    isVisible\n    createdBy {\n      firstName\n      id\n    }\n    ...BroadcastMessageAuthorFragment\n    ...BroadcastMessageContentFragment\n  }\n}\n\nfragment BroadcastMessageAuthorFragment on EventBroadcastMessage {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n\nfragment BroadcastMessageContentFragment on EventBroadcastMessage {\n  broadcastMessage\n}\n"
  }
};
})();

(node as any).hash = "892b6cb41e26b2ef57f5e62defc46f28";

export default node;
