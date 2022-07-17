/**
 * @generated SignedSource<<5dd5df03eddf09cdae7f2b4c392faa08>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useLogoutMutation$variables = {};
export type useLogoutMutation$data = {
  readonly logout: Date;
};
export type useLogoutMutation = {
  response: useLogoutMutation$data;
  variables: useLogoutMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "logout",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useLogoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useLogoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "090144146caadd29830d3f83e31803a8",
    "id": null,
    "metadata": {},
    "name": "useLogoutMutation",
    "operationKind": "mutation",
    "text": "mutation useLogoutMutation {\n  logout\n}\n"
  }
};
})();

(node as any).hash = "ba07e160b7a78be6ff608276e9cb3baa";

export default node;
