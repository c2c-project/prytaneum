/**
 * @generated SignedSource<<c9416c0e1821cd5af805afc4f90a58b1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateFeedback = {
  eventId: string;
  isReply?: boolean | null;
  message: string;
  refFeedbackId?: string | null;
};
export type LiveFeedbackReplyActionMutation$variables = {
  eventId: string;
  input: CreateFeedback;
};
export type LiveFeedbackReplyActionMutation$data = {
  readonly createFeedback: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly message: string;
        readonly " $fragmentSpreads": FragmentRefs<"LiveFeedbackAuthorFragment">;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type LiveFeedbackReplyActionMutation = {
  response: LiveFeedbackReplyActionMutation$data;
  variables: LiveFeedbackReplyActionMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "eventId"
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
  "name": "cursor",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  {
    "kind": "Variable",
    "name": "eventId",
    "variableName": "eventId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LiveFeedbackReplyActionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventFeedbackMutationResponse",
        "kind": "LinkedField",
        "name": "createFeedback",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventLiveFeedbackEdge",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventLiveFeedback",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v4/*: any*/),
                  {
                    "args": (v7/*: any*/),
                    "kind": "FragmentSpread",
                    "name": "LiveFeedbackAuthorFragment"
                  }
                ],
                "storageKey": null
              }
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
    "name": "LiveFeedbackReplyActionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventFeedbackMutationResponse",
        "kind": "LinkedField",
        "name": "createFeedback",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventLiveFeedbackEdge",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventLiveFeedback",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "firstName",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastName",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "avatar",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v7/*: any*/),
                        "kind": "ScalarField",
                        "name": "moderatorOf",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  }
                ],
                "storageKey": null
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
    "cacheID": "81d1099cc0144585e5dc0e4185b798b5",
    "id": null,
    "metadata": {},
    "name": "LiveFeedbackReplyActionMutation",
    "operationKind": "mutation",
    "text": "mutation LiveFeedbackReplyActionMutation(\n  $input: CreateFeedback!\n  $eventId: ID!\n) {\n  createFeedback(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        message\n        ...LiveFeedbackAuthorFragment_32qNee\n      }\n    }\n  }\n}\n\nfragment LiveFeedbackAuthorFragment_32qNee on EventLiveFeedback {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n    moderatorOf(eventId: $eventId)\n  }\n  createdAt\n}\n"
  }
};
})();

(node as any).hash = "9d9bdcaf8f8704bb5ee3ec46aa8baebd";

export default node;
