/**
 * @generated SignedSource<<aed9249074f53f7e08768fd592999233>>
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
    readonly " $fragmentSpreads": FragmentRefs<"useUserFragment">;
  } | null;
  readonly isOrganizer: boolean;
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
          }
        ],
        "storageKey": null
      },
      (v0/*: any*/)
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
      },
      (v0/*: any*/)
    ]
  },
  "params": {
    "cacheID": "78f3d20333b33edc82eb0835901351cb",
    "id": null,
    "metadata": {},
    "name": "UserSideNavQuery",
    "operationKind": "query",
    "text": "query UserSideNavQuery {\n  me {\n    ...useUserFragment\n    id\n  }\n  isOrganizer\n}\n\nfragment useUserFragment on User {\n  id\n  firstName\n  lastName\n  email\n  avatar\n}\n"
  }
};
})();

(node as any).hash = "cd8bc8887f585d297f133d7499558c64";

export default node;
