/**
 * @generated SignedSource<<b3b27ee97519cc48be1c7ae33ae978ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventDetailsCardFragment$data = {
  readonly id: string;
  readonly title: string | null;
  readonly description: string | null;
  readonly startDateTime: Date | null;
  readonly endDateTime: Date | null;
  readonly " $fragmentType": "EventDetailsCardFragment";
};
export type EventDetailsCardFragment = EventDetailsCardFragment$data;
export type EventDetailsCardFragment$key = {
  readonly " $data"?: EventDetailsCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventDetailsCardFragment">;
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
      "operation": require('./EventDetailsCardRefetchQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "EventDetailsCardFragment",
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

(node as any).hash = "313ed1cb419c631e37e35aef7034117a";

export default node;
