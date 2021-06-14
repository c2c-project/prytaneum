/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestionActionsFragment = {
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"QuoteFragment" | "LikeFragment">;
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
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};
(node as any).hash = '2963ab406aaae685703284e9628d6911';
export default node;
