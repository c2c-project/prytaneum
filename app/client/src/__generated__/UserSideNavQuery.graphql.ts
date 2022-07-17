/**
 * @generated SignedSource<<c7d9d8c72eeea5d94ae19b627c7b6aeb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserSideNavQuery$variables = {};
export type UserSideNavQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"useUserFragment">;
  } | null;
};
export type UserSideNavQuery = {
  response: UserSideNavQuery$data;
  variables: UserSideNavQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserSideNavQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "useUserFragment"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserSideNavQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
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
            "args": null,
            "kind": "ScalarField",
            "name": "avatar",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isOrganizer",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isAdmin",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d3f2a7dd37d12d5a2f21a606ef152f5a",
    "id": null,
    "metadata": {},
    "name": "UserSideNavQuery",
    "operationKind": "query",
    "text": "query UserSideNavQuery {\n  me {\n    ...useUserFragment\n    id\n  }\n}\n\nfragment useUserFragment on User {\n  id\n  firstName\n  lastName\n  email\n  avatar\n  isOrganizer\n  isAdmin\n}\n"
  }
};

(node as any).hash = "ada95e4d12e255eede6562623e353c0c";

export default node;
