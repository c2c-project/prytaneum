/**
 * @generated SignedSource<<8158cd5dad92e22e3d780616479f1b0d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteEvent = {
  eventId: string;
};
export type DeleteEventMutation$variables = {
  input: DeleteEvent;
};
export type DeleteEventMutationVariables = DeleteEventMutation$variables;
export type DeleteEventMutation$data = {
  readonly deleteEvent: {
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
export type DeleteEventMutationResponse = DeleteEventMutation$data;
export type DeleteEventMutation = {
  variables: DeleteEventMutationVariables;
  response: DeleteEventMutation$data;
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
        "name": "event",
        "variableName": "input"
      }
    ],
    "concreteType": "EventMutationResponse",
    "kind": "LinkedField",
    "name": "deleteEvent",
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
            "name": "startDateTime",
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
    "name": "DeleteEventMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteEventMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b59fd9b4436cbdd78ca897d29bb72445",
    "id": null,
    "metadata": {},
    "name": "DeleteEventMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteEventMutation(\n  $input: DeleteEvent!\n) {\n  deleteEvent(event: $input) {\n    isError\n    message\n    body {\n      id\n      title\n      topic\n      startDateTime\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "deb6011e7df079378429f81b2c5ecf69";

export default node;
