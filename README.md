# mana-scribe
[![Tests](https://github.com/matortheeternal/mana-scribe/actions/workflows/tests.yml/badge.svg)](https://github.com/matortheeternal/mana-scribe/actions/workflows/tests.yml) [![codecov](https://codecov.io/github/matortheeternal/mana-scribe/graph/badge.svg?token=Z81O4KMEOH)](https://codecov.io/github/matortheeternal/mana-scribe)

 Mana Scribe is a utility for working with Magic: The Gathering mana costs and activation costs.

Supports both brace `{3}{R/U}` and shortform `3R/U` notation.

## Features

- Parse MTG mana costs into structured objects
- Supports all major symbols: generic, colored, hybrid, phyrexian, snow, energy, tap/untap, variable
- Works with both Scryfall braces and shortform notation
- Compute:
  - Converted mana cost
  - Color identity
  - Devotion
- Compare mana costs to evaluate if they are equal, greater than, or less than each other.
- Extensible design — add new symbol types by subclassing

Note: When the parser encounters an unrecognized symbol it stops parsing and returns the symbols it parsed so far.  You can access the unparsed string component through the property `remainingStr`.

## Installation

```bash
npm install mana-scribe
```

## Usage
```js
import { ManaCost } from 'mana-scribe';

const cost = ManaCost.parse('{3}{R}{R}{R}');
console.log(cost.cmc);                // 6
console.log(cost.colors);             // ['R']
console.log(cost.colorIdentity);      // ['R']
console.log(cost.getDevotionTo('R')); // 3

console.log(cost.toString(true));     // "{3}{R}{R}{R}"
console.log(cost.toString(false));    // "3RRR"
```
### Shortform example
```js
const cost = ManaCost.parse('2WU/B');
console.log(cost.cmc);     // 3
console.log(cost.colors);  // ['W','U','B']
```

### Comparison example
The `ManaCost` class supports equality and comparison operators under superset semantics:

- `equals(other)` → true if the costs are exactly the same
- `greaterThan(other)` → true if this cost includes all symbols of other plus additional ones, or generic mana cost is higher.
- `lessThan(other)` → true if this cost is a strict subset of other, or generic mana cost is lower.

```js
const a = ManaCost.parse('{3}{B}{B}{B}');
const b = ManaCost.parse('{1}{B}{B}{B}');

console.log(a.equals(b));       // false
console.log(a.greaterThan(b));  // true
console.log(b.lessThan(a));     // true
```

## Activation costs
`ActivationCost` offers the same functionality as the `ManaCost` class, but supports additional symbols such as Tap, Untap, and Energy.  It does not have comparison functions.

```js
import { ActivationCost } from 'mana-scribe';

const cost = ActivationCost.parse('{1}{G}{T}');
console.log(cost.symbols.map(s => s.type)); // ["generic", "colored", "tap"]
console.log(cost.toString(true));           // "{1}{G}{T}"
```

## Extending

The library is class-based. Each symbol type is a subclass of a base Symbol class and implements:

- `static match(str)` → returns a regex match object if it applies
- `get colors()` → returns an array of the colors associated with the symbol
- `cmcValue()` → returns an integer corresponding to how much this symbol contributes to a card's overall converted mana cost.

This makes it easy to add custom symbols or patch existing ones in your own project.

## Project Status

This is an early but complete implementation.

Current priorities:
- [x] Support core MTG symbols
- [x] Add test coverage
- [x] Add cost comparison
- [ ] Other improvements? TBD

## License

This project is licensed under the MIT License.  See LICENSE for more info.
