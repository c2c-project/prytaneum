/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestionCardFragment = {
    readonly id: string;
    readonly question: string | null;
    readonly createdBy: {
        readonly id: string;
        readonly firstName: string | null;
    } | null;
    readonly createdAt: Date | null;
    readonly " $refType": "QuestionCardFragment";
};
export type QuestionCardFragment$data = QuestionCardFragment;
export type QuestionCardFragment$key = {
    readonly " $data"?: QuestionCardFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"QuestionCardFragment">;
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
  "metadata": null,
  "name": "QuestionCardFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "question",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "createdBy",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "firstName",
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
})();
(node as any).hash = 'ef0a497431ff2d2f71fb81146acd346e';
export default node;
