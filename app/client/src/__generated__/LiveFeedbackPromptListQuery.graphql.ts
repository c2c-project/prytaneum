/**
 * @generated SignedSource<<75efa8d3b56cc587cab709ca0e2f3cc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type LiveFeedbackPromptListQuery$variables = {
  eventId: string;
};
export type LiveFeedbackPromptListQueryVariables = LiveFeedbackPromptListQuery$variables;
export type LiveFeedbackPromptListQuery$data = {
  readonly prompts: ReadonlyArray<{
    readonly id: string;
    readonly prompt: string;
    readonly isVote: boolean | null;
    readonly isOpenEnded: boolean | null;
    readonly createdAt: Date | null;
  }> | null;
};
export type LiveFeedbackPromptListQueryResponse = LiveFeedbackPromptListQuery$data;
export type LiveFeedbackPromptListQuery = {
  variables: LiveFeedbackPromptListQueryVariables;
  response: LiveFeedbackPromptListQuery$data;
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
    "name": "prompts",
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
        "name": "createdAt",
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
    "name": "LiveFeedbackPromptListQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LiveFeedbackPromptListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6cf6e4b9782db97a862809bfffba51d1",
    "id": null,
    "metadata": {},
    "name": "LiveFeedbackPromptListQuery",
    "operationKind": "query",
    "text": "query LiveFeedbackPromptListQuery(\n  $eventId: ID!\n) {\n  prompts(eventId: $eventId) {\n    id\n    prompt\n    isVote\n    isOpenEnded\n    createdAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "ee7548407960377d9bcc675658aa8b37";

export default node;
