import { expectType } from 'tsd';
import SetDraft, { type InferSetDraftValueType } from './SetDraft.ts';

const draft = new SetDraft<string>();
const valueType: InferSetDraftValueType<typeof draft> = undefined as any;

expectType<string>(valueType);
