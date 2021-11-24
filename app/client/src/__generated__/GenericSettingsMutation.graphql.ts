/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import {  } from "relay-runtime";
export type UpdateEvent = {
<<<<<<< HEAD
<<<<<<< HEAD
    description?: string | null | undefined;
    endDateTime?: Date | null | undefined;
    eventId: string;
    isCollectRatingsEnabled?: boolean | null | undefined;
    isForumEnabled?: boolean | null | undefined;
    isPrivate?: boolean | null | undefined;
    isQuestionFeedVisible?: boolean | null | undefined;
    startDateTime?: Date | null | undefined;
    title?: string | null | undefined;
    topic?: string | null | undefined;
=======
=======
>>>>>>> chore(project): updated generation
    description?: string | null;
    endDateTime?: Date | null;
    eventId: string;
    isCollectRatingsEnabled?: boolean | null;
    isForumEnabled?: boolean | null;
    isPrivate?: boolean | null;
    isQuestionFeedVisible?: boolean | null;
    startDateTime?: Date | null;
    title?: string | null;
    topic?: string | null;
<<<<<<< HEAD
>>>>>>> chore(project): updated generation
=======
>>>>>>> chore(project): updated generation
};
export type GenericSettingsMutationVariables = {
    input: UpdateEvent;
};
export type GenericSettingsMutationResponse = {
    readonly updateEvent: {
        readonly isError: boolean;
        readonly message: string;
        readonly body: {
            readonly " $fragmentRefs": FragmentRefs<"GenericSettingsFragment">;
        } | null;
    };
};
export type GenericSettingsMutation = {
    readonly response: GenericSettingsMutationResponse;
    readonly variables: GenericSettingsMutationVariables;
};



/*
mutation GenericSettingsMutation(
  $input: UpdateEvent!
) {
  updateEvent(event: $input) {
    isError
    message
    body {
      ...GenericSettingsFragment
      id
    }
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isError",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
};
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
        "concreteType": "EventMutationResponse",
        "kind": "LinkedField",
        "name": "updateEvent",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Event",
            "kind": "LinkedField",
            "name": "body",
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
        "concreteType": "EventMutationResponse",
        "kind": "LinkedField",
        "name": "updateEvent",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Event",
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7f951762c717982d1f177282a0f23297",
    "id": null,
    "metadata": {},
    "name": "GenericSettingsMutation",
    "operationKind": "mutation",
    "text": "mutation GenericSettingsMutation(\n  $input: UpdateEvent!\n) {\n  updateEvent(event: $input) {\n    isError\n    message\n    body {\n      ...GenericSettingsFragment\n      id\n    }\n  }\n}\n\nfragment GenericSettingsFragment on Event {\n  id\n  isQuestionFeedVisible\n  isCollectRatingsEnabled\n  isForumEnabled\n  isPrivate\n}\n"
  }
};
})();
(node as any).hash = 'd0fd6b5cf844706def65f9f1269638a1';
export default node;
