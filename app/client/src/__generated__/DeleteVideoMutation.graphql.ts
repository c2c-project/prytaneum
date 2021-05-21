/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DeleteVideo = {
    eventId: string;
    id: string;
};
export type DeleteVideoMutationVariables = {
    input: DeleteVideo;
};
export type DeleteVideoMutationResponse = {
    readonly removeVideo: {
        readonly id: string;
    } | null;
};
export type DeleteVideoMutation = {
    readonly response: DeleteVideoMutationResponse;
    readonly variables: DeleteVideoMutationVariables;
};



/*
mutation DeleteVideoMutation(
  $input: DeleteVideo!
) {
  removeVideo(input: $input) {
    id
  }
}
*/

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
    "concreteType": "EventVideo",
    "kind": "LinkedField",
    "name": "removeVideo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "DeleteVideoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteVideoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e36c1fe6e6b3ef6022ed02421c6d0a22",
    "id": null,
    "metadata": {},
    "name": "DeleteVideoMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteVideoMutation(\n  $input: DeleteVideo!\n) {\n  removeVideo(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '1baba1934c475170fa14dd09e62997f3';
export default node;
