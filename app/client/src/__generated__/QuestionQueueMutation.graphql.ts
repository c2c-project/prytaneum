/**
 * @generated SignedSource<<3d7b7533dc922c810e67270cbb55aba0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateQuestionPosition = {
  eventId: string;
  position: string;
  questionId: string;
};
export type QuestionQueueMutation$variables = {
  input: UpdateQuestionPosition;
};
export type QuestionQueueMutation$data = {
  readonly updateQuestionPosition: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly createdBy: {
          readonly firstName: string | null;
        } | null;
        readonly id: string;
        readonly position: string;
        readonly question: string | null;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type QuestionQueueMutation$rawResponse = {
  readonly updateQuestionPosition: {
    readonly body: {
      readonly cursor: string;
      readonly node: {
        readonly createdBy: {
          readonly firstName: string | null;
          readonly id: string;
        } | null;
        readonly id: string;
        readonly position: string;
        readonly question: string | null;
      };
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type QuestionQueueMutation = {
  rawResponse: QuestionQueueMutation$rawResponse;
  response: QuestionQueueMutation$data;
  variables: QuestionQueueMutation$variables;
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
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "question",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "position",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QuestionQueueMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventQuestionMutationResponse",
        "kind": "LinkedField",
        "name": "updateQuestionPosition",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestionEdge",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestion",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
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
    "name": "QuestionQueueMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventQuestionMutationResponse",
        "kind": "LinkedField",
        "name": "updateQuestionPosition",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "EventQuestionEdge",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestion",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
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
    "cacheID": "d81b33f4d92004792283cb8c780fc2f8",
    "id": null,
    "metadata": {},
    "name": "QuestionQueueMutation",
    "operationKind": "mutation",
    "text": "mutation QuestionQueueMutation(\n  $input: UpdateQuestionPosition!\n) {\n  updateQuestionPosition(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        question\n        createdBy {\n          firstName\n          id\n        }\n        position\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dbced572ae8572ce239520f31ebcee65";

export default node;
