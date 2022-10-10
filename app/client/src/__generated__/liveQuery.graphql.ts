/**
 * @generated SignedSource<<078e457b532d69fc7f99211fc4624809>>
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
    readonly isViewerModerator: boolean | null;
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isViewerModerator",
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
    "cacheID": "081b1cc3a12935d7e263c8eb105579f5",
    "id": null,
    "metadata": {},
    "name": "liveQuery",
    "operationKind": "query",
    "text": "query liveQuery(\n  $eventId: ID!\n) {\n  findSingleEvent(id: $eventId) {\n    isActive\n    isViewerModerator\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "ee5d67397afd81c55a65923eb792e906";

export default node;
