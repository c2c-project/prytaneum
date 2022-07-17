/**
 * @generated SignedSource<<e20e94447f705576293ca10b9ee7fc4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ModeratorActionsEndEventMutation$variables = {
  eventId: string;
};
export type ModeratorActionsEndEventMutation$data = {
  readonly endEvent: {
    readonly message: string;
  };
};
export type ModeratorActionsEndEventMutation = {
  response: ModeratorActionsEndEventMutation$data;
  variables: ModeratorActionsEndEventMutation$variables;
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
    "name": "ModeratorActionsEndEventMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ModeratorActionsEndEventMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d80dac3c1a05dc097981ef06413e47e2",
    "id": null,
    "metadata": {},
    "name": "ModeratorActionsEndEventMutation",
    "operationKind": "mutation",
    "text": "mutation ModeratorActionsEndEventMutation(\n  $eventId: String!\n) {\n  endEvent(eventId: $eventId) {\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "da6f332978aefbf0db980851bd8dd529";

export default node;
