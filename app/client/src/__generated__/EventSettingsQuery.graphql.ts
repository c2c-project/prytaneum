/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EventSettingsQueryVariables = {
    input: string;
};
export type EventSettingsQueryResponse = {
    readonly eventById: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"EventDetails" | "EventSettings" | "SpeakerEventSettingsFragment" | "VideoEventSettingsFragment" | "EventModerators" | "GenericSettingsFragment">;
    } | null;
};
export type EventSettingsQuery = {
    readonly response: EventSettingsQueryResponse;
    readonly variables: EventSettingsQueryVariables;
};



/*
query EventSettingsQuery(
  $input: ID!
) {
  eventById(id: $input) {
    id
    ...EventDetails
    ...EventSettings
    ...SpeakerEventSettingsFragment
    ...VideoEventSettingsFragment
    ...EventModerators
    ...GenericSettingsFragment
  }
}

fragment EventDetails on Event {
  title
  topic
  description
  startDateTime
  endDateTime
  isActive
}

fragment EventModerators on Event {
  moderators {
    userId
    firstName
    lastName
    email
    avatar
  }
}

fragment EventSettings on Event {
  isQuestionFeedVisible
  isCollectRatingsEnabled
  isForumEnabled
  isPrivate
}

fragment GenericSettingsFragment on Event {
  id
  isQuestionFeedVisible
  isCollectRatingsEnabled
  isForumEnabled
  isPrivate
}

fragment SpeakerEventSettingsFragment on Event {
  id
  speakers {
    id
    eventId
    name
    title
    description
    pictureUrl
    email
  }
}

fragment VideoEventSettingsFragment on Event {
  id
  videos {
    id
    url
    lang
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
    "kind": "Variable",
    "name": "id",
    "variableName": "input"
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
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EventSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "eventById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EventDetails"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EventSettings"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SpeakerEventSettingsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "VideoEventSettingsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EventModerators"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GenericSettingsFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EventSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "eventById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "topic",
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "startDateTime",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "endDateTime",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isActive",
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EventSpeaker",
            "kind": "LinkedField",
            "name": "speakers",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "eventId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "pictureUrl",
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EventVideo",
            "kind": "LinkedField",
            "name": "videos",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "url",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lang",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "moderators",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "userId",
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
              (v5/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "eb51fdbc2416e1dfe29b1cf8206900e6",
    "id": null,
    "metadata": {},
    "name": "EventSettingsQuery",
    "operationKind": "query",
    "text": "query EventSettingsQuery(\n  $input: ID!\n) {\n  eventById(id: $input) {\n    id\n    ...EventDetails\n    ...EventSettings\n    ...SpeakerEventSettingsFragment\n    ...VideoEventSettingsFragment\n    ...EventModerators\n    ...GenericSettingsFragment\n  }\n}\n\nfragment EventDetails on Event {\n  title\n  topic\n  description\n  startDateTime\n  endDateTime\n  isActive\n}\n\nfragment EventModerators on Event {\n  moderators {\n    userId\n    firstName\n    lastName\n    email\n    avatar\n  }\n}\n\nfragment EventSettings on Event {\n  isQuestionFeedVisible\n  isCollectRatingsEnabled\n  isForumEnabled\n  isPrivate\n}\n\nfragment GenericSettingsFragment on Event {\n  id\n  isQuestionFeedVisible\n  isCollectRatingsEnabled\n  isForumEnabled\n  isPrivate\n}\n\nfragment SpeakerEventSettingsFragment on Event {\n  id\n  speakers {\n    id\n    eventId\n    name\n    title\n    description\n    pictureUrl\n    email\n  }\n}\n\nfragment VideoEventSettingsFragment on Event {\n  id\n  videos {\n    id\n    url\n    lang\n  }\n}\n"
  }
};
})();
(node as any).hash = '20bcfe626d1bc07dd614f576a4a58531';
export default node;
