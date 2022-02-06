/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type OrgListSubscriptionVariables = {};
export type OrgListSubscriptionResponse = {
    readonly orgUpdated: {
        readonly orgId: string;
    };
};
export type OrgListSubscription = {
    readonly response: OrgListSubscriptionResponse;
    readonly variables: OrgListSubscriptionVariables;
};



/*
subscription OrgListSubscription {
  orgUpdated {
    orgId
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "OrganizationSubscription",
    "kind": "LinkedField",
    "name": "orgUpdated",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "orgId",
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
    "name": "OrgListSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OrgListSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2d71d9e7d96d666ec3afae43d862aff4",
    "id": null,
    "metadata": {},
    "name": "OrgListSubscription",
    "operationKind": "subscription",
    "text": "subscription OrgListSubscription {\n  orgUpdated {\n    orgId\n  }\n}\n"
  }
};
})();
(node as any).hash = '9043447fdbbcb39351e9476faa870be5';
export default node;
