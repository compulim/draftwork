import { expectAssignable, expectType } from 'tsd';
import SetDelta, { type InferSetDeltaValue } from './SetDelta.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const delta = new SetDelta<string>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valueType: InferSetDeltaValue<typeof delta> = undefined as any;

expectType<string>(valueType);

expectAssignable<Parameters<typeof delta.playTo>[0]>({
  [Symbol.iterator]() {
    return {
      next(): IteratorResult<string> {
        return { done: true, value: undefined };
      }
    };
  },
  add(_value: string): void {},
  clear(): void {},
  delete(_value: string): void {},
  has(_value: string): boolean {
    return false;
  }
});

expectAssignable<Parameters<typeof delta.playTo>[0]>(new Set());
