/**
 * @generated SignedSource<<632f1a3d63d18e2004a745b4bced28cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BroadcastMessageContentFragment$data = {
  readonly broadcastMessage: string;
  readonly " $fragmentType": "BroadcastMessageContentFragment";
};
export type BroadcastMessageContentFragment$key = {
  readonly " $data"?: BroadcastMessageContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BroadcastMessageContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BroadcastMessageContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "broadcastMessage",
      "storageKey": null
    }
  ],
  "type": "EventBroadcastMessage",
  "abstractKey": null
};

(node as any).hash = "79bf644f16b3c408b6edd2369ec00818";

export default node;
