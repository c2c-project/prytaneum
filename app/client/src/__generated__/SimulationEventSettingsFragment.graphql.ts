/**
 * @generated SignedSource<<e0be799adff3b6ffa5790757360380fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SimulationEventSettingsFragment$data = {
  readonly id: string;
  readonly simulationBackground: string | null;
  readonly simulationCovariates: ReadonlyArray<string> | null;
  readonly simulationEnabled: boolean | null;
  readonly simulationParticipantCount: number | null;
  readonly simulationTopic: string | null;
  readonly " $fragmentType": "SimulationEventSettingsFragment";
};
export type SimulationEventSettingsFragment$key = {
  readonly " $data"?: SimulationEventSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SimulationEventSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SimulationEventSettingsFragment",
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
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "0cf29bdef82dbb9d7fe200a1e1238305";

export default node;
