/**
 * @generated SignedSource<<78af845a7564a3d9b3d8bf3eaf33ae9c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DashboardEventFragment$data = {
  readonly id: string;
  readonly description: string | null;
  readonly startDateTime: Date | null;
  readonly endDateTime: Date | null;
  readonly " $fragmentType": "DashboardEventFragment";
};
export type DashboardEventFragment = DashboardEventFragment$data;
export type DashboardEventFragment$key = {
  readonly " $data"?: DashboardEventFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DashboardEventFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DashboardEventFragment",
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
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startDateTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endDateTime",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "d022eba651c040a9c262de4720b18bcb";

export default node;
