/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EventVideoFragment = {
    readonly videos: {
        readonly edges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly url: string;
                readonly lang: string;
            };
        }> | null;
    } | null;
    readonly " $refType": "EventVideoFragment";
};
export type EventVideoFragment$data = EventVideoFragment;
export type EventVideoFragment$key = {
    readonly " $data"?: EventVideoFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"EventVideoFragment">;
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
(node as any).hash = 'acc5636c631dd6f529095f96d1ef93c8';
export default node;
