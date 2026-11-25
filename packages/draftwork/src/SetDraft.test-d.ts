import { expectType } from 'tsd';
import SetDraft, { type InferSetDraftValue } from './SetDraft.ts';

const draft = new SetDraft<string>();
const valueType: InferSetDraftValue<typeof draft> = undefined as any;

expectType<string>(valueType);
