import { expectType } from 'tsd';
import MapDraft, { type InferMapDraftKey, type InferMapDraftValue } from './MapDraft.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const draft = new MapDraft<string, number>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const keyType: InferMapDraftKey<typeof draft> = undefined as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valueType: InferMapDraftValue<typeof draft> = undefined as any;

expectType<string>(keyType);
expectType<number>(valueType);
