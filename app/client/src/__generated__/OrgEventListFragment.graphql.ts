/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OrgEventListFragment = {
    readonly events: ReadonlyArray<{
        readonly id: string;
        readonly title: string | null;
        readonly topic: string | null;
        readonly startDateTime: Date | null;
    }> | null;
    readonly " $refType": "OrgEventListFragment";
};
export type OrgEventListFragment$data = OrgEventListFragment;
export type OrgEventListFragment$key = {
    readonly " $data"?: OrgEventListFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"OrgEventListFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrgEventListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Event",
      "kind": "LinkedField",
      "name": "events",
      "plural": true,
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
          "name": "startDateTime",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Organization",
  "abstractKey": null
};
(node as any).hash = 'd7c014f27559f8c18b0b57bee340184b';
export default node;
