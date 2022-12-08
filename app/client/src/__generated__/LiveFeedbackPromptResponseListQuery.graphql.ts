/**
 * @generated SignedSource<<456f1a7f27c3b54ae20a22732dff45fd>>
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
    readonly createdAt: Date | null;
    readonly createdBy: {
      readonly id: string;
      readonly firstName: string | null;
      readonly lastName: string | null;
      readonly avatar: string | null;
    } | null;
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
        "name": "promptId",
        "variableName": "promptId"
      }
    ],
    "concreteType": "EventLiveFeedbackPromptResponse",
    "kind": "LinkedField",
    "name": "promptResponses",
    "plural": true,
    "selections": [
      (v1/*: any*/),
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "createdBy",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatar",
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
    "name": "LiveFeedbackPromptResponseListQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LiveFeedbackPromptResponseListQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "acb858527e93638b844588b48a761bf5",
    "id": null,
    "metadata": {},
    "name": "LiveFeedbackPromptResponseListQuery",
    "operationKind": "query",
    "text": "query LiveFeedbackPromptResponseListQuery(\n  $promptId: ID!\n) {\n  promptResponses(promptId: $promptId) {\n    id\n    response\n    vote\n    createdAt\n    createdBy {\n      id\n      firstName\n      lastName\n      avatar\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9a7c883ccb3c766a85ae65f87702525c";

export default node;
