/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestionContentFragment = {
    readonly question: string | null;
    readonly " $refType": "QuestionContentFragment";
};
export type QuestionContentFragment$data = QuestionContentFragment;
export type QuestionContentFragment$key = {
    readonly " $data"?: QuestionContentFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"QuestionContentFragment">;
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
(node as any).hash = '49501bed56c03a6d39599b94990e6603';
export default node;
