/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateSpeaker = {
    name?: string | null;
    title?: string | null;
    description?: string | null;
    pictureUrl?: string | null;
    email?: string | null;
    id: string;
    eventId: string;
};
export type UpdateSpeakerMutationVariables = {
    input: UpdateSpeaker;
};
export type UpdateSpeakerMutationResponse = {
    readonly updateSpeaker: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly id: string;
            readonly eventId: string | null;
            readonly name: string | null;
            readonly description: string | null;
            readonly title: string | null;
            readonly pictureUrl: string | null;
            readonly email: string | null;
        } | null;
    };
};
export type UpdateSpeakerMutation = {
    readonly response: UpdateSpeakerMutationResponse;
    readonly variables: UpdateSpeakerMutationVariables;
};



/*
mutation UpdateSpeakerMutation(
  $input: UpdateSpeaker!
) {
  updateSpeaker(input: $input) {
    isError
    message
    body {
      id
      eventId
      name
      description
      title
      pictureUrl
      email
    }
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
    "concreteType": "EventSpeakerMutationResponse",
    "kind": "LinkedField",
    "name": "updateSpeaker",
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
        "concreteType": "EventSpeaker",
        "kind": "LinkedField",
        "name": "body",
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
            "name": "eventId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "pictureUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
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
    "name": "UpdateSpeakerMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateSpeakerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "88922ba4d9734d3acccf2dafeb97cc9d",
    "id": null,
    "metadata": {},
    "name": "UpdateSpeakerMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateSpeakerMutation(\n  $input: UpdateSpeaker!\n) {\n  updateSpeaker(input: $input) {\n    isError\n    message\n    body {\n      id\n      eventId\n      name\n      description\n      title\n      pictureUrl\n      email\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '667470bddeb73a74af55a0a8f202dd78';
export default node;
