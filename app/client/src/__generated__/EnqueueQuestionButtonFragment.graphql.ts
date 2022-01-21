/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import {  } from "relay-runtime";
export type EnqueueQuestionButtonFragment = {
    readonly id: string;
    readonly position: number | null;
    readonly " $refType": "EnqueueQuestionButtonFragment";
};
export type EnqueueQuestionButtonFragment$data = EnqueueQuestionButtonFragment;
export type EnqueueQuestionButtonFragment$key = {
    readonly " $data"?: EnqueueQuestionButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EnqueueQuestionButtonFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EnqueueQuestionButtonFragment",
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
      "name": "position",
      "storageKey": null
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};
(node as any).hash = '1b73974f75052b2103089ca59c56c8d5';
export default node;
