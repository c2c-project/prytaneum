/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateVideo = {
    url: string;
    lang: string;
    eventId: string;
};
export type CreateVideoMutationVariables = {
    input: CreateVideo;
};
export type CreateVideoMutationResponse = {
    readonly addVideo: {
        readonly id: string;
        readonly url: string;
        readonly lang: string;
    };
};
export type CreateVideoMutation = {
    readonly response: CreateVideoMutationResponse;
    readonly variables: CreateVideoMutationVariables;
};



/*
mutation CreateVideoMutation(
  $input: CreateVideo!
) {
  addVideo(input: $input) {
    id
    url
    lang
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
    "name": "addVideo",
    "plural": false,
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
        "name": "url",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lang",
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
    "name": "CreateVideoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateVideoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0144265a567f1537b4044a0a165a5391",
    "id": null,
    "metadata": {},
    "name": "CreateVideoMutation",
    "operationKind": "mutation",
    "text": "mutation CreateVideoMutation(\n  $input: CreateVideo!\n) {\n  addVideo(input: $input) {\n    id\n    url\n    lang\n  }\n}\n"
  }
};
})();
(node as any).hash = '3f608225e43c1b16877958363296a566';
export default node;
