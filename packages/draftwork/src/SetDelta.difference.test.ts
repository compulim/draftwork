import { scenario } from '@testduet/given-when-then';
import assert from 'node:assert';
import * as NodeTest from 'node:test';
import SetDelta from './SetDelta.ts';

scenario(
  'SetDelta',
  bdd => {
    bdd
      .given("a base/expected of Set(['abc', 'xyz'])", () => {
        const base = new Set<string>(['abc', 'xyz']);
        const expected = new Set(base);

        return { base, expected };
      })
      .and('a delta', precondition => ({ ...precondition, delta: new SetDelta<string>() }))
      .and("with difference(['abc'])", precondition => {
        precondition.delta.difference(new Set(['abc']));
        precondition.expected = precondition.expected.difference(new Set(['abc']));

        return precondition;
      })
      .when('played', ({ base, delta }) => {
        const actual = new Set(base);

        delta.playTo(actual);

        return actual;
      })
      .then('should have played correctly', ({ expected }, actual) => {
        assert.deepStrictEqual(Array.from(actual), Array.from(expected));
      });
  },
  NodeTest
);
