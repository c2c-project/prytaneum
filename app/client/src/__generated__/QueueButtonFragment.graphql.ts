/**
 * @generated SignedSource<<535978cebcc3e11665f878f0b5a69c14>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QueueButtonFragment$data = {
  readonly id: string;
  readonly position: string;
  readonly " $fragmentType": "QueueButtonFragment";
};
export type QueueButtonFragment = QueueButtonFragment$data;
export type QueueButtonFragment$key = {
  readonly " $data"?: QueueButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QueueButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QueueButtonFragment",
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
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};

(node as any).hash = "8da31e831ff6489103abcad76f3299e6";

export default node;
