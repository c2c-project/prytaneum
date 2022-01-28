/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EventSidebarFragment = {
    readonly id: string;
    readonly isQuestionFeedVisible: boolean | null;
    readonly isViewerModerator: boolean | null;
    readonly " $fragmentRefs": FragmentRefs<"EventDetailsCardFragment" | "SpeakerListFragment" | "useQuestionListFragment" | "useLiveFeedbackListFragment" | "QuestionQueueFragment" | "QuestionCarouselFragment">;
    readonly " $refType": "EventSidebarFragment";
};
export type EventSidebarFragment$data = EventSidebarFragment;
export type EventSidebarFragment$key = {
    readonly " $data"?: EventSidebarFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"EventSidebarFragment">;
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
      "operation": require('./EventSidebarRefetchable.graphql.ts'),
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
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1000
        }
      ],
      "kind": "FragmentSpread",
      "name": "useQuestionListFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useLiveFeedbackListFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuestionQueueFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuestionCarouselFragment"
    }
  ],
  "type": "Event",
  "abstractKey": null
};
(node as any).hash = '58d200b5b5beb1453a5f8a158d8cdc6a';
export default node;
