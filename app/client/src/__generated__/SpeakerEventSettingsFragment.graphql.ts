/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SpeakerEventSettingsFragment = {
    readonly id: string;
    readonly speakers: ReadonlyArray<{
        readonly id: string;
        readonly eventId: string | null;
        readonly name: string | null;
        readonly title: string | null;
        readonly description: string | null;
        readonly pictureUrl: string | null;
        readonly email: string | null;
    }> | null;
    readonly " $refType": "SpeakerEventSettingsFragment";
};
export type SpeakerEventSettingsFragment$data = SpeakerEventSettingsFragment;
export type SpeakerEventSettingsFragment$key = {
    readonly " $data"?: SpeakerEventSettingsFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"SpeakerEventSettingsFragment">;
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
  "name": "SpeakerEventSettingsFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "EventSpeaker",
      "kind": "LinkedField",
      "name": "speakers",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "eventId",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "pictureUrl",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
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
(node as any).hash = 'af790867f22a2fed3fc16f1f7d251184';
export default node;
