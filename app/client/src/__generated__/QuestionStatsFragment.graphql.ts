/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestionStatsFragment = {
    readonly id: string;
    readonly likedByCount: number | null;
    readonly " $refType": "QuestionStatsFragment";
};
export type QuestionStatsFragment$data = QuestionStatsFragment;
export type QuestionStatsFragment$key = {
    readonly " $data"?: QuestionStatsFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"QuestionStatsFragment">;
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
(node as any).hash = 'a77007bd3bf65f475f045ed79f6c70b2';
export default node;
