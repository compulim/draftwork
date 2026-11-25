import { expectType } from 'tsd';
import SetDelta, { type InferSetDeltaValue } from './SetDelta.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const delta = new SetDelta<string>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valueType: InferSetDeltaValue<typeof delta> = undefined as any;

expectType<string>(valueType);
