/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type VideoEventSettingsFragment = {
    readonly id: string;
    readonly videos: ReadonlyArray<{
        readonly id: string;
        readonly url: string;
        readonly lang: string;
    }> | null;
    readonly " $refType": "VideoEventSettingsFragment";
};
export type VideoEventSettingsFragment$data = VideoEventSettingsFragment;
export type VideoEventSettingsFragment$key = {
    readonly " $data"?: VideoEventSettingsFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"VideoEventSettingsFragment">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VideoEventSettingsFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "EventVideo",
      "kind": "LinkedField",
      "name": "videos",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lang",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();
(node as any).hash = 'e51c9aac0b18c32fc033026f48ac9dd9';
export default node;
