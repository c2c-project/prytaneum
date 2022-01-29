/**
 * @generated SignedSource<<fa72f83c8cc8b5c28373d53527f640d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionActionsFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"QuoteFragment" | "LikeFragment" | "QueueButtonFragment">;
  readonly " $fragmentType": "QuestionActionsFragment";
};
export type QuestionActionsFragment = QuestionActionsFragment$data;
export type QuestionActionsFragment$key = {
  readonly " $data"?: QuestionActionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionActionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestionActionsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuoteFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LikeFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QueueButtonFragment"
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};

(node as any).hash = "fa1512172fd81210a0928ac95cd34c49";

export default node;
