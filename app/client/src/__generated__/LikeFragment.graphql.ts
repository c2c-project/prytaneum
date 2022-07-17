/**
 * @generated SignedSource<<56ebe0ef0ef6a5219d96715fd9cdf542>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LikeFragment$data = {
  readonly id: string;
  readonly isLikedByViewer: boolean | null;
  readonly " $fragmentType": "LikeFragment";
};
export type LikeFragment$key = {
  readonly " $data"?: LikeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LikeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LikeFragment",
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
      "name": "isLikedByViewer",
      "storageKey": null
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};

(node as any).hash = "7c54673ec18268c54b29b3720229a747";

export default node;
