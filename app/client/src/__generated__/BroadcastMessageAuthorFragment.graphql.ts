/**
 * @generated SignedSource<<abbc3113cdff287c714312ed60872d50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BroadcastMessageAuthorFragment$data = {
  readonly createdAt: Date | null;
  readonly createdBy: {
    readonly avatar: string | null;
    readonly firstName: string | null;
    readonly id: string;
    readonly lastName: string | null;
  } | null;
  readonly " $fragmentType": "BroadcastMessageAuthorFragment";
};
export type BroadcastMessageAuthorFragment$key = {
  readonly " $data"?: BroadcastMessageAuthorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BroadcastMessageAuthorFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BroadcastMessageAuthorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "createdBy",
      "plural": false,
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
          "name": "firstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "avatar",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "EventBroadcastMessage",
  "abstractKey": null
};

(node as any).hash = "b52e642a56e0622470b363d25f1b353b";

export default node;
