/**
 * @generated SignedSource<<cf3e6420c69d3b2cb5cd4d62d4e56d9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionAuthorFragment$data = {
  readonly createdBy: {
    readonly id: string;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly avatar: string | null;
  } | null;
  readonly createdAt: Date | null;
  readonly " $fragmentType": "QuestionAuthorFragment";
};
export type QuestionAuthorFragment = QuestionAuthorFragment$data;
export type QuestionAuthorFragment$key = {
  readonly " $data"?: QuestionAuthorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuestionAuthorFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestionAuthorFragment",
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
  "type": "EventQuestion",
  "abstractKey": null
};

(node as any).hash = "07cc8aa9d42b1b0fe1513e088f57ce1b";

export default node;
