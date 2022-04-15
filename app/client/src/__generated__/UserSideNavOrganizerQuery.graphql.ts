/**
 * @generated SignedSource<<3dc145980b50af819c5147a2eb272165>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserSideNavOrganizerQuery$variables = {};
export type UserSideNavOrganizerQueryVariables = UserSideNavOrganizerQuery$variables;
export type UserSideNavOrganizerQuery$data = {
  readonly isOrganizer: boolean;
};
export type UserSideNavOrganizerQueryResponse = UserSideNavOrganizerQuery$data;
export type UserSideNavOrganizerQuery = {
  variables: UserSideNavOrganizerQueryVariables;
  response: UserSideNavOrganizerQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isOrganizer",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserSideNavOrganizerQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserSideNavOrganizerQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2c3ed14fd9d4c8ee6d18bde4e155d9e5",
    "id": null,
    "metadata": {},
    "name": "UserSideNavOrganizerQuery",
    "operationKind": "query",
    "text": "query UserSideNavOrganizerQuery {\n  isOrganizer\n}\n"
  }
};
})();

(node as any).hash = "0b3884bad013d261422535c05390eb99";

export default node;
