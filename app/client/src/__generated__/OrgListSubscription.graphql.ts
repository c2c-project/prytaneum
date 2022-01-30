/**
 * @generated SignedSource<<54b368183390607011713d053a840389>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type OrgListSubscription$variables = {};
export type OrgListSubscriptionVariables = OrgListSubscription$variables;
export type OrgListSubscription$data = {
  readonly orgUpdated: {
    readonly orgId: string;
  };
};
export type OrgListSubscriptionResponse = OrgListSubscription$data;
export type OrgListSubscription = {
  variables: OrgListSubscriptionVariables;
  response: OrgListSubscription$data;
};

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

(node as any).hash = "9043447fdbbcb39351e9476faa870be5";

export default node;
