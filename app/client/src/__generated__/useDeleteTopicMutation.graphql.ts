/**
 * @generated SignedSource<<aa35bd1a7cf97ddb2496cfa451da20db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useDeleteTopicMutation$variables = {
  eventId: string;
  manual: boolean;
  topic: string;
};
export type useDeleteTopicMutation$data = {
  readonly removeTopic: {
    readonly isError: boolean;
    readonly message: string;
  } | null;
};
export type useDeleteTopicMutation = {
  response: useDeleteTopicMutation$data;
  variables: useDeleteTopicMutation$variables;
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
  "name": "manual"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topic"
},
v3 = [
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
        "name": "manual",
        "variableName": "manual"
      },
      {
        "kind": "Variable",
        "name": "topic",
        "variableName": "topic"
      }
    ],
    "concreteType": "TopicRemoveMutationResponse",
    "kind": "LinkedField",
    "name": "removeTopic",
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
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteTopicMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "useDeleteTopicMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "c146a9154934c8eefcfc74a061cb48ff",
    "id": null,
    "metadata": {},
    "name": "useDeleteTopicMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteTopicMutation(\n  $eventId: String!\n  $topic: String!\n  $manual: Boolean!\n) {\n  removeTopic(eventId: $eventId, topic: $topic, manual: $manual) {\n    isError\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "4440aa0ff848af92976ec3916046cd04";

export default node;
