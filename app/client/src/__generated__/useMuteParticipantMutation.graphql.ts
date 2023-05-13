/**
 * @generated SignedSource<<14f4fdf6511a451a8a646bb2b8a34697>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useMuteParticipantMutation$variables = {
  eventId: string;
  userId: string;
};
export type useMuteParticipantMutationVariables = useMuteParticipantMutation$variables;
export type useMuteParticipantMutation$data = {
  readonly muteParticipant: {
    readonly isError: boolean;
    readonly message: string;
  };
};
export type useMuteParticipantMutationResponse = useMuteParticipantMutation$data;
export type useMuteParticipantMutation = {
  variables: useMuteParticipantMutationVariables;
  response: useMuteParticipantMutation$data;
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
    "name": "muteParticipant",
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
    "name": "useMuteParticipantMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useMuteParticipantMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a2fdfc04daa55866874f20d7d3d7b32e",
    "id": null,
    "metadata": {},
    "name": "useMuteParticipantMutation",
    "operationKind": "mutation",
    "text": "mutation useMuteParticipantMutation(\n  $eventId: ID!\n  $userId: ID!\n) {\n  muteParticipant(eventId: $eventId, userId: $userId) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "523b9ed2203864b566f05bc3d13c8506";

export default node;
