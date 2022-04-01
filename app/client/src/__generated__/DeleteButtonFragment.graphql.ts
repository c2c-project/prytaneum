/**
 * @generated SignedSource<<7e2b91408ecf5ac5f14401484db107c2>>
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
  readonly isVisible: boolean | null;
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
      "name": "isVisible",
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

(node as any).hash = "27e144383fa5bcf45e730a8a20c5812f";

export default node;
