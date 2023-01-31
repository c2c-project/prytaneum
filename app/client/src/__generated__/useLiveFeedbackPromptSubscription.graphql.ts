/**
 * @generated SignedSource<<2efe31be83660931b5e945872a21d6e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useLiveFeedbackPromptSubscription$variables = {
  eventId: string;
};
export type useLiveFeedbackPromptSubscriptionVariables = useLiveFeedbackPromptSubscription$variables;
export type useLiveFeedbackPromptSubscription$data = {
  readonly feedbackPrompted: {
    readonly id: string;
    readonly prompt: string;
    readonly isVote: boolean | null;
    readonly isOpenEnded: boolean | null;
  };
};
export type useLiveFeedbackPromptSubscriptionResponse = useLiveFeedbackPromptSubscription$data;
export type useLiveFeedbackPromptSubscription = {
  variables: useLiveFeedbackPromptSubscriptionVariables;
  response: useLiveFeedbackPromptSubscription$data;
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
    "name": "feedbackPrompted",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isVote",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isOpenEnded",
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
    "name": "useLiveFeedbackPromptSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useLiveFeedbackPromptSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fbd4ebf38f5303652759ebe476ff1fd7",
    "id": null,
    "metadata": {},
    "name": "useLiveFeedbackPromptSubscription",
    "operationKind": "subscription",
    "text": "subscription useLiveFeedbackPromptSubscription(\n  $eventId: ID!\n) {\n  feedbackPrompted(eventId: $eventId) {\n    id\n    prompt\n    isVote\n    isOpenEnded\n  }\n}\n"
  }
};
})();

(node as any).hash = "371411fc1c653237598c9438c60bcd0f";

export default node;
