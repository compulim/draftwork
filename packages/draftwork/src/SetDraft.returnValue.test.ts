import { scenario } from '@testduet/given-when-then';
import assert from 'node:assert';
import * as NodeTest from 'node:test';
import SetDraft from './SetDraft.ts';

scenario(
  'SetDraft',
  bdd => {
    bdd
      .given('a draft', () => new SetDraft<string>())
      .when('played to an empty Set', draft => {
        const set = new Set<string>();
        const returnValue = draft.playTo(set);

        return { returnValue, set };
      })
      .then('should return the set', (_, { returnValue, set }) => {
        assert.strictEqual(returnValue, set);
      });
  },
  NodeTest
);
