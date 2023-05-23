/**
 * @generated SignedSource<<3db0d0d838714d6327d21c09988ac381>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useEventDetailsFragment$data = {
  readonly id: string;
  readonly title: string | null;
  readonly topic: string | null;
  readonly description: string | null;
  readonly startDateTime: Date | null;
  readonly endDateTime: Date | null;
  readonly isActive: boolean | null;
  readonly " $fragmentType": "useEventDetailsFragment";
};
export type useEventDetailsFragment = useEventDetailsFragment$data;
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
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "a13e385118bfbeea94c827c5a3a1e893";

export default node;
