/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type DeleteMember = {
    orgId: string;
    userId: string;
};
export type DeleteMemberMutationVariables = {
    input: DeleteMember;
};
export type DeleteMemberMutationResponse = {
    readonly deleteMember: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly id: string;
            readonly firstName: string | null;
            readonly lastName: string | null;
            readonly avatar: string | null;
        } | null;
    };
};
export type DeleteMemberMutation = {
    readonly response: DeleteMemberMutationResponse;
    readonly variables: DeleteMemberMutationVariables;
};



/*
mutation DeleteMemberMutation(
  $input: DeleteMember!
) {
  deleteMember(input: $input) {
    isError
    message
    body {
      id
      firstName
      lastName
      avatar
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UserMutationResponse",
    "kind": "LinkedField",
    "name": "deleteMember",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isError",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "body",
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
            "name": "avatar",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteMemberMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteMemberMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "adcb94ec39ec301ed140740d063affd8",
    "id": null,
    "metadata": {},
    "name": "DeleteMemberMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteMemberMutation(\n  $input: DeleteMember!\n) {\n  deleteMember(input: $input) {\n    isError\n    message\n    body {\n      id\n      firstName\n      lastName\n      avatar\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '751101c05acc276e8a21e40194ee5be7';
export default node;
