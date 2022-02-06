/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import {  } from "relay-runtime";
export type EventSidebarFragment = {
    readonly id: string;
    readonly isQuestionFeedVisible: boolean | null;
    readonly isViewerModerator: boolean | null;
    readonly " $fragmentRefs": FragmentRefs<"EventDetailsCardFragment" | "SpeakerListFragment" | "useQuestionListFragment" | "useQuestionQueueFragment" | "QuestionCarouselFragment" | "useLiveFeedbackListFragment">;
    readonly " $refType": "EventSidebarFragment";
};
export type EventSidebarFragment$data = EventSidebarFragment;
export type EventSidebarFragment$key = {
    readonly " $data"?: EventSidebarFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EventSidebarFragment">;
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
(node as any).hash = '882c8f632e9bc8e70e39f916c5230f67';
export default node;
