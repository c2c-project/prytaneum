/**
 * @generated SignedSource<<594175b6859a23adc700c7d2ef2da97d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BroadcastMessageAuthorFragment$data = {
  readonly createdBy: {
    readonly id: string;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly avatar: string | null;
  } | null;
  readonly createdAt: Date | null;
  readonly " $fragmentType": "BroadcastMessageAuthorFragment";
};
export type BroadcastMessageAuthorFragment = BroadcastMessageAuthorFragment$data;
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
