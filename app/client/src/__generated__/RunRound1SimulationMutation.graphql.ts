/**
 * @generated SignedSource<<08b0ce07d49aae3eeb640dacee490c16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RunRound1SimulationInput = {
  background: string;
  eventId: string;
  force?: boolean | null;
  participantCount: number;
  promptId: string;
  topic: string;
};
export type RunRound1SimulationMutation$variables = {
  input: RunRound1SimulationInput;
};
export type RunRound1SimulationMutation$data = {
  readonly runRound1Simulation: {
    readonly body: {
      readonly insertedCount: number;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type RunRound1SimulationMutation = {
  response: RunRound1SimulationMutation$data;
  variables: RunRound1SimulationMutation$variables;
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
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Round1SimulationMutationResponse",
    "kind": "LinkedField",
    "name": "runRound1Simulation",
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
        "concreteType": "Round1SimulationResult",
        "kind": "LinkedField",
        "name": "body",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "insertedCount",
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
    "name": "RunRound1SimulationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RunRound1SimulationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ecbb16316f4ca898475c2b351e453df3",
    "id": null,
    "metadata": {},
    "name": "RunRound1SimulationMutation",
    "operationKind": "mutation",
    "text": "mutation RunRound1SimulationMutation(\n  $input: RunRound1SimulationInput!\n) {\n  runRound1Simulation(input: $input) {\n    isError\n    message\n    body {\n      insertedCount\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "78e94a62fabab1b07cb8c34a00f4912c";

export default node;
