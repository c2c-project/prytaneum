/**
 * @generated SignedSource<<7f802842a054b6f092549f89e5b5c6d4>>
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
  readonly isActive: boolean | null;
  readonly isViewerModerator: boolean | null;
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
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "43c13ae5dd3db7282b05dfcdbefacddb";

export default node;
