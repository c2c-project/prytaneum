/**
 * @generated SignedSource<<bdcd44d31e6fa7aab8835661e1eaed1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BroadcastMessageContentFragment$data = {
  readonly broadcastMessage: string | null;
  readonly " $fragmentType": "BroadcastMessageContentFragment";
};
export type BroadcastMessageContentFragment = BroadcastMessageContentFragment$data;
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
