/**
 * @generated SignedSource<<1957669e2d74ff4914a045a147fb2e93>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useLeaveEventMutation$variables = {
  eventId: string;
};
export type useLeaveEventMutation$data = {
  readonly participantLeaveEvent: {
    readonly isError: boolean;
    readonly message: string;
  };
};
export type useLeaveEventMutation = {
  response: useLeaveEventMutation$data;
  variables: useLeaveEventMutation$variables;
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
    "name": "participantLeaveEvent",
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
    "name": "useLeaveEventMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useLeaveEventMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f6301fdb83c4af518080fb86309f9016",
    "id": null,
    "metadata": {},
    "name": "useLeaveEventMutation",
    "operationKind": "mutation",
    "text": "mutation useLeaveEventMutation(\n  $eventId: ID!\n) {\n  participantLeaveEvent(eventId: $eventId) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "fdae7cd1d296059092933167ce8654b0";

export default node;
