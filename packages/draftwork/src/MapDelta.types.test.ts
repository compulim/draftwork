import { scenario } from '@testduet/given-when-then';
import assert from 'node:assert';
import * as NodeTest from 'node:test';
import MapDelta from './MapDelta.ts';

scenario(
  'MapDelta',
  bdd => {
    bdd
      .given('a delta', () => new MapDelta<string, number>())
      .when("['~types'] getter is called", delta => {
        return delta['~types'];
      })
      .then('should return a plain object', (_, returnValue) => {
        assert.strictEqual(Object.getPrototypeOf(returnValue), Object.prototype);
      });
  },
  NodeTest
);
