/**
 * @generated SignedSource<<99ea74c8d99d9bd7467d6fdded14aa4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserContextQuery$variables = {};
export type UserContextQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"useUserFragment">;
  } | null;
};
export type UserContextQuery = {
  response: UserContextQuery$data;
  variables: UserContextQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserContextQuery",
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
    "name": "UserContextQuery",
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
    "cacheID": "7e9bf2cdea0f2433bb8bd9e5adc04524",
    "id": null,
    "metadata": {},
    "name": "UserContextQuery",
    "operationKind": "query",
    "text": "query UserContextQuery {\n  me {\n    ...useUserFragment\n    id\n  }\n}\n\nfragment useUserFragment on User {\n  id\n  firstName\n  lastName\n  email\n  avatar\n  isOrganizer\n  isAdmin\n}\n"
  }
};

(node as any).hash = "c116820bbf620ac0ac7a4468c08e734a";

export default node;
