/**
 * @generated SignedSource<<02ee602222750c0912dfb5a1d2385228>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useUnmuteParticipantMutation$variables = {
  eventId: string;
  userId: string;
};
export type useUnmuteParticipantMutationVariables = useUnmuteParticipantMutation$variables;
export type useUnmuteParticipantMutation$data = {
  readonly unmuteParticipant: {
    readonly isError: boolean;
    readonly message: string;
  };
};
export type useUnmuteParticipantMutationResponse = useUnmuteParticipantMutation$data;
export type useUnmuteParticipantMutation = {
  variables: useUnmuteParticipantMutationVariables;
  response: useUnmuteParticipantMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
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
      },
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "MuteParticipantMutationResponse",
    "kind": "LinkedField",
    "name": "unmuteParticipant",
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
    "name": "useUnmuteParticipantMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUnmuteParticipantMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "882d28292292e9cf3fb1dd6c2860c29f",
    "id": null,
    "metadata": {},
    "name": "useUnmuteParticipantMutation",
    "operationKind": "mutation",
    "text": "mutation useUnmuteParticipantMutation(\n  $eventId: ID!\n  $userId: ID!\n) {\n  unmuteParticipant(eventId: $eventId, userId: $userId) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "544940214ca8e982280453cc25c14ef4";

export default node;
