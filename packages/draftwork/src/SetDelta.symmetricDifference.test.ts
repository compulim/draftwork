import { scenario } from '@testduet/given-when-then';
import assert from 'node:assert';
import * as NodeTest from 'node:test';
import SetDelta from './SetDelta.ts';

scenario(
  'SetDelta',
  bdd => {
    bdd
      .given("a base/expected of Set(['abc', 'def'])", () => {
        const base = new Set<string>(['abc', 'def']);
        const expected = new Set(base);

        return { base, expected };
      })
      .and('a delta', precondition => ({ ...precondition, delta: new SetDelta<string>() }))
      .and("with symmetricDifference(['def', 'xyz'])", precondition => {
        precondition.delta.symmetricDifference(new Set(['def', 'xyz']));
        precondition.expected = precondition.expected.symmetricDifference(new Set(['def', 'xyz']));

        return precondition;
      })
      .when('played', ({ base, delta }) => {
        const actual = new Set(base);

        delta.playTo(actual);

        return actual;
      })
      .then('should have played correctly', ({ expected }, actual) => {
        assert.deepStrictEqual(Array.from(actual), Array.from(expected));
        assert.deepStrictEqual(Array.from(actual), ['abc', 'xyz']);
      });
  },
  NodeTest
);
