/**
 * @generated SignedSource<<7fff6f6196ce24d07455209769e82ad0>>
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
    readonly startDateTime: Date | null;
    readonly endDateTime: Date | null;
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
  "name": "startDateTime",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDateTime",
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
          (v2/*: any*/),
          (v3/*: any*/)
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
          (v3/*: any*/),
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
    "cacheID": "346ac30cb5674ceb9d0b4c8ca6f05a58",
    "id": null,
    "metadata": {},
    "name": "liveQuery",
    "operationKind": "query",
    "text": "query liveQuery(\n  $eventId: ID!\n) {\n  findSingleEvent(id: $eventId) {\n    startDateTime\n    endDateTime\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "37faa47b0fade1c0bc5bfae06fb82a75";

export default node;
