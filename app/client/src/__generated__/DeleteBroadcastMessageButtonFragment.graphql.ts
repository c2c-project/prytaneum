/**
 * @generated SignedSource<<a06b4eed19f2bcdc48c9406d4f1bcb99>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteBroadcastMessageButtonFragment$data = {
  readonly id: string;
  readonly position: number | null;
  readonly " $fragmentType": "DeleteBroadcastMessageButtonFragment";
};
export type DeleteBroadcastMessageButtonFragment$key = {
  readonly " $data"?: DeleteBroadcastMessageButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteBroadcastMessageButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteBroadcastMessageButtonFragment",
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
  "type": "EventBroadcastMessage",
  "abstractKey": null
};

(node as any).hash = "3e6bf3c7a74f6878e501c016ef501554";

export default node;
