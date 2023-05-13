/**
 * @generated SignedSource<<396aa6f0d3a80c183ea61785816de547>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useParticipantMutedSubscription$variables = {
  eventId: string;
};
export type useParticipantMutedSubscriptionVariables = useParticipantMutedSubscription$variables;
export type useParticipantMutedSubscription$data = {
  readonly participantMuted: boolean | null;
};
export type useParticipantMutedSubscriptionResponse = useParticipantMutedSubscription$data;
export type useParticipantMutedSubscription = {
  variables: useParticipantMutedSubscriptionVariables;
  response: useParticipantMutedSubscription$data;
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
    "kind": "ScalarField",
    "name": "participantMuted",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useParticipantMutedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useParticipantMutedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ffac3b60ae2165fa1bebd9dda474cfa2",
    "id": null,
    "metadata": {},
    "name": "useParticipantMutedSubscription",
    "operationKind": "subscription",
    "text": "subscription useParticipantMutedSubscription(\n  $eventId: ID!\n) {\n  participantMuted(eventId: $eventId)\n}\n"
  }
};
})();

(node as any).hash = "da67e6cfe00e0726e4e4016366d92ff5";

export default node;
