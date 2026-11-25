import { scenario } from '@testduet/given-when-then';
import assert from 'node:assert';
import * as NodeTest from 'node:test';
import SetDelta from './SetDelta.ts';

scenario(
  'SetDelta',
  bdd => {
    bdd
      .given('a delta', () => new SetDelta<string>())
      .when('played to an empty Set', delta => {
        const set = new Set<string>();
        const returnValue = delta.playTo(set);

        return { returnValue, set };
      })
      .then('should return the set', (_, { returnValue, set }) => {
        assert.strictEqual(returnValue, set);
      });
  },
  NodeTest
);
