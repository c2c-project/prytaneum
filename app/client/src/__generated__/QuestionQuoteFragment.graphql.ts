/**
 * @generated SignedSource<<f68ca7ceaabf664a25ec76dd418ca70e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionQuoteFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionAuthorFragment" | "QuestionContentFragment">;
  readonly " $fragmentType": "QuestionQuoteFragment";
};
export type QuestionQuoteFragment = QuestionQuoteFragment$data;
export type QuestionQuoteFragment$key = {
  readonly " $data"?: QuestionQuoteFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionQuoteFragment">;
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

(node as any).hash = "85e67b878eb3892f2fbba32d08230ef8";

export default node;
