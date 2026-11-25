import { scenario } from '@testduet/given-when-then';
import assert from 'node:assert';
import * as NodeTest from 'node:test';
import SetDraft from './SetDraft.ts';

scenario(
  'SetDraft',
  bdd => {
    bdd
      .given('a base/expected of empty Set', () => {
        const base = new Set<string>();
        const expected = new Set(base);

        return { base, expected };
      })
      .and('a draft', precondition => ({ ...precondition, draft: new SetDraft<string>() }))
      .and("with add('xyz')", precondition => {
        precondition.draft.add('xyz');
        precondition.expected.add('xyz');

        return precondition;
      })
      .when('played', ({ base, draft }) => {
        const actual = new Set(base);

        draft.playTo(actual);

        return actual;
      })
      .then('should have played properly', ({ expected }, actual) => {
        assert.deepStrictEqual(Array.from(actual), Array.from(expected));
        assert.deepStrictEqual(Array.from(actual), ['xyz']);
      });

    bdd
      .given("a base/expected of Set(['abc'])", () => {
        const base = new Set<string>(['abc']);
        const expected = new Set(base);

        return { base, expected };
      })
      .and('a draft', precondition => ({ ...precondition, draft: new SetDraft<string>() }))
      .and("with add('xyz')", precondition => {
        precondition.draft.add('xyz');
        precondition.expected.add('xyz');

        return precondition;
      })
      .when('played', ({ base, draft }) => {
        const actual = new Set(base);

        draft.playTo(actual);

        return actual;
      })
      .then('should have played properly', ({ expected }, actual) => {
        assert.deepStrictEqual(Array.from(actual), Array.from(expected));
        assert.deepStrictEqual(Array.from(actual), ['abc', 'xyz']);
      });

    bdd
      .given('a base/expected of empty Set', () => {
        const base = new Set<string>();
        const expected = new Set(base);

        return { base, expected };
      })
      .and('a draft', precondition => ({ ...precondition, draft: new SetDraft<string>() }))
      .and("with add('abc')", precondition => {
        precondition.draft.add('abc');
        precondition.expected.add('abc');

        return precondition;
      })
      .and("with add('xyz')", precondition => {
        precondition.draft.add('xyz');
        precondition.expected.add('xyz');

        return precondition;
      })
      .when('played', ({ base, draft }) => {
        const actual = new Set(base);

        draft.playTo(actual);

        return actual;
      })
      .then('should have played properly', ({ expected }, actual) => {
        assert.deepStrictEqual(Array.from(actual), Array.from(expected));
        assert.deepStrictEqual(Array.from(actual), ['abc', 'xyz']);
      });

    bdd
      .given("a base/expected of Set(['abc', 'xyz'])", () => {
        const base = new Set<string>(['abc', 'xyz']);
        const expected = new Set(base);

        return { base, expected };
      })
      .and('a draft', precondition => ({ ...precondition, draft: new SetDraft<string>() }))
      .and("with add('abc')", precondition => {
        precondition.draft.add('abc');
        precondition.expected.add('abc');

        return precondition;
      })
      .and("with delete('abc')", precondition => {
        precondition.draft.delete('abc');
        precondition.expected.delete('abc');

        return precondition;
      })
      .when('played', ({ base, draft }) => {
        const actual = new Set(base);

        draft.playTo(actual);

        return actual;
      })
      .then('should have played properly', ({ expected }, actual) => {
        assert.deepStrictEqual(Array.from(actual), Array.from(expected));
        assert.deepStrictEqual(Array.from(actual), ['xyz']);
      });
  },
  NodeTest
);
