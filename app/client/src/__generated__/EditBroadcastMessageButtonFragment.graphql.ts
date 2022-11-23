/**
 * @generated SignedSource<<4935e81f7b3f25251ba9d506613687b5>>
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
  readonly position: number | null;
  readonly broadcastMessage: string;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "position",
      "storageKey": null
    },
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

(node as any).hash = "d3c4699f79193bf18e584ce5ff24763c";

export default node;
