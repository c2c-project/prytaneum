/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ValidateInviteQueryVariables = {
    token: string;
    eventId: string;
};
export type ValidateInviteQueryResponse = {
    readonly validateInvite: {
        readonly valid: boolean;
    };
};
export type ValidateInviteQuery = {
    readonly response: ValidateInviteQueryResponse;
    readonly variables: ValidateInviteQueryVariables;
};



/*
query ValidateInviteQuery(
  $token: String!
  $eventId: ID!
) {
  validateInvite(input: {token: $token, eventId: $eventId}) {
    valid
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "token"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "eventId",
            "variableName": "eventId"
          },
          {
            "kind": "Variable",
            "name": "token",
            "variableName": "token"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "ValidateInviteQueryResponse",
    "kind": "LinkedField",
    "name": "validateInvite",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "valid",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ValidateInviteQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ValidateInviteQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "4d6e8c33ff2d4886f94f1b822de8c5b7",
    "id": null,
    "metadata": {},
    "name": "ValidateInviteQuery",
    "operationKind": "query",
    "text": "query ValidateInviteQuery(\n  $token: String!\n  $eventId: ID!\n) {\n  validateInvite(input: {token: $token, eventId: $eventId}) {\n    valid\n  }\n}\n"
  }
};
})();
(node as any).hash = '3d9ed8edb405c82cec726d830562912d';
export default node;
