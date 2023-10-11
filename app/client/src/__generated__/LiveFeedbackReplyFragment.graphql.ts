/**
 * @generated SignedSource<<324ee14523ac9e40c87793bee3cc954e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LiveFeedbackReplyFragment$data = {
  readonly id: string;
  readonly message: string;
  readonly " $fragmentSpreads": FragmentRefs<"LiveFeedbackAuthorFragment">;
  readonly " $fragmentType": "LiveFeedbackReplyFragment";
};
export type LiveFeedbackReplyFragment$key = {
  readonly " $data"?: LiveFeedbackReplyFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LiveFeedbackReplyFragment">;
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
  "name": "LiveFeedbackReplyFragment",
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
      "name": "message",
      "storageKey": null
    },
    {
      "args": [
        {
          "kind": "Variable",
          "name": "eventId",
          "variableName": "eventId"
        }
      ],
      "kind": "FragmentSpread",
      "name": "LiveFeedbackAuthorFragment"
    }
  ],
  "type": "EventLiveFeedback",
  "abstractKey": null
};

(node as any).hash = "627e727cc1c7f1fbc55642077151d7f2";

export default node;
