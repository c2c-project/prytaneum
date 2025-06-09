/**
 * @generated SignedSource<<a91deefd1f66f4ae6d9c8bdfd32db6b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useActiveFeedbackFlowSubscription$variables = {
  eventId: string;
};
export type useActiveFeedbackFlowSubscription$data = {
  readonly feedbackFlowPrompted: {
    readonly node: {
      readonly flowDescription: string | null;
      readonly flowName: string;
      readonly id: string;
      readonly prompts: ReadonlyArray<{
        readonly id: string;
        readonly order: number;
        readonly prompt: {
          readonly id: string;
          readonly isDraft: boolean | null;
          readonly isMultipleChoice: boolean | null;
          readonly isOpenEnded: boolean | null;
          readonly isVote: boolean | null;
          readonly multipleChoiceOptions: ReadonlyArray<string> | null;
          readonly prompt: string;
          readonly reasoningType: string | null;
        };
      }>;
    };
  };
};
export type useActiveFeedbackFlowSubscription = {
  response: useActiveFeedbackFlowSubscription$data;
  variables: useActiveFeedbackFlowSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "eventId",
        "variableName": "eventId"
      }
    ],
    "concreteType": "FeedbackFlowEdge",
    "kind": "LinkedField",
    "name": "feedbackFlowPrompted",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "FeedbackFlow",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "flowName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "flowDescription",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "FeedbackFlowPrompt",
            "kind": "LinkedField",
            "name": "prompts",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "order",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "EventLiveFeedbackPrompt",
                "kind": "LinkedField",
                "name": "prompt",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isDraft",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "reasoningType",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
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
    "name": "useActiveFeedbackFlowSubscription",
    "selections": (v2/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useActiveFeedbackFlowSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "28c93cf5a4803caa856d0c123d82144a",
    "id": null,
    "metadata": {},
    "name": "useActiveFeedbackFlowSubscription",
    "operationKind": "subscription",
    "text": "subscription useActiveFeedbackFlowSubscription(\n  $eventId: ID!\n) {\n  feedbackFlowPrompted(eventId: $eventId) {\n    node {\n      id\n      flowName\n      flowDescription\n      prompts {\n        id\n        order\n        prompt {\n          id\n          prompt\n          isVote\n          isOpenEnded\n          isMultipleChoice\n          multipleChoiceOptions\n          isDraft\n          reasoningType\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "efbb7f902802155ec3da17c65a49f9c7";

export default node;
