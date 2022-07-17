/**
 * @generated SignedSource<<45367ca772622b75412317be2f16b2b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ViewLiveFeedbackPromptResultsQuery$variables = {
  promptId: string;
};
export type ViewLiveFeedbackPromptResultsQuery$data = {
  readonly promptResponseVotes: {
    readonly against: number;
    readonly conflicted: number;
    readonly for: number;
  };
};
export type ViewLiveFeedbackPromptResultsQuery = {
  response: ViewLiveFeedbackPromptResultsQuery$data;
  variables: ViewLiveFeedbackPromptResultsQuery$variables;
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
    "concreteType": "Votes",
    "kind": "LinkedField",
    "name": "promptResponseVotes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "for",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "against",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "conflicted",
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
    "name": "ViewLiveFeedbackPromptResultsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ViewLiveFeedbackPromptResultsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c41cda7955c95f7688ca66a07f7d8e87",
    "id": null,
    "metadata": {},
    "name": "ViewLiveFeedbackPromptResultsQuery",
    "operationKind": "query",
    "text": "query ViewLiveFeedbackPromptResultsQuery(\n  $promptId: ID!\n) {\n  promptResponseVotes(promptId: $promptId) {\n    for\n    against\n    conflicted\n  }\n}\n"
  }
};
})();

(node as any).hash = "c10f940705b5261154a149fdb593a2c5";

export default node;
