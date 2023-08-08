/**
 * @generated SignedSource<<ddb771085e65f4d6973ef612b4407977>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useUserUninvitedSubscription$variables = {
  connections: ReadonlyArray<string>;
  eventId: string;
};
export type useUserUninvitedSubscription$data = {
  readonly userUninvited: {
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
export type useUserUninvitedSubscription = {
  response: useUserUninvitedSubscription$data;
  variables: useUserUninvitedSubscription$variables;
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
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": (v1/*: any*/),
  "kind": "ScalarField",
  "name": "moderatorOf",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUserUninvitedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserEdgeContainer",
        "kind": "LinkedField",
        "name": "userUninvited",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserEdge",
            "kind": "LinkedField",
            "name": "edge",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUserUninvitedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserEdgeContainer",
        "kind": "LinkedField",
        "name": "userUninvited",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserEdge",
            "kind": "LinkedField",
            "name": "edge",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
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
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/)
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
    "cacheID": "60af94cded2697f335073b184c73e004",
    "id": null,
    "metadata": {},
    "name": "useUserUninvitedSubscription",
    "operationKind": "subscription",
    "text": "subscription useUserUninvitedSubscription(\n  $eventId: ID!\n) {\n  userUninvited(eventId: $eventId) {\n    edge {\n      cursor\n      node {\n        id\n        firstName\n        lastName\n        email\n        moderatorOf(eventId: $eventId)\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6508c9606a0f541dfaae16bc6368affd";

export default node;
