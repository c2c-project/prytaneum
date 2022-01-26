/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LiveFeedbackReplyFragment = {
    readonly id: string;
    readonly message: string;
    readonly " $fragmentRefs": FragmentRefs<"LiveFeedbackAuthorFragment">;
    readonly " $refType": "LiveFeedbackReplyFragment";
};
export type LiveFeedbackReplyFragment$data = LiveFeedbackReplyFragment;
export type LiveFeedbackReplyFragment$key = {
    readonly " $data"?: LiveFeedbackReplyFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"LiveFeedbackReplyFragment">;
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
(node as any).hash = 'e028616ca10ae0413afa855c18cd2464';
export default node;
