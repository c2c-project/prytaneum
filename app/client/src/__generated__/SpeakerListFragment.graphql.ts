/**
 * @generated SignedSource<<454356a3284e08f387c58aced18234b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SpeakerListFragment$data = {
  readonly speakers: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly pictureUrl: string | null;
        readonly name: string | null;
        readonly description: string | null;
        readonly title: string | null;
      };
      readonly cursor: string;
    }> | null;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "SpeakerListFragment";
};
export type SpeakerListFragment = SpeakerListFragment$data;
export type SpeakerListFragment$key = {
  readonly " $data"?: SpeakerListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SpeakerListFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./SpeakerListRefetchQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "SpeakerListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "EventSpeakerConnection",
      "kind": "LinkedField",
      "name": "speakers",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventSpeakerEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "EventSpeaker",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "pictureUrl",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
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
                  "name": "title",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "4e24a9165c283d14e4233b854f4c0fd2";

export default node;
