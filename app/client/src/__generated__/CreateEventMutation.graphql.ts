/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateEvent = {
    title: string;
    startDateTime: Date;
    endDateTime: Date;
    description: string;
    topic: string;
    orgId: string;
};
export type CreateEventMutationVariables = {
    input: CreateEvent;
    connections: Array<string>;
};
export type CreateEventMutationResponse = {
    readonly createEvent: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly id: string;
            readonly title: string | null;
            readonly topic: string | null;
            readonly startDateTime: Date | null;
        } | null;
    };
};
export type CreateEventMutation = {
    readonly response: CreateEventMutationResponse;
    readonly variables: CreateEventMutationVariables;
};



/*
mutation CreateEventMutation(
  $input: CreateEvent!
) {
  createEvent(event: $input) {
    isError
    message
    body {
      id
      title
      topic
      startDateTime
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
    "name": "event",
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
  "concreteType": "Event",
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
      "name": "title",
      "storageKey": null
    },
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
      "name": "startDateTime",
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
    "name": "CreateEventMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventMutationResponse",
        "kind": "LinkedField",
        "name": "createEvent",
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
    "name": "CreateEventMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventMutationResponse",
        "kind": "LinkedField",
        "name": "createEvent",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
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
                "value": "EventEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "694d549f6e61692d6e36f1c4f6d94ade",
    "id": null,
    "metadata": {},
    "name": "CreateEventMutation",
    "operationKind": "mutation",
    "text": "mutation CreateEventMutation(\n  $input: CreateEvent!\n) {\n  createEvent(event: $input) {\n    isError\n    message\n    body {\n      id\n      title\n      topic\n      startDateTime\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5fbc15ecd24557ffc7e5c5233e0f9183';
export default node;
