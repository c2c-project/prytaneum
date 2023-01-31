/**
 * @generated SignedSource<<5d3376371788e962504793735e9c6b33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useLiveFeedbackPromptResultsSharedSubscription$variables = {
  eventId: string;
};
export type useLiveFeedbackPromptResultsSharedSubscriptionVariables = useLiveFeedbackPromptResultsSharedSubscription$variables;
export type useLiveFeedbackPromptResultsSharedSubscription$data = {
  readonly feedbackPromptResultsShared: {
    readonly id: string;
    readonly prompt: string;
  };
};
export type useLiveFeedbackPromptResultsSharedSubscriptionResponse = useLiveFeedbackPromptResultsSharedSubscription$data;
export type useLiveFeedbackPromptResultsSharedSubscription = {
  variables: useLiveFeedbackPromptResultsSharedSubscriptionVariables;
  response: useLiveFeedbackPromptResultsSharedSubscription$data;
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
    "concreteType": "EventLiveFeedbackPrompt",
    "kind": "LinkedField",
    "name": "feedbackPromptResultsShared",
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
        "name": "prompt",
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
    "name": "useLiveFeedbackPromptResultsSharedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useLiveFeedbackPromptResultsSharedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "373f4b84742dcb3163c1ef9b02d2b880",
    "id": null,
    "metadata": {},
    "name": "useLiveFeedbackPromptResultsSharedSubscription",
    "operationKind": "subscription",
    "text": "subscription useLiveFeedbackPromptResultsSharedSubscription(\n  $eventId: ID!\n) {\n  feedbackPromptResultsShared(eventId: $eventId) {\n    id\n    prompt\n  }\n}\n"
  }
};
})();

(node as any).hash = "6a1f787c8c00593648d04524796be699";

export default node;
