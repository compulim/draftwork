import { scenario } from '@testduet/given-when-then';
import assert from 'node:assert';
import * as NodeTest from 'node:test';
import SetDraft from './SetDraft.ts';

scenario(
  'SetDraft',
  bdd => {
    bdd
      .given("a base/expected of Set(['abc', 'def'])", () => {
        const base = new Set<string>(['abc', 'def']);
        const expected = new Set(base);

        return { base, expected };
      })
      .and('a draft', precondition => ({ ...precondition, draft: new SetDraft<string>() }))
      .and("with intersection(['def', 'xyz'])", precondition => {
        precondition.draft.intersection(new Set(['def', 'xyz']));
        precondition.expected = precondition.expected.intersection(new Set(['def', 'xyz']));

        return precondition;
      })
      .when('played', ({ base, draft }) => {
        const actual = new Set(base);

        draft.playTo(actual);

        return actual;
      })
      .then('should have played correctly', ({ expected }, actual) => {
        assert.deepStrictEqual(Array.from(actual), Array.from(expected));
      });
  },
  NodeTest
);
