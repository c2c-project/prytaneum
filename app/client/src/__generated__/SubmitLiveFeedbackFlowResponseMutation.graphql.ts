/**
 * @generated SignedSource<<b59de1ad30168102aec823be9104dc56>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateFeedbackPromptFlowResponseInput = {
  eventId: string;
  flowId: string;
  responses: ReadonlyArray<CreateFeedbackPromptResponse>;
};
export type CreateFeedbackPromptResponse = {
  eventId: string;
  multipleChoiceResponse: string;
  promptId: string;
  response: string;
  vote: string;
};
export type SubmitLiveFeedbackFlowResponseMutation$variables = {
  input: CreateFeedbackPromptFlowResponseInput;
};
export type SubmitLiveFeedbackFlowResponseMutation$data = {
  readonly createFeedbackPromptFlowResponse: {
    readonly body: boolean | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type SubmitLiveFeedbackFlowResponseMutation = {
  response: SubmitLiveFeedbackFlowResponseMutation$data;
  variables: SubmitLiveFeedbackFlowResponseMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "EventFeedbackPromptFlowResponseMutationResponse",
    "kind": "LinkedField",
    "name": "createFeedbackPromptFlowResponse",
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
        "kind": "ScalarField",
        "name": "body",
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
    "name": "SubmitLiveFeedbackFlowResponseMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmitLiveFeedbackFlowResponseMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "da50435488ea381b5fd838682b39957a",
    "id": null,
    "metadata": {},
    "name": "SubmitLiveFeedbackFlowResponseMutation",
    "operationKind": "mutation",
    "text": "mutation SubmitLiveFeedbackFlowResponseMutation(\n  $input: CreateFeedbackPromptFlowResponseInput!\n) {\n  createFeedbackPromptFlowResponse(input: $input) {\n    isError\n    message\n    body\n  }\n}\n"
  }
};
})();

(node as any).hash = "a175b5a4285ee827e93992ceb3cdb84d";

export default node;
