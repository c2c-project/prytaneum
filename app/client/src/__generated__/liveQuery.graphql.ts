/**
 * @generated SignedSource<<0666d96993cbad407a7bb34d3d31a5eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type liveQuery$variables = {
  eventId: string;
};
export type liveQueryVariables = liveQuery$variables;
export type liveQuery$data = {
  readonly findSingleEvent: {
    readonly isActive: boolean | null;
  } | null;
};
export type liveQueryResponse = liveQuery$data;
export type liveQuery = {
  variables: liveQueryVariables;
  response: liveQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "eventId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isActive",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "liveQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "findSingleEvent",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "liveQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "findSingleEvent",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "623f9161b504cbb3f33defcc43aecb4c",
    "id": null,
    "metadata": {},
    "name": "liveQuery",
    "operationKind": "query",
    "text": "query liveQuery(\n  $eventId: ID!\n) {\n  findSingleEvent(id: $eventId) {\n    isActive\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "421c0ee5dfea4bccb14ff08583b6f729";

export default node;
