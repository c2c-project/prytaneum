/**
 * @generated SignedSource<<794a3529ee116c2aee2310dae3e4378b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuoteFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment">;
  readonly " $fragmentType": "QuoteFragment";
};
export type QuoteFragment = QuoteFragment$data;
export type QuoteFragment$key = {
  readonly " $data"?: QuoteFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuoteFragment">;
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

(node as any).hash = "ab7d05c6a423d28cf8d30638659c8caf";

export default node;
