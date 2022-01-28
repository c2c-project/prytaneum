/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestionActionsFragment = {
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"QuoteFragment" | "LikeFragment" | "QueueButtonFragment">;
    readonly " $refType": "QuestionActionsFragment";
};
export type QuestionActionsFragment$data = QuestionActionsFragment;
export type QuestionActionsFragment$key = {
    readonly " $data"?: QuestionActionsFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"QuestionActionsFragment">;
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
(node as any).hash = 'fa1512172fd81210a0928ac95cd34c49';
export default node;
