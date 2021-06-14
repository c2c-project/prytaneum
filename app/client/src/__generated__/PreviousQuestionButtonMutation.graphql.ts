/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type PreviousQuestionButtonMutationVariables = {
    eventId: string;
};
export type PreviousQuestionButtonMutationResponse = {
    readonly prevQuestion: number;
};
export type PreviousQuestionButtonMutation = {
    readonly response: PreviousQuestionButtonMutationResponse;
    readonly variables: PreviousQuestionButtonMutationVariables;
};



/*
mutation PreviousQuestionButtonMutation(
  $eventId: ID!
) {
  prevQuestion(eventId: $eventId)
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
    "name": "prevQuestion",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PreviousQuestionButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PreviousQuestionButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b1e8286ba2106d2d0c8cfbd88f4d7568",
    "id": null,
    "metadata": {},
    "name": "PreviousQuestionButtonMutation",
    "operationKind": "mutation",
    "text": "mutation PreviousQuestionButtonMutation(\n  $eventId: ID!\n) {\n  prevQuestion(eventId: $eventId)\n}\n"
  }
};
})();
(node as any).hash = '4cca9aa0f605f9a0fef33ce21cb76e49';
export default node;
