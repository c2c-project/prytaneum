/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QuestionQueueSubscriptionVariables = {
    eventId: string;
};
export type QuestionQueueSubscriptionResponse = {
    readonly questionQueued: {
        readonly id: string;
        readonly position: number | null;
    };
};
export type QuestionQueueSubscription = {
    readonly response: QuestionQueueSubscriptionResponse;
    readonly variables: QuestionQueueSubscriptionVariables;
};



/*
subscription QuestionQueueSubscription(
  $eventId: ID!
) {
  questionQueued(eventId: $eventId) {
    id
    position
  }
}
*/

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
    "concreteType": "EventQuestion",
    "kind": "LinkedField",
    "name": "questionQueued",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "position",
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
    "name": "QuestionQueueSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestionQueueSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c493292e207797dc6fd617a2acb65ba0",
    "id": null,
    "metadata": {},
    "name": "QuestionQueueSubscription",
    "operationKind": "subscription",
    "text": "subscription QuestionQueueSubscription(\n  $eventId: ID!\n) {\n  questionQueued(eventId: $eventId) {\n    id\n    position\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a8341ba386a2e2ada9d24c8bf990de1b';
export default node;
