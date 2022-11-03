/**
 * @generated SignedSource<<56afd4f1072592899294f743f2033fc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventSidebarFragment$data = {
  readonly id: string;
  readonly isQuestionFeedVisible: boolean | null;
  readonly isViewerModerator: boolean | null;
  readonly " $fragmentSpreads": FragmentRefs<"EventDetailsCardFragment" | "SpeakerListFragment" | "useQuestionListFragment" | "useBroadcastMessageListFragment" | "useQuestionQueueFragment" | "QuestionCarouselFragment" | "useLiveFeedbackListFragment">;
  readonly " $fragmentType": "EventSidebarFragment";
};
export type EventSidebarFragment = EventSidebarFragment$data;
export type EventSidebarFragment$key = {
  readonly " $data"?: EventSidebarFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventSidebarFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventSidebarFragment",
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
      "name": "isQuestionFeedVisible",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isViewerModerator",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EventDetailsCardFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SpeakerListFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useQuestionListFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useBroadcastMessageListFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useQuestionQueueFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuestionCarouselFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useLiveFeedbackListFragment"
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "f68d1931d7439c7876b93eae85ac6ccb";

export default node;
