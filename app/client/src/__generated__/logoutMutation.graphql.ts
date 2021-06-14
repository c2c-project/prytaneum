/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type logoutMutationVariables = {};
export type logoutMutationResponse = {
    readonly logout: Date;
};
export type logoutMutation = {
    readonly response: logoutMutationResponse;
    readonly variables: logoutMutationVariables;
};



/*
mutation logoutMutation {
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
(node as any).hash = '0b7b108a608e638ba4159d6195c03afe';
export default node;
