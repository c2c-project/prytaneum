/**
 * @generated SignedSource<<fb8ac94e2134f5524f587be55cda3e1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ShareFeedbackPromptFlowMutation$variables = {
  flowId: string;
};
export type ShareFeedbackPromptFlowMutation$data = {
  readonly reshareFeedbackFlow: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type ShareFeedbackPromptFlowMutation = {
  response: ShareFeedbackPromptFlowMutation$data;
  variables: ShareFeedbackPromptFlowMutation$variables;
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
    "name": "reshareFeedbackFlow",
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
    "name": "ShareFeedbackPromptFlowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShareFeedbackPromptFlowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "dd25178a28cc88e3ffd736b848d5af35",
    "id": null,
    "metadata": {},
    "name": "ShareFeedbackPromptFlowMutation",
    "operationKind": "mutation",
    "text": "mutation ShareFeedbackPromptFlowMutation(\n  $flowId: ID!\n) {\n  reshareFeedbackFlow(flowId: $flowId) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1df665233dcbc987175dd4848f0f0e32";

export default node;
