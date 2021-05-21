/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateVideo = {
    videoId: string;
    eventId: string;
    url: string;
    newUrl?: string | null;
    lang?: string | null;
};
export type UpdateVideoMutationVariables = {
    input: UpdateVideo;
};
export type UpdateVideoMutationResponse = {
    readonly updateVideo: {
        readonly id: string;
        readonly url: string;
        readonly lang: string;
    } | null;
};
export type UpdateVideoMutation = {
    readonly response: UpdateVideoMutationResponse;
    readonly variables: UpdateVideoMutationVariables;
};



/*
mutation UpdateVideoMutation(
  $input: UpdateVideo!
) {
  updateVideo(input: $input) {
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
    "name": "updateVideo",
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
    "name": "UpdateVideoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateVideoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "db6da8876c8a3b6cb1ef5e24b6b9904c",
    "id": null,
    "metadata": {},
    "name": "UpdateVideoMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateVideoMutation(\n  $input: UpdateVideo!\n) {\n  updateVideo(input: $input) {\n    id\n    url\n    lang\n  }\n}\n"
  }
};
})();
(node as any).hash = '3a521677d99d05c25d1c770c623629de';
export default node;
