/**
 * @generated SignedSource<<7206fe6b6ff110c705d42f1137d3d354>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useUpdateTopicMutation$variables = {
  description: string;
  eventId: string;
  manual: boolean;
  newTopic: string;
  oldTopic: string;
};
export type useUpdateTopicMutation$data = {
  readonly updateTopic: {
    readonly body: {
      readonly description: string;
      readonly topic: string;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type useUpdateTopicMutation = {
  response: useUpdateTopicMutation$data;
  variables: useUpdateTopicMutation$variables;
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
  "name": "newTopic"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "oldTopic"
},
v5 = [
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
        "name": "newTopic",
        "variableName": "newTopic"
      },
      {
        "kind": "Variable",
        "name": "oldTopic",
        "variableName": "oldTopic"
      }
    ],
    "concreteType": "TopicMutationResponse",
    "kind": "LinkedField",
    "name": "updateTopic",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GeneratedTopic",
        "kind": "LinkedField",
        "name": "body",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "topic",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
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
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateTopicMutation",
    "selections": (v5/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "useUpdateTopicMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "6459b91c972dad8b85e51c73df377af0",
    "id": null,
    "metadata": {},
    "name": "useUpdateTopicMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateTopicMutation(\n  $eventId: String!\n  $oldTopic: String!\n  $newTopic: String!\n  $description: String!\n  $manual: Boolean!\n) {\n  updateTopic(eventId: $eventId, oldTopic: $oldTopic, newTopic: $newTopic, description: $description, manual: $manual) {\n    body {\n      topic\n      description\n    }\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "ce432c2da172ba23f89cae531a122110";

export default node;
