/**
 * @generated SignedSource<<3bdb605e5161ffca38e8c81f808c6133>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EventDataFragment$data = {
  readonly liveFeedback: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly createdBy: {
          readonly firstName: string | null;
          readonly lastName: string | null;
          readonly email: string | null;
        } | null;
        readonly message: string;
      };
    }> | null;
  } | null;
  readonly questions: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly createdBy: {
          readonly firstName: string | null;
          readonly lastName: string | null;
          readonly email: string | null;
        } | null;
        readonly question: string | null;
      };
    }> | null;
  } | null;
  readonly " $fragmentType": "EventDataFragment";
};
export type EventDataFragment = EventDataFragment$data;
export type EventDataFragment$key = {
  readonly " $data"?: EventDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EventDataFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EventDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "EventLiveFeedbackConnection",
      "kind": "LinkedField",
      "name": "liveFeedback",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "EventLiveFeedbackEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "EventLiveFeedback",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "message",
                  "storageKey": null
                }
              ],
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
      "concreteType": "EventQuestionConnection",
      "kind": "LinkedField",
      "name": "questions",
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
              "concreteType": "EventQuestion",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "question",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
})();

(node as any).hash = "7279751c103b989032f1fe216cc864c8";

export default node;
