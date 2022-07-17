/**
 * @generated SignedSource<<e36c881c215d0de7383d3de1cbffd044>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ParticipantsListQuery$variables = {
  eventId: string;
};
export type ParticipantsListQuery$data = {
  readonly eventParticipants: ReadonlyArray<{
    readonly isMuted: boolean;
    readonly user: {
      readonly firstName: string | null;
      readonly id: string;
      readonly lastName: string | null;
      readonly moderatorOf: boolean | null;
    };
  } | null>;
};
export type ParticipantsListQuery = {
  response: ParticipantsListQuery$data;
  variables: ParticipantsListQuery$variables;
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
    "name": "eventId",
    "variableName": "eventId"
  }
],
v2 = [
  {
    "alias": null,
    "args": (v1/*: any*/),
    "concreteType": "EventParticipant",
    "kind": "LinkedField",
    "name": "eventParticipants",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
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
            "args": (v1/*: any*/),
            "kind": "ScalarField",
            "name": "moderatorOf",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isMuted",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ParticipantsListQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ParticipantsListQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "0a7b8b62647b55984aea070126226be2",
    "id": null,
    "metadata": {},
    "name": "ParticipantsListQuery",
    "operationKind": "query",
    "text": "query ParticipantsListQuery(\n  $eventId: ID!\n) {\n  eventParticipants(eventId: $eventId) {\n    user {\n      id\n      firstName\n      lastName\n      moderatorOf(eventId: $eventId)\n    }\n    isMuted\n  }\n}\n"
  }
};
})();

(node as any).hash = "bf6f589b0ba9ebf946e12cdfcd937153";

export default node;
