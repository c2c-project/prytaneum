/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestionAuthorFragment = {
    readonly createdBy: {
        readonly id: string;
        readonly firstName: string | null;
        readonly avatar: string | null;
    } | null;
    readonly createdAt: Date | null;
    readonly " $refType": "QuestionAuthorFragment";
};
export type QuestionAuthorFragment$data = QuestionAuthorFragment;
export type QuestionAuthorFragment$key = {
    readonly " $data"?: QuestionAuthorFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"QuestionAuthorFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestionAuthorFragment",
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
  "type": "EventQuestion",
  "abstractKey": null
};
(node as any).hash = 'ceb68b6d1dc8416b91ca7a6ad567cfd7';
export default node;
