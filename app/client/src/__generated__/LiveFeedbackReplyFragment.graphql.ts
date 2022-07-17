/**
 * @generated SignedSource<<d8c5952a2cb611fe1de20d2644587ccb>>
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
  "argumentDefinitions": [],
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "LiveFeedbackAuthorFragment"
    }
  ],
  "type": "EventLiveFeedback",
  "abstractKey": null
};

(node as any).hash = "e028616ca10ae0413afa855c18cd2464";

export default node;
