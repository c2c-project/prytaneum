/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserContextQueryVariables = {};
export type UserContextQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"useUserFragment">;
    } | null;
};
export type UserContextQuery = {
    readonly response: UserContextQueryResponse;
    readonly variables: UserContextQueryVariables;
};



/*
query UserContextQuery {
  me {
    ...useUserFragment
    id
  }
}

fragment useUserFragment on User {
  id
  firstName
  lastName
  email
  avatar
}
*/

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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "90f0708ce8bba366bf8f9c4764abf926",
    "id": null,
    "metadata": {},
    "name": "UserContextQuery",
    "operationKind": "query",
    "text": "query UserContextQuery {\n  me {\n    ...useUserFragment\n    id\n  }\n}\n\nfragment useUserFragment on User {\n  id\n  firstName\n  lastName\n  email\n  avatar\n}\n"
  }
};
(node as any).hash = 'c116820bbf620ac0ac7a4468c08e734a';
export default node;
