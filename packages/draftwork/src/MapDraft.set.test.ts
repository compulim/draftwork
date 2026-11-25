import { scenario } from '@testduet/given-when-then';
import assert from 'node:assert';
import * as NodeTest from 'node:test';
import MapDraft from './MapDraft.ts';

scenario(
  'MapDraft',
  bdd => {
    bdd
      .given("a base/expected of Map([['ten', 10]])", () => {
        const base = new Map<string, number>([['ten', 10]]);
        const expected = new Map(base);

        return { base, expected };
      })
      .and('a draft', precondition => ({ ...precondition, draft: new MapDraft<string, number>() }))
      .and("with set('one', 1)", precondition => {
        precondition.draft.set('one', 1);
        precondition.expected.set('one', 1);

        return precondition;
      })
      .and("with set('two', 2)", precondition => {
        precondition.draft.set('two', 2);
        precondition.expected.set('two', 2);

        return precondition;
      })
      .when('played', ({ base, draft }) => {
        const actual = new Map(base);

        draft.playTo(actual);

        return actual;
      })
      .then('should have played correctly', ({ expected }, actual) => {
        assert.deepStrictEqual(Array.from(actual), Array.from(expected));
        assert.deepStrictEqual(Array.from(actual), [
          ['ten', 10],
          ['one', 1],
          ['two', 2]
        ]);
      });

    bdd
      .given("a base/expected of Map([['ten', 10]])", () => {
        const base = new Map<string, number>([['ten', 10]]);
        const expected = new Map(base);

        return { base, expected };
      })
      .and('a draft', precondition => ({ ...precondition, draft: new MapDraft<string, number>() }))
      .and("with set('one', 1)", precondition => {
        precondition.draft.set('one', 1);
        precondition.expected.set('one', 1);

        return precondition;
      })
      .and("with delete('one')", precondition => {
        precondition.draft.delete('one');
        precondition.expected.delete('one');

        return precondition;
      })
      .when('played', ({ base, draft }) => {
        const actual = new Map(base);

        draft.playTo(actual);

        return actual;
      })
      .then('should have played correctly', ({ expected }, actual) => {
        assert.deepStrictEqual(Array.from(actual), Array.from(expected));
        assert.deepStrictEqual(Array.from(actual), [['ten', 10]]);
      });

    bdd
      .given("a base/expected of Map([['ten', 10]])", () => {
        const base = new Map<string, number>([['ten', 10]]);
        const expected = new Map(base);

        return { base, expected };
      })
      .and('a draft', precondition => ({ ...precondition, draft: new MapDraft<string, number>() }))
      .and("with set('ten', 20)", precondition => {
        precondition.draft.set('ten', 20);
        precondition.expected.set('ten', 20);

        return precondition;
      })
      .when('played', ({ base, draft }) => {
        const actual = new Map(base);

        draft.playTo(actual);

        return actual;
      })
      .then('should have played correctly', ({ expected }, actual) => {
        assert.deepStrictEqual(Array.from(actual), Array.from(expected));
        assert.deepStrictEqual(Array.from(actual), [['ten', 20]]);
      });
  },
  NodeTest
);
