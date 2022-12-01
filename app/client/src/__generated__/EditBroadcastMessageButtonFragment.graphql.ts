/**
 * @generated SignedSource<<57bececb72baa305990326ddeabda930>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditBroadcastMessageButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "EditBroadcastMessageButtonFragment";
};
export type EditBroadcastMessageButtonFragment = EditBroadcastMessageButtonFragment$data;
export type EditBroadcastMessageButtonFragment$key = {
  readonly " $data"?: EditBroadcastMessageButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditBroadcastMessageButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditBroadcastMessageButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "EventBroadcastMessage",
  "abstractKey": null
};

(node as any).hash = "1472ac7b6b18e8be56c81b678bf1e905";

export default node;
