# `draftwork`

> This package is built from ground up following strict test driven development principle.

Pass delta, don't pass complete picture.

## Background

Handling `Map`/`Set` immutable objects with 10,000+ entries and high change frequency is expensive.

We rethink the pattern: if SDK owns a copy of the object private to itself, it does not need to make the object perfectly immutable.

## How to use?

Instead of passing the whole `Map`/`Set` object, caller constructs a `XXXDelta` object, pass it to SDK. As long as both caller and SDK are in-sync, SDK should own a copy of `Map`/`Set` object with the cost of `O(log n)`.

```ts
const delta = new SetDelta();

delta.add('Buy eggs');
delta.add('Check mailbox');

callSDK(delta);
```

Then, on SDK side.

```ts
const set = new Set();

function callSDK(delta) {
  delta.playTo(set);

  // Process the set.
}
```

## API

```ts
class MapDelta<K, V> {
  clear(): void;
  delete(key: K): void;
  set(key: K, value: V): void;
  playTo(map: Map<K, V>): void;
}

class SetDelta<T> {
  add(value: T): void;
  clear(): void;
  delete(value: T): void;
  difference(other: Set<T>): void;
  intersection(other: Set<T>): void;
  symmetricDifference(other: Set<T>): void;
  union(other: Set<T>): void;
  playTo(set: Set<T>): Set<T>;
}
```

## Design

### Immutability is great

Immutability is great for SDK, it lockdown input and output, and simplify equality checks. However, it requires cloning and freezing. This could be expensive at times.

Note: JavaScript built-in `Map`/`Set` cannot be frozen, extra work is needed.

### Solution

Pass the delta, don't pass the complete picture.

- (Optional) Caller has their own copy of data, build from scratch
- Caller draft the change as delta (multiple `add`/`delete`/`set`, etc.)
- (Optional) Caller apply the delta to its own copy
- Caller pass the delta to SDK
- SDK build their own complete copy from scratch too
- SDK apply the delta to its own copy (cheaper than clone/freeze)
- (Optional) To maintain perfect immutability, SDK clone/freeze upserted elements

Memory stay `O(n)`. Processing down to `O(log n)` from `O(n)`.

Each side owns its complete copy, it don't cross the border. Deltas are drafted and replayed on each side.

## Behaviors

### How to inspect changes inside the `XXXDelta` object?

1. Implement your own `Map`/`Set` class minimally
   - `Pick<Map<K, V>, 'clear' | 'delete' | 'set'>`
   - `Pick<Set<T>, 'add' | 'clear' | 'delete'>`
2. Run `delta.playTo(yourImpl)`, see how the delta object call your implementation

### SDK need to expose the data structure to caller

Expose it in a limited/read-only fashion: as iterable/iterator. Don't expose the whole `Map`/`Set` structure to your caller. Conveniences never pay in long run.

### Why array is not supported?

Array is commonly operated by indices and it requires dirty read. `draftwork` prefer transactional environment (clean read). While some operations play well with clean read (`pop`, `push`, `shift`, `unshift`), some don't (`splice`, index accessor, etc.)

We are thinking how to make array operates in "clean read" system, such as borrowing the concept from DOM: `insertAfter`, `insertBefore`, etc.

In the meanwhile, if you need a sorted array without duplicate items, consider implementing your own `Set` class with a comparer: `add` with insertion sort.

### How to make it perfect immutable?

Depends on type of elements, element inside `Map`/`Set` could be mutable (object) or immutable by nature (primitives).

If perfect immutability is required, when the delta is being played on SDK side, the SDK can clone/freeze the newly upserted element. This can be done by implementing an overlay `Map`/`Set` class.

### How this package is born?

We are UI component developers. UI responsiveness is a very important benchmark to our success.

At times, we need to handle data structure with 100,000+ of items. As we build UI components, we also need to be careful that caller may accidentally change their input. Immutability protect our system.

Having an immutable list of 100,000+ items with high change frequency bring down our system performance. We are rethinking how this can be done and created this package.

## Contributions

Like us? [Star](https://github.com/compulim/draftwork/stargazers) us.

Want to make it better? [File](https://github.com/compulim/draftwork/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/draftwork/pulls) a pull request.
