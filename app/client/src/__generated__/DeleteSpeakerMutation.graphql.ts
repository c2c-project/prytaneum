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
    connections: Array<string>;
};
export type DeleteSpeakerMutationResponse = {
    readonly deleteSpeaker: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly id: string;
        } | null;
    };
};
export type DeleteSpeakerMutation = {
    readonly response: DeleteSpeakerMutationResponse;
    readonly variables: DeleteSpeakerMutationVariables;
};



/*
mutation DeleteSpeakerMutation(
  $input: DeleteSpeaker!
) {
  deleteSpeaker(input: $input) {
    isError
    message
    body {
      id
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
    "name": "DeleteSpeakerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventSpeakerMutationResponse",
        "kind": "LinkedField",
        "name": "deleteSpeaker",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventSpeaker",
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
    "name": "DeleteSpeakerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventSpeakerMutationResponse",
        "kind": "LinkedField",
        "name": "deleteSpeaker",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventSpeaker",
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
    "cacheID": "176aa1b491b48c658c44c108852a9de0",
    "id": null,
    "metadata": {},
    "name": "DeleteSpeakerMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteSpeakerMutation(\n  $input: DeleteSpeaker!\n) {\n  deleteSpeaker(input: $input) {\n    isError\n    message\n    body {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bc2546794af320ab5db29d24edb7e893';
export default node;
