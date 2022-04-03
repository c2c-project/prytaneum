/**
 * @generated SignedSource<<b18e2503e04bd230133eb4602b4e2215>>
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
  readonly position: number | null;
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

(node as any).hash = "d696fb5604bca81c5acb324272b71e87";

export default node;
