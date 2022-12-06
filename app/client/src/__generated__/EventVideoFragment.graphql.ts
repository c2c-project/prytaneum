/**
 * @generated SignedSource<<b345d7bbbae80295a234043dabc71d7b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventVideoFragment$data = {
  readonly videos: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly url: string;
        readonly lang: string;
      };
    }> | null;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "EventVideoFragment";
};
export type EventVideoFragment = EventVideoFragment$data;
export type EventVideoFragment$key = {
  readonly " $data"?: EventVideoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventVideoFragment">;
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
      "operation": require('./EventVideoRefetchQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "EventVideoFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "EventVideoConnection",
      "kind": "LinkedField",
      "name": "videos",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventVideoEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "EventVideo",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "lang",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "497d6ec5dcdba88a4e48b9d8a1bd419e";

export default node;
