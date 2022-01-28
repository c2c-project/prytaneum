/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type useLogoutMutationVariables = {};
export type useLogoutMutationResponse = {
    readonly logout: Date;
};
export type useLogoutMutation = {
    readonly response: useLogoutMutationResponse;
    readonly variables: useLogoutMutationVariables;
};



/*
mutation useLogoutMutation {
  logout
}
*/

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
(node as any).hash = 'ba07e160b7a78be6ff608276e9cb3baa';
export default node;
