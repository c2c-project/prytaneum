/**
 * @generated SignedSource<<49f9c8134a43d1d38233582a4585398d>>
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
    readonly moderatorOf: boolean | null;
  } | null;
  readonly " $fragmentType": "LiveFeedbackAuthorFragment";
};
export type LiveFeedbackAuthorFragment$key = {
  readonly " $data"?: LiveFeedbackAuthorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveFeedbackAuthorFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "eventId"
    }
  ],
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
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "eventId",
              "variableName": "eventId"
            }
          ],
          "kind": "ScalarField",
          "name": "moderatorOf",
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

(node as any).hash = "d16b96759fa6467e03a8dc1d6f6e8f06";

export default node;
