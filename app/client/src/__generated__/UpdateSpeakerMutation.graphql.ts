/**
 * @generated SignedSource<<443a7c9b590e5bc871fa5c65a5a958bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateSpeaker = {
  description?: string | null;
  email?: string | null;
  eventId: string;
  id: string;
  name?: string | null;
  pictureUrl?: string | null;
  title?: string | null;
};
export type UpdateSpeakerMutation$variables = {
  input: UpdateSpeaker;
};
export type UpdateSpeakerMutation$data = {
  readonly updateSpeaker: {
    readonly body: {
      readonly description: string | null;
      readonly email: string | null;
      readonly eventId: string | null;
      readonly id: string;
      readonly name: string | null;
      readonly pictureUrl: string | null;
      readonly title: string | null;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type UpdateSpeakerMutation = {
  response: UpdateSpeakerMutation$data;
  variables: UpdateSpeakerMutation$variables;
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

(node as any).hash = "667470bddeb73a74af55a0a8f202dd78";

export default node;
