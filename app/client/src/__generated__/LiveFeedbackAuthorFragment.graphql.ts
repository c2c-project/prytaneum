/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LiveFeedbackAuthorFragment = {
    readonly createdBy: {
        readonly id: string;
        readonly firstName: string | null;
        readonly avatar: string | null;
    } | null;
    readonly createdAt: Date | null;
    readonly " $refType": "LiveFeedbackAuthorFragment";
};
export type LiveFeedbackAuthorFragment$data = LiveFeedbackAuthorFragment;
export type LiveFeedbackAuthorFragment$key = {
    readonly " $data"?: LiveFeedbackAuthorFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"LiveFeedbackAuthorFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LiveFeedbackAuthorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "createdBy",
      "plural": false,
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
          "name": "firstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "avatar",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "EventLiveFeedback",
  "abstractKey": null
};
(node as any).hash = '5c8dee6dfe33b3d94fe26e813e4071b8';
export default node;
