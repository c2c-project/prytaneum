/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EventDetailsCardFragment = {
    readonly id: string;
    readonly title: string | null;
    readonly topic: string | null;
    readonly description: string | null;
    readonly " $refType": "EventDetailsCardFragment";
};
export type EventDetailsCardFragment$data = EventDetailsCardFragment;
export type EventDetailsCardFragment$key = {
    readonly " $data"?: EventDetailsCardFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"EventDetailsCardFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventDetailsCardFragment",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "topic",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
(node as any).hash = 'f9a4117a4067d382d100f75a69edb731';
export default node;
