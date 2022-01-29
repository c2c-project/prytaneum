/**
 * @generated SignedSource<<4285968b1cde4fe73fc5da036de973ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventSidebarFragment$data = {
  readonly id: string;
  readonly isQuestionFeedVisible: boolean | null;
  readonly isViewerModerator: boolean | null;
  readonly " $fragmentSpreads": FragmentRefs<"EventDetailsCardFragment" | "SpeakerListFragment" | "useQuestionListFragment" | "useLiveFeedbackListFragment" | "QuestionQueueFragment" | "QuestionCarouselFragment">;
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
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./EventSidebarRefetchable.graphql'),
      "identifierField": "id"
    }
  },
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

(node as any).hash = "58d200b5b5beb1453a5f8a158d8cdc6a";

export default node;
