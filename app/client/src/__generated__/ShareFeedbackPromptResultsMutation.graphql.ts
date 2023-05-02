/**
 * @generated SignedSource<<e5aa1673723021a593390cde5a564fa9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ShareFeedbackPromptResultsMutation$variables = {
  eventId: string;
  promptId: string;
};
export type ShareFeedbackPromptResultsMutationVariables = ShareFeedbackPromptResultsMutation$variables;
export type ShareFeedbackPromptResultsMutation$data = {
  readonly shareFeedbackPromptResults: {
    readonly isError: boolean;
    readonly message: string;
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly prompt: string;
      };
    } | null;
  };
};
export type ShareFeedbackPromptResultsMutationResponse = ShareFeedbackPromptResultsMutation$data;
export type ShareFeedbackPromptResultsMutation = {
  variables: ShareFeedbackPromptResultsMutationVariables;
  response: ShareFeedbackPromptResultsMutation$data;
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
    "name": "promptId"
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
        "name": "promptId",
        "variableName": "promptId"
      }
    ],
    "concreteType": "EventFeedbackPromptMutationResponse",
    "kind": "LinkedField",
    "name": "shareFeedbackPromptResults",
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "EventLiveFeedbackPromptEdge",
        "kind": "LinkedField",
        "name": "body",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EventLiveFeedbackPrompt",
            "kind": "LinkedField",
            "name": "node",
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
    "name": "ShareFeedbackPromptResultsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShareFeedbackPromptResultsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0077f5ababe750750b80d4c613ac1ea1",
    "id": null,
    "metadata": {},
    "name": "ShareFeedbackPromptResultsMutation",
    "operationKind": "mutation",
    "text": "mutation ShareFeedbackPromptResultsMutation(\n  $eventId: ID!\n  $promptId: ID!\n) {\n  shareFeedbackPromptResults(eventId: $eventId, promptId: $promptId) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        prompt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "be982f1483280910f9778596664241a9";

export default node;
