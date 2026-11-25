import { scenario } from '@testduet/given-when-then';
import assert from 'node:assert';
import * as NodeTest from 'node:test';
import MapDelta from './MapDelta.ts';

scenario(
  'MapDelta',
  bdd => {
    bdd
      .given("a base/expected of Map([['ten', 10]])", () => {
        const base = new Map<string, number>([['ten', 10]]);
        const expected = new Map(base);

        return { base, expected };
      })
      .and('a delta', precondition => ({ ...precondition, delta: new MapDelta<string, number>() }))
      .and('with clear()', precondition => {
        precondition.delta.clear();
        precondition.expected.clear();

        return precondition;
      })
      .when('played', ({ base, delta }) => {
        const actual = new Map(base);

        delta.playTo(actual);

        return actual;
      })
      .then('should have played correctly', ({ expected }, actual) => {
        assert.deepStrictEqual(Array.from(actual), Array.from(expected));
        assert.deepStrictEqual(Array.from(actual), []);
      });
  },
  NodeTest
);
