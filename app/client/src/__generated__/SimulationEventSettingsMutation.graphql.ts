/**
 * @generated SignedSource<<c24e6f553ada59af6fa33640536c2f6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateEvent = {
  description?: string | null;
  endDateTime?: Date | null;
  eventId: string;
  isCollectRatingsEnabled?: boolean | null;
  isForumEnabled?: boolean | null;
  isPrivate?: boolean | null;
  isQuestionFeedVisible?: boolean | null;
  simulationBackground?: string | null;
  simulationCovariates?: ReadonlyArray<string> | null;
  simulationEnabled?: boolean | null;
  simulationParticipantCount?: number | null;
  simulationTopic?: string | null;
  startDateTime?: Date | null;
  title?: string | null;
  topic?: string | null;
};
export type SimulationEventSettingsMutation$variables = {
  input: UpdateEvent;
};
export type SimulationEventSettingsMutation$data = {
  readonly updateEvent: {
    readonly body: {
      readonly " $fragmentSpreads": FragmentRefs<"SimulationEventSettingsFragment">;
    } | null;
    readonly isError: boolean;
    readonly message: string;
  };
};
export type SimulationEventSettingsMutation = {
  response: SimulationEventSettingsMutation$data;
  variables: SimulationEventSettingsMutation$variables;
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
    "name": "event",
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SimulationEventSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventMutationResponse",
        "kind": "LinkedField",
        "name": "updateEvent",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Event",
            "kind": "LinkedField",
            "name": "body",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SimulationEventSettingsFragment"
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
    "name": "SimulationEventSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventMutationResponse",
        "kind": "LinkedField",
        "name": "updateEvent",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
                "name": "simulationEnabled",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "simulationParticipantCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "simulationTopic",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "simulationBackground",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "simulationCovariates",
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
    "cacheID": "564b2603feaacd94f92b14aa1874d6fb",
    "id": null,
    "metadata": {},
    "name": "SimulationEventSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation SimulationEventSettingsMutation(\n  $input: UpdateEvent!\n) {\n  updateEvent(event: $input) {\n    isError\n    message\n    body {\n      ...SimulationEventSettingsFragment\n      id\n    }\n  }\n}\n\nfragment SimulationEventSettingsFragment on Event {\n  id\n  simulationEnabled\n  simulationParticipantCount\n  simulationTopic\n  simulationBackground\n  simulationCovariates\n}\n"
  }
};
})();

(node as any).hash = "3b9a4c6a1d950de72a3ab197a8f38938";

export default node;
