/**
 * @generated SignedSource<<60f2da54ab2bbbaf739a184112cc9ad7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type LiveFeedbackPromptResponseListQuery$variables = {
  isFlow?: boolean | null;
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
var v0 = {
  "defaultValue": false,
  "kind": "LocalArgument",
  "name": "isFlow"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "promptId"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "isFlow",
        "variableName": "isFlow"
      },
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
      (v2/*: any*/),
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
          (v2/*: any*/),
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LiveFeedbackPromptResponseListQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "LiveFeedbackPromptResponseListQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "0ce3d904ca889447d8bdb83b8b29b417",
    "id": null,
    "metadata": {},
    "name": "LiveFeedbackPromptResponseListQuery",
    "operationKind": "query",
    "text": "query LiveFeedbackPromptResponseListQuery(\n  $promptId: ID!\n  $isFlow: Boolean = false\n) {\n  promptResponses(promptId: $promptId, isFlow: $isFlow) {\n    id\n    response\n    vote\n    multipleChoiceResponse\n    createdAt\n    createdBy {\n      id\n      firstName\n      lastName\n      avatar\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ecf5f387cca77d1faba45ad01d094351";

export default node;
