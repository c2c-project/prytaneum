/**
 * @generated SignedSource<<85382d3e5d816d757da632713aedc8bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type useEventUpdatesSubscription$variables = {
  userId: string;
};
export type useEventUpdatesSubscriptionVariables = useEventUpdatesSubscription$variables;
export type useEventUpdatesSubscription$data = {
  readonly eventUpdates: {
    readonly id: string;
    readonly title: string | null;
    readonly description: string | null;
    readonly startDateTime: Date | null;
    readonly endDateTime: Date | null;
    readonly isViewerModerator: boolean | null;
    readonly organization: {
      readonly name: string;
    } | null;
  };
};
export type useEventUpdatesSubscriptionResponse = useEventUpdatesSubscription$data;
export type useEventUpdatesSubscription = {
  variables: useEventUpdatesSubscriptionVariables;
  response: useEventUpdatesSubscription$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "userId",
    "variableName": "userId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startDateTime",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDateTime",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isViewerModerator",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useEventUpdatesSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "eventUpdates",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Organization",
            "kind": "LinkedField",
            "name": "organization",
            "plural": false,
            "selections": [
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useEventUpdatesSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "eventUpdates",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Organization",
            "kind": "LinkedField",
            "name": "organization",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "02a35f1e7b0d96709245ee041f1a5e5f",
    "id": null,
    "metadata": {},
    "name": "useEventUpdatesSubscription",
    "operationKind": "subscription",
    "text": "subscription useEventUpdatesSubscription(\n  $userId: ID!\n) {\n  eventUpdates(userId: $userId) {\n    id\n    title\n    description\n    startDateTime\n    endDateTime\n    isViewerModerator\n    organization {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3dd1158566498a01cdcd0a255015375a";

export default node;
