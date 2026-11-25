type InferSetDeltaValue<T extends SetDelta<unknown>> = T['~types']['value'];

type SetDeltaEntry<T> =
  | { type: 'add'; value: T }
  | { type: 'clear' }
  | { type: 'delete'; value: T }
  | { type: 'difference'; other: Set<T> }
  | { type: 'intersection'; other: Set<T> }
  | { type: 'symmetricDifference'; other: Set<T> }
  | { type: 'union'; other: Set<T> };

type FauxSet<T> = {
  add(value: T): void;
  clear(): void;
  delete(value: T): void;
  has(value: T): boolean;
} & Iterable<T>;

class SetDelta<T> {
  #log: SetDeltaEntry<T>[] = [];

  get ['~types'](): { value: T } {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {} as any;
  }

  add(value: T) {
    this.#log.push({ type: 'add', value });
  }

  clear() {
    this.#log.push({ type: 'clear' });
  }

  delete(value: T) {
    this.#log.push({ type: 'delete', value });
  }

  difference(other: Set<T>) {
    this.#log.push({ type: 'difference', other });
  }

  intersection(other: Set<T>) {
    this.#log.push({ type: 'intersection', other });
  }

  symmetricDifference(other: Set<T>) {
    this.#log.push({ type: 'symmetricDifference', other });
  }

  union(other: Set<T>) {
    this.#log.push({ type: 'union', other });
  }

  playTo<TSet extends FauxSet<T>>(set: TSet): TSet {
    for (const entry of this.#log) {
      switch (entry.type) {
        case 'add':
          set.add(entry.value);
          break;

        case 'clear':
          set.clear();
          break;

        case 'delete':
          set.delete(entry.value);
          break;

        case 'difference':
          for (const value of entry.other) {
            set.delete(value);
          }

          break;

        case 'intersection':
          for (const value of set) {
            if (!entry.other.has(value)) {
              set.delete(value);
            }
          }

          break;

        case 'symmetricDifference':
          for (const value of entry.other) {
            if (set.has(value)) {
              set.delete(value);
            } else {
              set.add(value);
            }
          }

          break;

        case 'union':
          for (const value of entry.other) {
            set.add(value);
          }

          break;
      }
    }

    return set;
  }
}

export default SetDelta;
export { type InferSetDeltaValue };
