import { scenario } from '@testduet/given-when-then';
import assert from 'node:assert';
import * as NodeTest from 'node:test';
import SetDraft from './SetDraft.ts';

scenario(
  'SetDraft',
  bdd => {
    bdd
      .given('a draft', () => new SetDraft<string>())
      .when("['~types'] getter is called", draft => {
        return draft['~types'];
      })
      .then('should return a plain object', (_, returnValue) => {
        assert.strictEqual(Object.getPrototypeOf(returnValue), Object.prototype);
      });
  },
  NodeTest
);
