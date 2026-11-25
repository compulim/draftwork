type InferMapDraftKey<T extends MapDraft<unknown, unknown>> = T['~types']['key'];
type InferMapDraftValue<T extends MapDraft<unknown, unknown>> = T['~types']['value'];

type MapDraftEntry<K, V> = { type: 'clear' } | { type: 'delete'; key: K } | { type: 'set'; key: K; value: V };

class MapDraft<K, V> {
  #entries: MapDraftEntry<K, V>[] = [];

  get ['~types'](): {
    key: string;
    value: number;
  } {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {} as any;
  }

  clear() {
    this.#entries.push({ type: 'clear' });
  }

  delete(key: K) {
    this.#entries.push({ type: 'delete', key });
  }

  set(key: K, value: V) {
    this.#entries.push({ type: 'set', key, value });
  }

  playTo(map: Map<K, V>) {
    for (const entry of this.#entries) {
      switch (entry.type) {
        case 'clear':
          map.clear();
          break;

        case 'delete':
          map.delete(entry.key);
          break;

        case 'set':
          map.set(entry.key, entry.value);
          break;
      }
    }
  }
}

export default MapDraft;
export type { InferMapDraftKey, InferMapDraftValue };
