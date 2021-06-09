/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestionCardFragment = {
    readonly id: string;
    readonly question: string | null;
    readonly refQuestion: {
        readonly id: string;
        readonly question: string | null;
        readonly createdBy: {
            readonly id: string;
            readonly firstName: string | null;
        } | null;
        readonly createdAt: Date | null;
    } | null;
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
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "question",
  "storageKey": null
},
v2 = {
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestionCardFragment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "EventQuestion",
      "kind": "LinkedField",
      "name": "refQuestion",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    (v2/*: any*/),
    (v3/*: any*/)
  ],
  "type": "EventQuestion",
  "abstractKey": null
};
})();
(node as any).hash = '828abcf00441aadfbaf5a262f371dbf7';
export default node;
