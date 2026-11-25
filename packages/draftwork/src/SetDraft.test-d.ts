import { expectType } from 'tsd';
import SetDraft, { type InferSetDraftValue } from './SetDraft.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const draft = new SetDraft<string>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valueType: InferSetDraftValue<typeof draft> = undefined as any;

expectType<string>(valueType);
