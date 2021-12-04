/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import {  } from "relay-runtime";
export type QuoteFragment = {
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment">;
    readonly " $refType": "QuoteFragment";
};
export type QuoteFragment$data = QuoteFragment;
export type QuoteFragment$key = {
    readonly " $data"?: QuoteFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"QuoteFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuoteFragment",
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
(node as any).hash = 'ab7d05c6a423d28cf8d30638659c8caf';
export default node;
