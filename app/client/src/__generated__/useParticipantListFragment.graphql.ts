/**
 * @generated SignedSource<<a271cda1e5bc9a3bd888c509e93fbbe1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useParticipantListFragment$data = {
  readonly id: string;
  readonly participants: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly isMuted: boolean;
        readonly user: {
          readonly firstName: string | null;
          readonly id: string;
          readonly lastName: string | null;
          readonly moderatorOf: boolean | null;
        };
      };
    }> | null;
    readonly pageInfo: {
      readonly endCursor: string | null;
      readonly hasNextPage: boolean;
    };
  } | null;
  readonly " $fragmentType": "useParticipantListFragment";
};
export type useParticipantListFragment$key = {
  readonly " $data"?: useParticipantListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"useParticipantListFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "eventId"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./UseParticipantListRefetchQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "useParticipantListFragment",
  "selections": [
    {
      "alias": null,
      "args": [
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
      "concreteType": "EventParticipantConnection",
      "kind": "LinkedField",
      "name": "participants",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventParticipantEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "EventParticipant",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "user",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
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
                      "args": [
                        {
                          "kind": "Variable",
                          "name": "eventId",
                          "variableName": "eventId"
                        }
                      ],
                      "kind": "ScalarField",
                      "name": "moderatorOf",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isMuted",
                  "storageKey": null
                }
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
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "c8e724f9deba4cd044ba8fddd9a23978";

export default node;
