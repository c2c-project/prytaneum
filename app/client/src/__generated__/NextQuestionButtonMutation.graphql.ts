/**
 * @generated SignedSource<<a9bdeaaf5227dfc03ff25fde55fabe4c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type NextQuestionButtonMutation$variables = {
  eventId: string;
};
export type NextQuestionButtonMutation$data = {
  readonly nextQuestion: {
    readonly currentQuestion: string | null;
    readonly id: string;
  };
};
export type NextQuestionButtonMutation = {
  response: NextQuestionButtonMutation$data;
  variables: NextQuestionButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "eventId",
        "variableName": "eventId"
      }
    ],
    "concreteType": "Event",
    "kind": "LinkedField",
    "name": "nextQuestion",
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
        "name": "currentQuestion",
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
    "name": "NextQuestionButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NextQuestionButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "51804ca1bd92a0c695985d5472bb1d4f",
    "id": null,
    "metadata": {},
    "name": "NextQuestionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation NextQuestionButtonMutation(\n  $eventId: ID!\n) {\n  nextQuestion(eventId: $eventId) {\n    id\n    currentQuestion\n  }\n}\n"
  }
};
})();

(node as any).hash = "6e0b196203af346eac891d579b4d3143";

export default node;
