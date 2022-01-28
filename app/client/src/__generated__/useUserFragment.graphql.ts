/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useUserFragment = {
    readonly id: string;
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly email: string | null;
    readonly avatar: string | null;
    readonly " $refType": "useUserFragment";
};
export type useUserFragment$data = useUserFragment;
export type useUserFragment$key = {
    readonly " $data"?: useUserFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"useUserFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUserFragment",
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
      "name": "lastName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
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
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'f8ea2f231ae159c7be5274b5493aa24d';
export default node;
