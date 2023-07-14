/**
 * @generated SignedSource<<c9ec76c0945ec3f289eb30dce09e878d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useEventDetailsFragment$data = {
  readonly description: string | null;
  readonly endDateTime: Date | null;
  readonly id: string;
  readonly isActive: boolean | null;
  readonly isPrivate: boolean | null;
  readonly isViewerInvited: boolean | null;
  readonly isViewerModerator: boolean | null;
  readonly startDateTime: Date | null;
  readonly title: string | null;
  readonly topic: string | null;
  readonly " $fragmentType": "useEventDetailsFragment";
};
export type useEventDetailsFragment$key = {
  readonly " $data"?: useEventDetailsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useEventDetailsFragment">;
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
      "operation": require('./UseEventDetailsRefetchQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "useEventDetailsFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isActive",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPrivate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isViewerInvited",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "073430a8907a2978ea1a975cf745f1fd";

export default node;
