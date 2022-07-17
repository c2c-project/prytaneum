/**
 * @generated SignedSource<<40d9fe0fa8605afbfc1ec4c60f810060>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ModeratorActionsStartEventMutation$variables = {
  eventId: string;
};
export type ModeratorActionsStartEventMutation$data = {
  readonly startEvent: {
    readonly message: string;
  };
};
export type ModeratorActionsStartEventMutation = {
  response: ModeratorActionsStartEventMutation$data;
  variables: ModeratorActionsStartEventMutation$variables;
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
    "name": "ModeratorActionsStartEventMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ModeratorActionsStartEventMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "de2b8d70fef5c32aa42189eb938aa09c",
    "id": null,
    "metadata": {},
    "name": "ModeratorActionsStartEventMutation",
    "operationKind": "mutation",
    "text": "mutation ModeratorActionsStartEventMutation(\n  $eventId: String!\n) {\n  startEvent(eventId: $eventId) {\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "a2785490d8a97c9389d86083d5f9da55";

export default node;
