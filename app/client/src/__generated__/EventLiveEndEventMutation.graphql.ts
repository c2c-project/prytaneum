/**
 * @generated SignedSource<<666f022f7d4c5694b73299e50147c10a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EventLiveEndEventMutation$variables = {
  eventId: string;
};
export type EventLiveEndEventMutationVariables = EventLiveEndEventMutation$variables;
export type EventLiveEndEventMutation$data = {
  readonly endEvent: {
    readonly message: string;
  };
};
export type EventLiveEndEventMutationResponse = EventLiveEndEventMutation$data;
export type EventLiveEndEventMutation = {
  variables: EventLiveEndEventMutationVariables;
  response: EventLiveEndEventMutation$data;
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
    "name": "endEvent",
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
    "name": "EventLiveEndEventMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EventLiveEndEventMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5f8e0d3ef59de442b9fd1c43d66dc39d",
    "id": null,
    "metadata": {},
    "name": "EventLiveEndEventMutation",
    "operationKind": "mutation",
    "text": "mutation EventLiveEndEventMutation(\n  $eventId: String!\n) {\n  endEvent(eventId: $eventId) {\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "1f31ba016bce900d44d273f49c8263d4";

export default node;
