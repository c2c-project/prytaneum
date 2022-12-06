/**
 * @generated SignedSource<<3f08e0f802e9f5cbb578f08452c7e86d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventDetailsCardRefetchQuery$variables = {
  id: string;
};
export type EventDetailsCardRefetchQueryVariables = EventDetailsCardRefetchQuery$variables;
export type EventDetailsCardRefetchQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"EventDetailsCardFragment">;
  } | null;
};
export type EventDetailsCardRefetchQueryResponse = EventDetailsCardRefetchQuery$data;
export type EventDetailsCardRefetchQuery = {
  variables: EventDetailsCardRefetchQueryVariables;
  response: EventDetailsCardRefetchQuery$data;
};

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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EventDetailsCardRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EventDetailsCardFragment"
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
    "name": "EventDetailsCardRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
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
                "name": "description",
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
              }
            ],
            "type": "Event",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1fda7d3bfd165cb720e882239f505cd2",
    "id": null,
    "metadata": {},
    "name": "EventDetailsCardRefetchQuery",
    "operationKind": "query",
    "text": "query EventDetailsCardRefetchQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...EventDetailsCardFragment\n    id\n  }\n}\n\nfragment EventDetailsCardFragment on Event {\n  id\n  title\n  description\n  startDateTime\n  endDateTime\n}\n"
  }
};
})();

(node as any).hash = "313ed1cb419c631e37e35aef7034117a";

export default node;
