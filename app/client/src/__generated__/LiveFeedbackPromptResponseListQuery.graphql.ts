/**
 * @generated SignedSource<<40ef86dfd521fbae000d8461189e7e7c>>
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
export type LiveFeedbackPromptResponseListQuery$data = {
  readonly promptResponses: ReadonlyArray<{
    readonly createdAt: Date | null;
    readonly createdBy: {
      readonly avatar: string | null;
      readonly firstName: string | null;
      readonly id: string;
      readonly lastName: string | null;
    } | null;
    readonly id: string;
    readonly multipleChoiceResponse: string | null;
    readonly response: string | null;
    readonly vote: string | null;
  }> | null;
};
export type LiveFeedbackPromptResponseListQuery = {
  response: LiveFeedbackPromptResponseListQuery$data;
  variables: LiveFeedbackPromptResponseListQuery$variables;
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
        "name": "multipleChoiceResponse",
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
    "cacheID": "086e762243cbaae7b89f1f8220ec955e",
    "id": null,
    "metadata": {},
    "name": "LiveFeedbackPromptResponseListQuery",
    "operationKind": "query",
    "text": "query LiveFeedbackPromptResponseListQuery(\n  $promptId: ID!\n) {\n  promptResponses(promptId: $promptId) {\n    id\n    response\n    vote\n    multipleChoiceResponse\n    createdAt\n    createdBy {\n      id\n      firstName\n      lastName\n      avatar\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b81dd2a50b8c4158473a494cdf987d6f";

export default node;
