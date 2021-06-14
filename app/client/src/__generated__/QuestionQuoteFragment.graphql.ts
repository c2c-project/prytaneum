/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestionQuoteFragment = {
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment">;
    readonly " $refType": "QuestionQuoteFragment";
};
export type QuestionQuoteFragment$data = QuestionQuoteFragment;
export type QuestionQuoteFragment$key = {
    readonly " $data"?: QuestionQuoteFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"QuestionQuoteFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestionQuoteFragment",
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
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};
(node as any).hash = '85e67b878eb3892f2fbba32d08230ef8';
export default node;
