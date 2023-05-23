/**
 * @generated SignedSource<<3ee74aefeeaf6e27a09e77c08f0d6319>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PostEventFeedbackMutation$variables = {
  feedback: string;
  eventId: string;
};
export type PostEventFeedbackMutationVariables = PostEventFeedbackMutation$variables;
export type PostEventFeedbackMutation$data = {
  readonly submitPostEventFeedback: {
    readonly isError: boolean;
    readonly message: string;
  };
};
export type PostEventFeedbackMutationResponse = PostEventFeedbackMutation$data;
export type PostEventFeedbackMutation = {
  variables: PostEventFeedbackMutationVariables;
  response: PostEventFeedbackMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "feedback"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "eventId",
        "variableName": "eventId"
      },
      {
        "kind": "Variable",
        "name": "feedback",
        "variableName": "feedback"
      }
    ],
    "concreteType": "PostEventFeedbackMutationResponse",
    "kind": "LinkedField",
    "name": "submitPostEventFeedback",
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
    "name": "PostEventFeedbackMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "PostEventFeedbackMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "a66b826311faf132f8bf85ce4799229d",
    "id": null,
    "metadata": {},
    "name": "PostEventFeedbackMutation",
    "operationKind": "mutation",
    "text": "mutation PostEventFeedbackMutation(\n  $feedback: String!\n  $eventId: ID!\n) {\n  submitPostEventFeedback(feedback: $feedback, eventId: $eventId) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "8ce7568a13d5d4a8fdf9da8f088d7875";

export default node;
