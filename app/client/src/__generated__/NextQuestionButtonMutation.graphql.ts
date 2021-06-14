/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type NextQuestionButtonMutationVariables = {
    eventId: string;
};
export type NextQuestionButtonMutationResponse = {
    readonly nextQuestion: number;
};
export type NextQuestionButtonMutation = {
    readonly response: NextQuestionButtonMutationResponse;
    readonly variables: NextQuestionButtonMutationVariables;
};



/*
mutation NextQuestionButtonMutation(
  $eventId: ID!
) {
  nextQuestion(eventId: $eventId)
}
*/

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
    "kind": "ScalarField",
    "name": "nextQuestion",
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
    "cacheID": "4accc5cab885a6f9bbb5e5f87a5a21f2",
    "id": null,
    "metadata": {},
    "name": "NextQuestionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation NextQuestionButtonMutation(\n  $eventId: ID!\n) {\n  nextQuestion(eventId: $eventId)\n}\n"
  }
};
})();
(node as any).hash = '977a5473df344286447bbfacf32f59b5';
export default node;
