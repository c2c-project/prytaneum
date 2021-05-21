/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpdateEvent = {
    title?: string | null;
    startDateTime?: Date | null;
    endDateTime?: Date | null;
    description?: string | null;
    topic?: string | null;
    isQuestionFeedVisible?: boolean | null;
    isCollectRatingsEnabled?: boolean | null;
    isForumEnabled?: boolean | null;
    isPrivate?: boolean | null;
    id: string;
};
export type GenericSettingsMutationVariables = {
    input?: UpdateEvent | null;
};
export type GenericSettingsMutationResponse = {
    readonly updateEvent: {
        readonly " $fragmentRefs": FragmentRefs<"GenericSettingsFragment">;
    } | null;
};
export type GenericSettingsMutation = {
    readonly response: GenericSettingsMutationResponse;
    readonly variables: GenericSettingsMutationVariables;
};



/*
mutation GenericSettingsMutation(
  $input: UpdateEvent
) {
  updateEvent(event: $input) {
    ...GenericSettingsFragment
    id
  }
}

fragment GenericSettingsFragment on Event {
  id
  isQuestionFeedVisible
  isCollectRatingsEnabled
  isForumEnabled
  isPrivate
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
    "kind": "Variable",
    "name": "event",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GenericSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "updateEvent",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GenericSettingsFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GenericSettingsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "updateEvent",
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
            "name": "isQuestionFeedVisible",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isCollectRatingsEnabled",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isForumEnabled",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isPrivate",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "844c0b7a37ac0339d3150c4175f538bf",
    "id": null,
    "metadata": {},
    "name": "GenericSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GenericSettingsMutation(\n  $input: UpdateEvent\n) {\n  updateEvent(event: $input) {\n    ...GenericSettingsFragment\n    id\n  }\n}\n\nfragment GenericSettingsFragment on Event {\n  id\n  isQuestionFeedVisible\n  isCollectRatingsEnabled\n  isForumEnabled\n  isPrivate\n}\n"
  }
};
})();
(node as any).hash = 'e726b547ccf3ceba3d14ede7849cbee4';
export default node;
