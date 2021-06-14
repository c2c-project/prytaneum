/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LikeFragment = {
    readonly id: string;
    readonly isLikedByViewer: boolean | null;
    readonly " $refType": "LikeFragment";
};
export type LikeFragment$data = LikeFragment;
export type LikeFragment$key = {
    readonly " $data"?: LikeFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"LikeFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LikeFragment",
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
      "name": "isLikedByViewer",
      "storageKey": null
    }
  ],
  "type": "EventQuestion",
  "abstractKey": null
};
(node as any).hash = '7c54673ec18268c54b29b3720229a747';
export default node;
