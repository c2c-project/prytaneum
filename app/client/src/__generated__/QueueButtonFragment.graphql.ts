/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueueButtonFragment = {
    readonly id: string;
    readonly position: number | null;
    readonly " $refType": "QueueButtonFragment";
};
export type QueueButtonFragment$data = QueueButtonFragment;
export type QueueButtonFragment$key = {
    readonly " $data"?: QueueButtonFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"QueueButtonFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QueueButtonFragment",
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
(node as any).hash = '8da31e831ff6489103abcad76f3299e6';
export default node;
