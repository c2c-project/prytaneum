/**
 * @generated SignedSource<<0ec4379dbf0b4f5e47098ff5503c1bb0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventDetailsCardFragment$data = {
  readonly id: string;
  readonly title: string | null;
  readonly description: string | null;
  readonly " $fragmentType": "EventDetailsCardFragment";
};
export type EventDetailsCardFragment = EventDetailsCardFragment$data;
export type EventDetailsCardFragment$key = {
  readonly " $data"?: EventDetailsCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventDetailsCardFragment">;
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
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "865221d61780dc50e499786c19c574a2";

export default node;
