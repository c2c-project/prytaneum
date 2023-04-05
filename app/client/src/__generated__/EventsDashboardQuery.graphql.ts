/**
 * @generated SignedSource<<fae89f6ce59d638f947e437328cd24f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventsDashboardQuery$variables = {};
export type EventsDashboardQueryVariables = EventsDashboardQuery$variables;
export type EventsDashboardQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"useEventsDashboardFragment">;
  } | null;
};
export type EventsDashboardQueryResponse = EventsDashboardQuery$data;
export type EventsDashboardQuery = {
  variables: EventsDashboardQueryVariables;
  response: EventsDashboardQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "after",
    "value": ""
  },
  {
    "kind": "Literal",
    "name": "filter",
    "value": {
      "eventName": "",
      "orgName": ""
    }
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 200
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EventsDashboardQuery",
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
            "name": "useEventsDashboardFragment"
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
    "name": "EventsDashboardQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "EventConnection",
            "kind": "LinkedField",
            "name": "allEvents",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "EventEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Event",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
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
                        "concreteType": "Organization",
                        "kind": "LinkedField",
                        "name": "organization",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "startDateTime",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endDateTime",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "allEvents(after:\"\",filter:{\"eventName\":\"\",\"orgName\":\"\"},first:200)"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "filters": [
              "filter"
            ],
            "handle": "connection",
            "key": "EventsDashboard_allEvents",
            "kind": "LinkedHandle",
            "name": "allEvents"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d090a221e4531d6177980f0b728b1316",
    "id": null,
    "metadata": {},
    "name": "EventsDashboardQuery",
    "operationKind": "query",
    "text": "query EventsDashboardQuery {\n  me {\n    ...useEventsDashboardFragment\n    id\n  }\n}\n\nfragment useEventsDashboardFragment on User {\n  allEvents(first: 200, after: \"\", filter: {eventName: \"\", orgName: \"\"}) {\n    edges {\n      node {\n        id\n        title\n        organization {\n          id\n          name\n        }\n        startDateTime\n        endDateTime\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "57234bb439c30e5950725fd90675d7ba";

export default node;
