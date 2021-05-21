/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OrgMemberListFragment = {
    readonly members: ReadonlyArray<{
        readonly userId: string;
        readonly firstName: string | null;
        readonly lastName: string | null;
    }> | null;
    readonly " $refType": "OrgMemberListFragment";
};
export type OrgMemberListFragment$data = OrgMemberListFragment;
export type OrgMemberListFragment$key = {
    readonly " $data"?: OrgMemberListFragment$data;
    readonly " $fragmentRefs": FragmentRefs<"OrgMemberListFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrgMemberListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "members",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "userId",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Organization",
  "abstractKey": null
};
(node as any).hash = '3a352f2b33c9facf71f5d11bc2b66e70';
export default node;
