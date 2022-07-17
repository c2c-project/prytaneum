/**
 * @generated SignedSource<<263ff3dce6ccaf4ad8e001a62cb8b013>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionStatsFragment$data = {
  readonly id: string;
  readonly likedByCount: number | null;
  readonly " $fragmentType": "QuestionStatsFragment";
};
export type QuestionStatsFragment$key = {
  readonly " $data"?: QuestionStatsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionStatsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestionStatsFragment",
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
      "name": "likedByCount",
      "storageKey": null
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};

(node as any).hash = "a77007bd3bf65f475f045ed79f6c70b2";

export default node;
