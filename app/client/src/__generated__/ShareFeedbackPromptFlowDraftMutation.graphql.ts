/**
 * @generated SignedSource<<d7dc8f6cc8fa54b67b50de1e4cc5346f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ShareFeedbackPromptFlowDraftMutation$variables = {
  flowId: string;
};
export type ShareFeedbackPromptFlowDraftMutation$data = {
  readonly shareFeedbackFlowDraft: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly isDraft: boolean;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type ShareFeedbackPromptFlowDraftMutation = {
  response: ShareFeedbackPromptFlowDraftMutation$data;
  variables: ShareFeedbackPromptFlowDraftMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "flowId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "flowId",
        "variableName": "flowId"
      }
    ],
    "concreteType": "FeedbackFlowMutationResponse",
    "kind": "LinkedField",
    "name": "shareFeedbackFlowDraft",
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
        "concreteType": "FeedbackFlowEdge",
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
            "concreteType": "FeedbackFlow",
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
                "name": "isDraft",
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
    "name": "ShareFeedbackPromptFlowDraftMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShareFeedbackPromptFlowDraftMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c453f2e07325312101a5ed5f1a4b22ba",
    "id": null,
    "metadata": {},
    "name": "ShareFeedbackPromptFlowDraftMutation",
    "operationKind": "mutation",
    "text": "mutation ShareFeedbackPromptFlowDraftMutation(\n  $flowId: ID!\n) {\n  shareFeedbackFlowDraft(flowId: $flowId) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        isDraft\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "416c188b09e99ec64e75fc1309a0f047";

export default node;
