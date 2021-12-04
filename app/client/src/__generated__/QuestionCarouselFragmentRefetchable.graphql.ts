/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import {  } from "relay-runtime";
export type QuestionCarouselFragmentRefetchableVariables = {
    after?: string | null | undefined;
    first?: number | null | undefined;
    id: string;
};
export type QuestionCarouselFragmentRefetchableResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"QuestionCarouselFragment">;
    } | null;
};
export type QuestionCarouselFragmentRefetchable = {
    readonly response: QuestionCarouselFragmentRefetchableResponse;
    readonly variables: QuestionCarouselFragmentRefetchableVariables;
};



/*
query QuestionCarouselFragmentRefetchable(
  $after: String = ""
  $first: Int = 100
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...QuestionCarouselFragment_2HEEH6
    id
  }
}

fragment QuestionAuthorFragment on EventQuestion {
  createdBy {
    id
    firstName
    avatar
  }
  createdAt
}

fragment QuestionCarouselFragment_2HEEH6 on Event {
  id
  currentQuestion
  questionQueue {
    questionRecord(first: $first, after: $after) {
      edges {
        cursor
        node {
          position
          ...QuestionAuthorFragment
          ...QuestionContentFragment
          id
          __typename
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}

fragment QuestionContentFragment on EventQuestion {
  question
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": "",
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 100,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QuestionCarouselFragmentRefetchable",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": (v2/*: any*/),
            "kind": "FragmentSpread",
            "name": "QuestionCarouselFragment"
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
    "name": "QuestionCarouselFragmentRefetchable",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currentQuestion",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "EventQuestionQueue",
                "kind": "LinkedField",
                "name": "questionQueue",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": (v2/*: any*/),
                    "concreteType": "EventQuestionConnection",
                    "kind": "LinkedField",
                    "name": "questionRecord",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EventQuestionEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "cursor",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EventQuestion",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "position",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "User",
                                "kind": "LinkedField",
                                "name": "createdBy",
                                "plural": false,
                                "selections": [
                                  (v4/*: any*/),
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
                                    "name": "avatar",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "createdAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "question",
                                "storageKey": null
                              },
                              (v4/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageInfo",
                        "kind": "LinkedField",
                        "name": "pageInfo",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "endCursor",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "hasNextPage",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "ClientExtension",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__id",
                            "storageKey": null
                          }
                        ]
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v2/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "QuestionCarousel_questionRecord",
                    "kind": "LinkedHandle",
                    "name": "questionRecord"
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "Event",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3d9733b46a49b56ddc42a52dcc11ded2",
    "id": null,
    "metadata": {},
    "name": "QuestionCarouselFragmentRefetchable",
    "operationKind": "query",
    "text": "query QuestionCarouselFragmentRefetchable(\n  $after: String = \"\"\n  $first: Int = 100\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...QuestionCarouselFragment_2HEEH6\n    id\n  }\n}\n\nfragment QuestionAuthorFragment on EventQuestion {\n  createdBy {\n    id\n    firstName\n    avatar\n  }\n  createdAt\n}\n\nfragment QuestionCarouselFragment_2HEEH6 on Event {\n  id\n  currentQuestion\n  questionQueue {\n    questionRecord(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          position\n          ...QuestionAuthorFragment\n          ...QuestionContentFragment\n          id\n          __typename\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment QuestionContentFragment on EventQuestion {\n  question\n}\n"
  }
};
})();
(node as any).hash = '83e92b6754fa8996590a9319134e91f7';
export default node;
