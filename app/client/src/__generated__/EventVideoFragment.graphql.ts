/**
 * @generated SignedSource<<7ab43f273f868615b90de07a507f105d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
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
  "metadata": null,
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
    }
  ],
  "type": "Event",
  "abstractKey": null
};

(node as any).hash = "acc5636c631dd6f529095f96d1ef93c8";

export default node;
