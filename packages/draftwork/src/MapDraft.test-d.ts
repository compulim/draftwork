import { expectType } from 'tsd';
import MapDraft, { type InferMapDraftKey, type InferMapDraftValue } from './MapDraft.ts';

const draft = new MapDraft<string, number>();
const keyType: InferMapDraftKey<typeof draft> = undefined as any;
const valueType: InferMapDraftValue<typeof draft> = undefined as any;

expectType<string>(keyType);
expectType<number>(valueType);
