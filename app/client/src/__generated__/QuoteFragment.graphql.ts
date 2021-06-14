/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuoteFragment = {
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"QuestionCardFragment">;
    readonly " $refType": "QuoteFragment";
};
export type QuoteFragment$data = QuoteFragment;
export type QuoteFragment$key = {
    readonly " $data"?: QuoteFragment$data;
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
      "name": "QuestionCardFragment"
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};
(node as any).hash = '0eba9155c131bb028f9a7594e5227923';
export default node;
