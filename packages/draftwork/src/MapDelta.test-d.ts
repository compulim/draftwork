import { expectAssignable, expectType } from 'tsd';
import MapDelta, { type InferMapDeltaKey, type InferMapDeltaValue } from './MapDelta.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const delta = new MapDelta<string, number>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const keyType: InferMapDeltaKey<typeof delta> = undefined as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valueType: InferMapDeltaValue<typeof delta> = undefined as any;

expectType<string>(keyType);
expectType<number>(valueType);

expectAssignable<Parameters<typeof delta.playTo>[0]>({
  clear(): void {},
  delete(_key: string): void {},
  set(_key: string, _value: number): void {}
});

expectAssignable<Parameters<typeof delta.playTo>[0]>(new Map());
