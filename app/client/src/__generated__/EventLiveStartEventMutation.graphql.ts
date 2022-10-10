/**
 * @generated SignedSource<<fc22ae5909ee901f31c432dd629a33d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EventLiveStartEventMutation$variables = {
  eventId: string;
};
export type EventLiveStartEventMutationVariables = EventLiveStartEventMutation$variables;
export type EventLiveStartEventMutation$data = {
  readonly startEvent: {
    readonly message: string;
  };
};
export type EventLiveStartEventMutationResponse = EventLiveStartEventMutation$data;
export type EventLiveStartEventMutation = {
  variables: EventLiveStartEventMutationVariables;
  response: EventLiveStartEventMutation$data;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "eventId",
        "variableName": "eventId"
      }
    ],
    "concreteType": "EventMutationResponse",
    "kind": "LinkedField",
    "name": "startEvent",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
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
    "name": "EventLiveStartEventMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EventLiveStartEventMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2928f279b58b88b8f0202f871dc5bbe5",
    "id": null,
    "metadata": {},
    "name": "EventLiveStartEventMutation",
    "operationKind": "mutation",
    "text": "mutation EventLiveStartEventMutation(\n  $eventId: String!\n) {\n  startEvent(eventId: $eventId) {\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "f4e1fdec34badbfe4d556d94c0e6e6f4";

export default node;
