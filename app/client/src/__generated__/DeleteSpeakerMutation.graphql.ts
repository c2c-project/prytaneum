/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DeleteSpeaker = {
    eventId: string;
    id: string;
};
export type DeleteSpeakerMutationVariables = {
    input: DeleteSpeaker;
};
export type DeleteSpeakerMutationResponse = {
    readonly removeSpeaker: {
        readonly id: string;
        readonly eventId: string | null;
        readonly name: string | null;
        readonly description: string | null;
        readonly title: string | null;
        readonly pictureUrl: string | null;
    } | null;
};
export type DeleteSpeakerMutation = {
    readonly response: DeleteSpeakerMutationResponse;
    readonly variables: DeleteSpeakerMutationVariables;
};



/*
mutation DeleteSpeakerMutation(
  $input: DeleteSpeaker!
) {
  removeSpeaker(input: $input) {
    id
    eventId
    name
    description
    title
    pictureUrl
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
    "name": "removeSpeaker",
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
    "name": "DeleteSpeakerMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteSpeakerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ea14a28c1c7d4bb28670c8e1ff53bdff",
    "id": null,
    "metadata": {},
    "name": "DeleteSpeakerMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteSpeakerMutation(\n  $input: DeleteSpeaker!\n) {\n  removeSpeaker(input: $input) {\n    id\n    eventId\n    name\n    description\n    title\n    pictureUrl\n  }\n}\n"
  }
};
})();
(node as any).hash = '8919949b717d0fcc10c45ba9cd2f088d';
export default node;
