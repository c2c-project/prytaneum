/**
 * @generated SignedSource<<0e3e12f23cbf54fd19b9074cb6e03ffa>>
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
  readonly position: string;
  readonly " $fragmentType": "DeleteButtonFragment";
};
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
