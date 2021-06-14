/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DraggableCardFragment = {
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment" | "QuestionStatsFragment">;
    readonly " $refType": "DraggableCardFragment";
};
export type DraggableCardFragment$data = DraggableCardFragment;
export type DraggableCardFragment$key = {
    readonly " $data"?: DraggableCardFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"DraggableCardFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DraggableCardFragment",
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
      "name": "QuestionAuthorFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuestionContentFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuestionStatsFragment"
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};
(node as any).hash = 'ecd1a19f8facc2e9bcd20acd489aad75';
export default node;
