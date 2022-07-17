/**
 * @generated SignedSource<<f9f0f2078a8c8b56149c26ca50fa8092>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionContentFragment$data = {
  readonly question: string | null;
  readonly " $fragmentType": "QuestionContentFragment";
};
export type QuestionContentFragment$key = {
  readonly " $data"?: QuestionContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestionContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "question",
      "storageKey": null
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};

(node as any).hash = "49501bed56c03a6d39599b94990e6603";

export default node;
