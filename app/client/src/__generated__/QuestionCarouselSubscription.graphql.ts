/**
 * @generated SignedSource<<731117f8383d4fc5d06f3131d5243bd7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type QuestionCarouselSubscription$variables = {
  eventId: string;
};
export type QuestionCarouselSubscriptionVariables = QuestionCarouselSubscription$variables;
export type QuestionCarouselSubscription$data = {
  readonly eventUpdates: {
    readonly id: string;
    readonly currentQuestion: number | null;
  };
};
export type QuestionCarouselSubscriptionResponse = QuestionCarouselSubscription$data;
export type QuestionCarouselSubscription = {
  variables: QuestionCarouselSubscriptionVariables;
  response: QuestionCarouselSubscription$data;
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
    "concreteType": "Event",
    "kind": "LinkedField",
    "name": "eventUpdates",
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
        "name": "currentQuestion",
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
    "name": "QuestionCarouselSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestionCarouselSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "240070639049e50f38588f469be1a6d3",
    "id": null,
    "metadata": {},
    "name": "QuestionCarouselSubscription",
    "operationKind": "subscription",
    "text": "subscription QuestionCarouselSubscription(\n  $eventId: ID!\n) {\n  eventUpdates(eventId: $eventId) {\n    id\n    currentQuestion\n  }\n}\n"
  }
};
})();

(node as any).hash = "bd6f14c6ae80ef6db6226d0ed844cf3c";

export default node;
