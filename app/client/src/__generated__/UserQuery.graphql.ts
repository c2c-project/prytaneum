/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserQueryVariables = {};
export type UserQueryResponse = {
    readonly me: {
        readonly id: string;
        readonly firstName: string | null;
        readonly lastName: string | null;
        readonly email: string | null;
    } | null;
};
export type UserQuery = {
    readonly response: UserQueryResponse;
    readonly variables: UserQueryVariables;
};



/*
query UserQuery {
  me {
    id
    firstName
    lastName
    email
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
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
        "name": "lastName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b08bd05921a08f192a2f766b9816a532",
    "id": null,
    "metadata": {},
    "name": "UserQuery",
    "operationKind": "query",
    "text": "query UserQuery {\n  me {\n    id\n    firstName\n    lastName\n    email\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c31f7c3cf026faec1343492868b94eec';
export default node;
