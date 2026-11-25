type InferMapDeltaKey<T extends MapDelta<unknown, unknown>> = T['~types']['key'];
type InferMapDeltaValue<T extends MapDelta<unknown, unknown>> = T['~types']['value'];

type MapDeltaEntry<K, V> = { type: 'clear' } | { type: 'delete'; key: K } | { type: 'set'; key: K; value: V };

type FauxMap<K, V> = {
  clear(): void;
  delete(key: K): void;
  set(key: K, value: V): void;
};

class MapDelta<K, V> {
  #entries: MapDeltaEntry<K, V>[] = [];

  get ['~types'](): { key: K; value: V } {
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

  playTo(map: FauxMap<K, V>) {
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

export default MapDelta;
export type { InferMapDeltaKey, InferMapDeltaValue };
