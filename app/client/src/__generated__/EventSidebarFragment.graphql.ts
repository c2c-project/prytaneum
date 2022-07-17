/**
 * @generated SignedSource<<ab63a300087160d489e1a20ce03ac0e9>>
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
  readonly " $fragmentSpreads": FragmentRefs<"QuestionCarouselFragment" | "SpeakerListFragment" | "useBroadcastMessageListFragment" | "useLiveFeedbackListFragment" | "useQuestionListFragment" | "useQuestionQueueFragment">;
  readonly " $fragmentType": "EventSidebarFragment";
};
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

(node as any).hash = "94c28af07b7f3d9989d86da15aca26e6";

export default node;
