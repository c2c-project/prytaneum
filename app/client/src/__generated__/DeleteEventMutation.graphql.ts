/**
 * @generated SignedSource<<00c6e1b533d1e6ae8ee0f6925777f289>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteEvent = {
  confirmTitle: string;
  eventId: string;
  title: string;
};
export type DeleteEventMutation$variables = {
  input: DeleteEvent;
  connections: ReadonlyArray<string>;
};
export type DeleteEventMutationVariables = DeleteEventMutation$variables;
export type DeleteEventMutation$data = {
  readonly deleteEvent: {
    readonly isError: boolean;
    readonly message: string;
    readonly body: {
      readonly id: string;
    } | null;
  };
};
export type DeleteEventMutationResponse = DeleteEventMutation$data;
export type DeleteEventMutation = {
  variables: DeleteEventMutationVariables;
  response: DeleteEventMutation$data;
};

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
  "kind": "ScalarField",
  "name": "id",
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
    "name": "DeleteEventMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventMutationResponse",
        "kind": "LinkedField",
        "name": "deleteEvent",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Event",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v5/*: any*/)
            ],
            "storageKey": null
          }
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
    "name": "DeleteEventMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventMutationResponse",
        "kind": "LinkedField",
        "name": "deleteEvent",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Event",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  }
                ]
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a89caef29668696e8a6ed443f75c6ffb",
    "id": null,
    "metadata": {},
    "name": "DeleteEventMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteEventMutation(\n  $input: DeleteEvent!\n) {\n  deleteEvent(event: $input) {\n    isError\n    message\n    body {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4fb19ab8fb1b098fa3f3ef2b35b84d66";

export default node;
