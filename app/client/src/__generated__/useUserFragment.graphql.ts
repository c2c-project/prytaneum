/**
 * @generated SignedSource<<762dc4efa7fb7f20d034b5b660bff306>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useUserFragment$data = {
  readonly avatar: string | null;
  readonly email: string | null;
  readonly firstName: string | null;
  readonly id: string;
  readonly isAdmin: boolean | null;
  readonly isOrganizer: boolean | null;
  readonly lastName: string | null;
  readonly " $fragmentType": "useUserFragment";
};
export type useUserFragment$key = {
  readonly " $data"?: useUserFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useUserFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUserFragment",
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
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOrganizer",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isAdmin",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "3867db5a02547bab9525888e5abdddba";

export default node;
