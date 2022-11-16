/**
 * @generated SignedSource<<0c5d640b103bc16d63c0297487f25a70>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BroadcastMessageActionsFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteBroadcastMessageButtonFragment">;
  readonly " $fragmentType": "BroadcastMessageActionsFragment";
};
export type BroadcastMessageActionsFragment = BroadcastMessageActionsFragment$data;
export type BroadcastMessageActionsFragment$key = {
  readonly " $data"?: BroadcastMessageActionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BroadcastMessageActionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BroadcastMessageActionsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DeleteBroadcastMessageButtonFragment"
    }
  ],
  "type": "EventBroadcastMessage",
  "abstractKey": null
};

(node as any).hash = "3526b102d0b37c11a7bc40c84c4c91b4";

export default node;
