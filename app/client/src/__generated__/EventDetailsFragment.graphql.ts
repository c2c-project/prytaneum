/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EventDetailsFragment = {
    readonly id: string;
    readonly title: string | null;
    readonly topic: string | null;
    readonly description: string | null;
    readonly startDateTime: Date | null;
    readonly endDateTime: Date | null;
    readonly " $refType": "EventDetailsFragment";
};
export type EventDetailsFragment$data = EventDetailsFragment;
export type EventDetailsFragment$key = {
    readonly " $data"?: EventDetailsFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"EventDetailsFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventDetailsFragment",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "topic",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startDateTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endDateTime",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
(node as any).hash = 'ceb7629e3d27bbf2f27a92f5fb046f8a';
export default node;
