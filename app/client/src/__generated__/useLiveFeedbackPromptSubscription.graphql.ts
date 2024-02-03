/**
 * @generated SignedSource<<f5a02a6845f0fadb316f7d61fd347a57>>
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
export type useLiveFeedbackPromptSubscription$data = {
  readonly feedbackPrompted: {
    readonly id: string;
    readonly isMultipleChoice: boolean | null;
    readonly isOpenEnded: boolean | null;
    readonly isVote: boolean | null;
    readonly multipleChoiceOptions: ReadonlyArray<string> | null;
    readonly prompt: string;
  };
};
export type useLiveFeedbackPromptSubscription = {
  response: useLiveFeedbackPromptSubscription$data;
  variables: useLiveFeedbackPromptSubscription$variables;
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isMultipleChoice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "multipleChoiceOptions",
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
    "cacheID": "1922549799038c80e3d921b84a25e7a7",
    "id": null,
    "metadata": {},
    "name": "useLiveFeedbackPromptSubscription",
    "operationKind": "subscription",
    "text": "subscription useLiveFeedbackPromptSubscription(\n  $eventId: ID!\n) {\n  feedbackPrompted(eventId: $eventId) {\n    id\n    prompt\n    isVote\n    isOpenEnded\n    isMultipleChoice\n    multipleChoiceOptions\n  }\n}\n"
  }
};
})();

(node as any).hash = "630834bac36a26e4c55a6efec64f6c87";

export default node;
