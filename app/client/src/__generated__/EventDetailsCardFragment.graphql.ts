/**
 * @generated SignedSource<<57799113975d149aa31070abb6abf24b>>
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
  readonly startDateTime: Date | null;
  readonly endDateTime: Date | null;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startDateTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endDateTime",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "ae3a9a413619b0f8684d73e066c4290e";

export default node;
