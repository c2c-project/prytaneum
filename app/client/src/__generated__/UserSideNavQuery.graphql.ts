/**
 * @generated SignedSource<<c1e5a4889edbab17ee867ad23baef942>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserSideNavQuery$variables = {};
export type UserSideNavQueryVariables = UserSideNavQuery$variables;
export type UserSideNavQuery$data = {
  readonly me: {
    readonly isOrganizer: boolean | null;
    readonly " $fragmentSpreads": FragmentRefs<"useUserFragment">;
  } | null;
};
export type UserSideNavQueryResponse = UserSideNavQuery$data;
export type UserSideNavQuery = {
  variables: UserSideNavQueryVariables;
  response: UserSideNavQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOrganizer",
  "storageKey": null
};
return {
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
          },
          (v0/*: any*/)
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
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f068b0043b466f215d7663e5c355d481",
    "id": null,
    "metadata": {},
    "name": "UserSideNavQuery",
    "operationKind": "query",
    "text": "query UserSideNavQuery {\n  me {\n    ...useUserFragment\n    isOrganizer\n    id\n  }\n}\n\nfragment useUserFragment on User {\n  id\n  firstName\n  lastName\n  email\n  avatar\n  isOrganizer\n}\n"
  }
};
})();

(node as any).hash = "51385573ee1fbcb2c4a249958e9e150e";

export default node;
