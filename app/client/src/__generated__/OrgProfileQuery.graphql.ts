/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OrgProfileQueryVariables = {
    id: string;
};
export type OrgProfileQueryResponse = {
    readonly orgById: {
        readonly orgId: string;
        readonly name: string;
        readonly " $fragmentRefs": FragmentRefs<"OrgEventListFragment" | "OrgMemberListFragment">;
    } | null;
};
export type OrgProfileQuery = {
    readonly response: OrgProfileQueryResponse;
    readonly variables: OrgProfileQueryVariables;
};



/*
query OrgProfileQuery(
  $id: ID!
) {
  orgById(id: $id) {
    orgId
    name
    ...OrgEventListFragment
    ...OrgMemberListFragment
  }
}

fragment OrgEventListFragment on Organization {
  events {
    id
    title
    topic
    startDateTime
  }
}

fragment OrgMemberListFragment on Organization {
  members {
    userId
    firstName
    lastName
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "orgId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OrgProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "orgById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OrgEventListFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "OrgMemberListFragment"
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
    "name": "OrgProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Organization",
        "kind": "LinkedField",
        "name": "orgById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Event",
            "kind": "LinkedField",
            "name": "events",
            "plural": true,
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
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "topic",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startDateTime",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "members",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "userId",
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
    "cacheID": "70200308112d097cb29d0f5e976bb2b9",
    "id": null,
    "metadata": {},
    "name": "OrgProfileQuery",
    "operationKind": "query",
    "text": "query OrgProfileQuery(\n  $id: ID!\n) {\n  orgById(id: $id) {\n    orgId\n    name\n    ...OrgEventListFragment\n    ...OrgMemberListFragment\n  }\n}\n\nfragment OrgEventListFragment on Organization {\n  events {\n    id\n    title\n    topic\n    startDateTime\n  }\n}\n\nfragment OrgMemberListFragment on Organization {\n  members {\n    userId\n    firstName\n    lastName\n  }\n}\n"
  }
};
})();
(node as any).hash = '06a5d5c4f99dea435f305e32c1a69372';
export default node;
