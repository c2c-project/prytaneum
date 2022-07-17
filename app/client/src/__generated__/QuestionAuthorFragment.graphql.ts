/**
 * @generated SignedSource<<1d6a4aedd6c765825cabf13d58b7ccf0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuestionAuthorFragment$data = {
  readonly createdAt: Date | null;
  readonly createdBy: {
    readonly avatar: string | null;
    readonly firstName: string | null;
    readonly id: string;
    readonly lastName: string | null;
  } | null;
  readonly " $fragmentType": "QuestionAuthorFragment";
};
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
