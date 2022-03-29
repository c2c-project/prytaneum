/**
 * @generated SignedSource<<8e49d97ee5375cc8b8ef125e27cb43f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "DeleteButtonFragment";
};
export type DeleteButtonFragment = DeleteButtonFragment$data;
export type DeleteButtonFragment$key = {
  readonly " $data"?: DeleteButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};

(node as any).hash = "96a5b35ed1f67b6ad9c6c7d1904e4d59";

export default node;
