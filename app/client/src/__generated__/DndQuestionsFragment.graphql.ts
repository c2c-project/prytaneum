/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DndQuestionsFragment = {
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"DraggableListFragment">;
    readonly " $refType": "DndQuestionsFragment";
};
export type DndQuestionsFragment$data = DndQuestionsFragment;
export type DndQuestionsFragment$key = {
    readonly " $data"?: DndQuestionsFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"DndQuestionsFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DndQuestionsFragment",
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
      "name": "DraggableListFragment"
    }
  ],
  "type": "Event",
  "abstractKey": null
};
(node as any).hash = 'cf3181e0c05d1b70690e218e9b398a6e';
export default node;
