/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UpdateEvent = {
    title?: string | null;
    startDateTime?: Date | null;
    endDateTime?: Date | null;
    description?: string | null;
    topic?: string | null;
    isQuestionFeedVisible?: boolean | null;
    isCollectRatingsEnabled?: boolean | null;
    isForumEnabled?: boolean | null;
    isPrivate?: boolean | null;
    eventId: string;
};
export type UpdateEventMutationVariables = {
    input: UpdateEvent;
};
export type UpdateEventMutationResponse = {
    readonly updateEvent: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly id: string;
            readonly title: string | null;
            readonly topic: string | null;
            readonly description: string | null;
            readonly startDateTime: Date | null;
            readonly endDateTime: Date | null;
        } | null;
    };
};
export type UpdateEventMutation = {
    readonly response: UpdateEventMutationResponse;
    readonly variables: UpdateEventMutationVariables;
};



/*
mutation UpdateEventMutation(
  $input: UpdateEvent!
) {
  updateEvent(event: $input) {
    isError
    message
    body {
      id
      title
      topic
      description
      startDateTime
      endDateTime
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
        "name": "event",
        "variableName": "input"
      }
    ],
    "concreteType": "EventMutationResponse",
    "kind": "LinkedField",
    "name": "updateEvent",
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
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startDateTime",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endDateTime",
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
    "name": "UpdateEventMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateEventMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7cef97df61c380ff5976c4c8fe5bded5",
    "id": null,
    "metadata": {},
    "name": "UpdateEventMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateEventMutation(\n  $input: UpdateEvent!\n) {\n  updateEvent(event: $input) {\n    isError\n    message\n    body {\n      id\n      title\n      topic\n      description\n      startDateTime\n      endDateTime\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '857e7b460e6fd8ce95fa589244140122';
export default node;
