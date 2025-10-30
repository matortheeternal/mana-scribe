# mana-scribe
[![Tests](https://github.com/matortheeternal/mana-scribe/actions/workflows/tests.yml/badge.svg)](https://github.com/matortheeternal/mana-scribe/actions/workflows/tests.yml) [![codecov](https://codecov.io/github/matortheeternal/mana-scribe/graph/badge.svg?token=Z81O4KMEOH)](https://codecov.io/github/matortheeternal/mana-scribe)

Mana Scribe is a utility for working with Magic: The Gathering mana costs and activation costs.

Supports both brace `{3}{R/U}` and shortform `3R/U` notation.

## Features

- Parse MTG mana costs into structured objects
- Supports all major symbols: generic, colored, 2-5 color hybrid, phyrexian, generic hybrid, phyrexian hybrid, snow, energy, tap/untap, variable
- Works with both Scryfall braces and shortform notation
- Compute:
  - Converted mana cost
  - Color identity
  - Devotion
- Compare mana costs (equality, greater than, less than)
- Easily add custom colors, types of mana, or other extra symbols

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
console.log(cost.getDevotionTo('R')); // 3

console.log(cost.toString(true));     // "{3}{R}{R}{R}"
console.log(cost.toString(false));    // "3RRR"
```
### Shortform example
```js
const cost = ManaCost.parse('2WU/B');
console.log(cost.cmc);     // 4
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


### Activation costs
`ActivationCost` offers the same functionality as the `ManaCost` class, but supports additional symbols such as Tap, Untap, and Energy.  It does not have comparison functions.

```js
import { ActivationCost } from 'mana-scribe';

const cost = ActivationCost.parse('{1}{G}{T}');
console.log(cost.symbols.map(s => s.type)); // ["genericMana", "coloredMana", "tap"]
console.log(cost.toString(true));           // "{1}{G}{T}"
```

## Extending

### Custom colors

You can add custom colors of mana with `symbolRegistry.addColor`.

```js
import { symbolRegistry, ManaCost } from 'mana-scribe';

symbolRegistry.addColor({ id: 'P', name: 'Purple' });
const cost = ManaCost.parse('{3}{R/P}{P}');
console.log(cost.symbols.map(s => s.type)); // ["genericMana", "twoColorHybridMana", "coloredMana"]
console.log(cost.cmc); // 5
console.log(cost.colors);  // ['R','P']
console.log(cost.getDevotionTo('P')); // 2
```

### Custom mana types

You can add custom types of mana with `symbolRegistry.addManaType`. This is for mana produced by specific sources, like snow mana.

```js
import { symbolRegistry, ActivationCost } from 'mana-scribe';

symbolRegistry.addManaType({ id: 'A', name: 'Artificial' }); // mana produced by an artifact
const cost = ActivationCost.parse('{A}{A}{T}');
console.log(cost.symbols.map(s => s.type)); // ["typedMana", "typedMana", "tap"]
console.log(cost.colors);  // []
```

### Extra symbols

You can add additional symbols for use in activation costs with `symbolRegistry.addExtraSym`. This is used for things like the energy symbol.

```js
import { symbolRegistry, ActivationCost } from 'mana-scribe';

symbolRegistry.addManaType({ id: '\\@', name: 'Chaos' });
const cost = ActivationCost.parse('{@}');
console.log(cost.symbols.map(s => s.type)); // ["extra"]
console.log(cost.colors);  // []
```

## License

This project is licensed under the MIT License.  See LICENSE for more info.
