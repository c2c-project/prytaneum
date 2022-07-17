/**
 * @generated SignedSource<<5b67dbbd23734cc9dc8006f340340076>>
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
