import { scenario } from '@testduet/given-when-then';
import assert from 'node:assert';
import * as NodeTest from 'node:test';
import MapDelta from './MapDelta.ts';

scenario(
  'MapDelta',
  bdd => {
    bdd
      .given('a delta', () => new MapDelta<string, number>())
      .when('played to an empty Map', delta => {
        const map = new Map<string, number>();
        const returnValue = delta.playTo(map);

        return { returnValue, map };
      })
      .then('should return the set', (_, { returnValue, map }) => {
        assert.strictEqual(returnValue, map);
      });
  },
  NodeTest
);
