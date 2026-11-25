import { scenario } from '@testduet/given-when-then';
import assert from 'node:assert';
import * as NodeTest from 'node:test';
import SetDraft from './SetDraft.ts';

scenario(
  'SetDraft',
  bdd => {
    bdd
      .given("a base/expected of Set(['abc', 'xyz'])", () => {
        const base = new Set<string>(['abc', 'xyz']);
        const expected = new Set(base);

        return { base, expected };
      })
      .and('a draft', precondition => ({ ...precondition, draft: new SetDraft<string>() }))
      .and("with delete('xyz')", precondition => {
        precondition.draft.delete('xyz');
        precondition.expected.delete('xyz');

        return precondition;
      })
      .when('played', ({ base, draft }) => {
        const actual = new Set(base);

        draft.playTo(actual);

        return actual;
      })
      .then('should have played properly', ({ expected }, actual) => {
        assert.deepStrictEqual(Array.from(actual), Array.from(expected));
        assert.deepStrictEqual(Array.from(actual), ['abc']);
      });

    bdd
      .given('a base/expected of empty Set', () => {
        const base = new Set<string>();
        const expected = new Set(base);

        return { base, expected };
      })
      .and('a draft', precondition => ({ ...precondition, draft: new SetDraft<string>() }))
      .and("with delete('xyz')", precondition => {
        precondition.draft.delete('xyz');
        precondition.expected.delete('xyz');

        return precondition;
      })
      .when('played', ({ base, draft }) => {
        const actual = new Set(base);

        try {
          draft.playTo(actual);
        } catch (error) {
          return error;
        }

        return undefined;
      })
      .then('should throw', (_, error) => {
        assert(error instanceof TypeError);
        assert(error.message.includes('non-existent'));
      });
  },
  NodeTest
);
