/**
 * @generated SignedSource<<440c537f0e16cefe6d966668552e4f89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useUserInvitedSubscription$variables = {
  connections: ReadonlyArray<string>;
  eventId: string;
};
export type useUserInvitedSubscription$data = {
  readonly userInvited: {
    readonly edge: {
      readonly cursor: string;
      readonly node: {
        readonly email: string | null;
        readonly firstName: string | null;
        readonly id: string;
        readonly lastName: string | null;
        readonly moderatorOf: boolean | null;
      };
    };
  };
};
export type useUserInvitedSubscription = {
  response: useUserInvitedSubscription$data;
  variables: useUserInvitedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "connections"
  },
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
  "concreteType": "UserEdge",
  "kind": "LinkedField",
  "name": "edge",
  "plural": false,
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
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
          "name": "email",
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
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUserInvitedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserEdgeContainer",
        "kind": "LinkedField",
        "name": "userInvited",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUserInvitedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserEdgeContainer",
        "kind": "LinkedField",
        "name": "userInvited",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
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
    "cacheID": "8da429d8663ae7ab06194cefe30a18f4",
    "id": null,
    "metadata": {},
    "name": "useUserInvitedSubscription",
    "operationKind": "subscription",
    "text": "subscription useUserInvitedSubscription(\n  $eventId: ID!\n) {\n  userInvited(eventId: $eventId) {\n    edge {\n      cursor\n      node {\n        id\n        firstName\n        lastName\n        email\n        moderatorOf(eventId: $eventId)\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d709a05bf3b9c2f72e702d8da1880253";

export default node;
