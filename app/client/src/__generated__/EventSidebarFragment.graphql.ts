/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EventSidebarFragment = {
    readonly id: string;
    readonly isQuestionFeedVisible: boolean | null;
    readonly isViewerModerator: boolean | null;
    readonly " $fragmentRefs": FragmentRefs<"EventDetailsCardFragment" | "SpeakerListFragment" | "useQuestionListFragment">;
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
    }
  ],
  "type": "Event",
  "abstractKey": null
};
(node as any).hash = 'e1b23c76d3d01b049bef2d326e9cd718';
export default node;
