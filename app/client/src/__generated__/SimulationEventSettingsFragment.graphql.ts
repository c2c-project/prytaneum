/**
 * @generated SignedSource<<728fe9fe23f769c276d1b8e335383151>>
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
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "45b3b23c1d767f60845c009c95d34770";

export default node;
