/**
 * @generated SignedSource<<1d47a0d75c16c40b6ab326da54e99ef5>>
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
  input: CreateFeedback;
};
export type LiveFeedbackReplyActionMutationVariables = LiveFeedbackReplyActionMutation$variables;
export type LiveFeedbackReplyActionMutation$data = {
  readonly createFeedback: {
    readonly isError: boolean;
    readonly message: string;
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly message: string;
        readonly " $fragmentSpreads": FragmentRefs<"LiveFeedbackAuthorFragment">;
      };
    } | null;
  } | null;
};
export type LiveFeedbackReplyActionMutationResponse = LiveFeedbackReplyActionMutation$data;
export type LiveFeedbackReplyActionMutation = {
  variables: LiveFeedbackReplyActionMutationVariables;
  response: LiveFeedbackReplyActionMutation$data;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isError",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LiveFeedbackReplyActionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventFeedbackMutationResponse",
        "kind": "LinkedField",
        "name": "createFeedback",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventLiveFeedbackEdge",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventLiveFeedback",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v3/*: any*/),
                  {
                    "args": null,
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LiveFeedbackReplyActionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventFeedbackMutationResponse",
        "kind": "LinkedField",
        "name": "createFeedback",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventLiveFeedbackEdge",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventLiveFeedback",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
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
    "cacheID": "7064e70fe8cd3c48ad45abe1b32dfb33",
    "id": null,
    "metadata": {},
    "name": "LiveFeedbackReplyActionMutation",
    "operationKind": "mutation",
    "text": "mutation LiveFeedbackReplyActionMutation(\n  $input: CreateFeedback!\n) {\n  createFeedback(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        message\n        ...LiveFeedbackAuthorFragment\n      }\n    }\n  }\n}\n\nfragment LiveFeedbackAuthorFragment on EventLiveFeedback {\n  createdBy {\n    id\n    firstName\n    lastName\n    avatar\n  }\n  createdAt\n}\n"
  }
};
})();

(node as any).hash = "364fcb0b943e7a2340ad2399e8f65ece";

export default node;
