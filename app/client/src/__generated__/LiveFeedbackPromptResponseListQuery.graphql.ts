/**
 * @generated SignedSource<<39c6e14ed58f0429f7f2e508e44756f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type LiveFeedbackPromptResponseListQuery$variables = {
  promptId: string;
};
export type LiveFeedbackPromptResponseListQueryVariables = LiveFeedbackPromptResponseListQuery$variables;
export type LiveFeedbackPromptResponseListQuery$data = {
  readonly promptResponses: ReadonlyArray<{
    readonly id: string;
    readonly response: string | null;
    readonly vote: string | null;
  }> | null;
};
export type LiveFeedbackPromptResponseListQueryResponse = LiveFeedbackPromptResponseListQuery$data;
export type LiveFeedbackPromptResponseListQuery = {
  variables: LiveFeedbackPromptResponseListQueryVariables;
  response: LiveFeedbackPromptResponseListQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
        "name": "promptId",
        "variableName": "promptId"
      }
    ],
    "concreteType": "EventLiveFeedbackPromptResponse",
    "kind": "LinkedField",
    "name": "promptResponses",
    "plural": true,
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
        "name": "response",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "vote",
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
    "name": "LiveFeedbackPromptResponseListQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LiveFeedbackPromptResponseListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4c488ef70deda617240619542644d7b3",
    "id": null,
    "metadata": {},
    "name": "LiveFeedbackPromptResponseListQuery",
    "operationKind": "query",
    "text": "query LiveFeedbackPromptResponseListQuery(\n  $promptId: ID!\n) {\n  promptResponses(promptId: $promptId) {\n    id\n    response\n    vote\n  }\n}\n"
  }
};
})();

(node as any).hash = "a28d51ef97ee081afe65559371361513";

export default node;
