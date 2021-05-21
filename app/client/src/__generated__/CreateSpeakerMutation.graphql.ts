/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SpeakerForm = {
    eventId: string;
    name: string;
    title: string;
    description: string;
    pictureUrl: string;
    email: string;
};
export type CreateSpeakerMutationVariables = {
    input?: SpeakerForm | null;
};
export type CreateSpeakerMutationResponse = {
    readonly addSpeaker: {
        readonly id: string;
        readonly eventId: string | null;
        readonly name: string | null;
        readonly description: string | null;
        readonly title: string | null;
        readonly pictureUrl: string | null;
        readonly email: string | null;
    } | null;
};
export type CreateSpeakerMutation = {
    readonly response: CreateSpeakerMutationResponse;
    readonly variables: CreateSpeakerMutationVariables;
};



/*
mutation CreateSpeakerMutation(
  $input: SpeakerForm
) {
  addSpeaker(input: $input) {
    id
    eventId
    name
    description
    title
    pictureUrl
    email
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
    "concreteType": "EventSpeaker",
    "kind": "LinkedField",
    "name": "addSpeaker",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateSpeakerMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateSpeakerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "12d1d0c77ed8c2e9857dd29c8ef073de",
    "id": null,
    "metadata": {},
    "name": "CreateSpeakerMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSpeakerMutation(\n  $input: SpeakerForm\n) {\n  addSpeaker(input: $input) {\n    id\n    eventId\n    name\n    description\n    title\n    pictureUrl\n    email\n  }\n}\n"
  }
};
})();
(node as any).hash = '0777248c0160db760d92f642937901f3';
export default node;
