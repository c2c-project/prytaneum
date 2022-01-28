/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSideNavQueryVariables = {};
export type UserSideNavQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"useUserFragment">;
    } | null;
};
export type UserSideNavQuery = {
    readonly response: UserSideNavQueryResponse;
    readonly variables: UserSideNavQueryVariables;
};



/*
query UserSideNavQuery {
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5c710a6d9a092bbe757ee947810af494",
    "id": null,
    "metadata": {},
    "name": "UserSideNavQuery",
    "operationKind": "query",
    "text": "query UserSideNavQuery {\n  me {\n    ...useUserFragment\n    id\n  }\n}\n\nfragment useUserFragment on User {\n  id\n  firstName\n  lastName\n  email\n  avatar\n}\n"
  }
};
(node as any).hash = 'ada95e4d12e255eede6562623e353c0c';
export default node;
