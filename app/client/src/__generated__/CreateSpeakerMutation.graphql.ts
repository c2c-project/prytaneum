/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateSpeaker = {
    eventId: string;
    name: string;
    title: string;
    description: string;
    pictureUrl: string;
    email: string;
};
export type CreateSpeakerMutationVariables = {
    input: CreateSpeaker;
    connections: Array<string>;
};
export type CreateSpeakerMutationResponse = {
    readonly createSpeaker: {
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
export type CreateSpeakerMutation = {
    readonly response: CreateSpeakerMutationResponse;
    readonly variables: CreateSpeakerMutationVariables;
};



/*
mutation CreateSpeakerMutation(
  $input: CreateSpeaker!
) {
  createSpeaker(input: $input) {
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isError",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateSpeakerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventSpeakerMutationResponse",
        "kind": "LinkedField",
        "name": "createSpeaker",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateSpeakerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventSpeakerMutationResponse",
        "kind": "LinkedField",
        "name": "createSpeaker",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "body",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "EventSpeakerEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b5681dac9adf54bc26b7e1c9bfcb2233",
    "id": null,
    "metadata": {},
    "name": "CreateSpeakerMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSpeakerMutation(\n  $input: CreateSpeaker!\n) {\n  createSpeaker(input: $input) {\n    isError\n    message\n    body {\n      id\n      eventId\n      name\n      description\n      title\n      pictureUrl\n      email\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6dd1fe01c451016cfb63e807e6884530';
export default node;
