/**
 * @generated SignedSource<<fcf7a21e27d2fab52e24720f90dce3be>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type usePingEventMutation$variables = {
  eventId: string;
};
export type usePingEventMutationVariables = usePingEventMutation$variables;
export type usePingEventMutation$data = {
  readonly participantPingEvent: {
    readonly isError: boolean;
    readonly message: string;
  };
};
export type usePingEventMutationResponse = usePingEventMutation$data;
export type usePingEventMutation = {
  variables: usePingEventMutationVariables;
  response: usePingEventMutation$data;
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
    "concreteType": "ParticipantPingEventMutationResponse",
    "kind": "LinkedField",
    "name": "participantPingEvent",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isError",
        "storageKey": null
      },
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
    "name": "usePingEventMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "usePingEventMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6f02a807748bcfc40f6dd97b62da8ce4",
    "id": null,
    "metadata": {},
    "name": "usePingEventMutation",
    "operationKind": "mutation",
    "text": "mutation usePingEventMutation(\n  $eventId: ID!\n) {\n  participantPingEvent(eventId: $eventId) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "6d0056d5add3efccab0fbce40dd1ea43";

export default node;