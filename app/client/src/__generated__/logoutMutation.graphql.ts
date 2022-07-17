/**
 * @generated SignedSource<<6bae3440cbdd8405a5990636dcac11ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type logoutMutation$variables = {};
export type logoutMutation$data = {
  readonly logout: Date;
};
export type logoutMutation = {
  response: logoutMutation$data;
  variables: logoutMutation$variables;
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
    "name": "logoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "logoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "55ae640de6141494e2566463909fb569",
    "id": null,
    "metadata": {},
    "name": "logoutMutation",
    "operationKind": "mutation",
    "text": "mutation logoutMutation {\n  logout\n}\n"
  }
};
})();

(node as any).hash = "0b7b108a608e638ba4159d6195c03afe";

export default node;
