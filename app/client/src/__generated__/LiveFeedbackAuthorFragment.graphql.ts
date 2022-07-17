/**
 * @generated SignedSource<<c0af721bae96ce631e634c9f040995d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveFeedbackAuthorFragment$data = {
  readonly createdAt: Date | null;
  readonly createdBy: {
    readonly avatar: string | null;
    readonly firstName: string | null;
    readonly id: string;
    readonly lastName: string | null;
  } | null;
  readonly " $fragmentType": "LiveFeedbackAuthorFragment";
};
export type LiveFeedbackAuthorFragment$key = {
  readonly " $data"?: LiveFeedbackAuthorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveFeedbackAuthorFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveFeedbackAuthorFragment",
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
  "type": "EventLiveFeedback",
  "abstractKey": null
};

(node as any).hash = "a0a13d002b29cf7f098fd4cd05756b36";

export default node;
