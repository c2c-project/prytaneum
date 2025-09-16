/**
 * @generated SignedSource<<0a2519348e2eae4e5b6aa0d59bf67e74>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useAddTopicMutation$variables = {
  description: string;
  eventId: string;
  manual: boolean;
  topic: string;
};
export type useAddTopicMutation$data = {
  readonly addTopic: {
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type useAddTopicMutation = {
  response: useAddTopicMutation$data;
  variables: useAddTopicMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "manual"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topic"
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      },
      {
        "kind": "Variable",
        "name": "eventId",
        "variableName": "eventId"
      },
      {
        "kind": "Variable",
        "name": "manual",
        "variableName": "manual"
      },
      {
        "kind": "Variable",
        "name": "topic",
        "variableName": "topic"
      }
    ],
    "concreteType": "TopicMutationResponse",
    "kind": "LinkedField",
    "name": "addTopic",
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
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useAddTopicMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "useAddTopicMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "526531fc290829fbeb23b0cb36320e91",
    "id": null,
    "metadata": {},
    "name": "useAddTopicMutation",
    "operationKind": "mutation",
    "text": "mutation useAddTopicMutation(\n  $eventId: String!\n  $topic: String!\n  $description: String!\n  $manual: Boolean!\n) {\n  addTopic(eventId: $eventId, topic: $topic, description: $description, manual: $manual) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "516153d330b201dd4009f08f29433c6f";

export default node;
