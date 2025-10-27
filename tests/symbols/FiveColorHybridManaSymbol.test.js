import FiveColorHybridManaSymbol from '../../src/symbols/FiveColorHybridManaSymbol.js';

describe('FiveColorHybridManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from full five-color hybrid (braced and shortform)', () => {
            const sym1 = FiveColorHybridManaSymbol.fromString('{W/U/B/R/G}');
            expect(sym1.raw).toBe('W/U/B/R/G');
            expect(sym1.colors.sort()).toEqual(['B','G','R','U','W']);

            const sym2 = FiveColorHybridManaSymbol.fromString('W/U/B/R/G');
            expect(sym2.raw).toBe('W/U/B/R/G');
            expect(sym2.colors.sort()).toEqual(['B','G','R','U','W']);
        });

        it('is case insensitive', () => {
            const sym = FiveColorHybridManaSymbol.fromString('{w/u/b/r/g}');
            expect(sym.raw).toBe('W/U/B/R/G');
            expect(sym.colors.sort()).toEqual(['B','G','R','U','W']);
        });

        it('throws for invalid input', () => {
            // fewer than 5 colors
            expect(() => FiveColorHybridManaSymbol.fromString('W/U/B/R')).toThrow();
            // duplicates (would reduce hybrid count)
            expect(() => FiveColorHybridManaSymbol.fromString('W/U/B/R/R')).toThrow();
            // includes invalid symbol
            expect(() => FiveColorHybridManaSymbol.fromString('W/U/B/R/C')).toThrow();
            // not hybrid at all
            expect(() => FiveColorHybridManaSymbol.fromString('W')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type fiveColorHybridMana', () => {
            const sym = FiveColorHybridManaSymbol.fromString('W/U/B/R/G');
            expect(sym.type).toBe('fiveColorHybridMana');
        });

        it('cmcValue is always 1', () => {
            const sym = FiveColorHybridManaSymbol.fromString('{W/U/B/R/G}');
            expect(sym.cmcValue()).toBe(1);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = FiveColorHybridManaSymbol.fromString('W/U/B/R/G');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = FiveColorHybridManaSymbol.fromString('{W/U/B/R/G}');
            expect(sym.toString(false)).toBe('W/U/B/R/G');
            expect(sym.toString(true)).toBe('{W/U/B/R/G}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{W/U/B/R/G}';
            const sym1 = FiveColorHybridManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = FiveColorHybridManaSymbol.fromString(str);
            expect(sym2.raw).toBe('W/U/B/R/G');
            expect(sym2.colors.sort()).toEqual(['B','G','R','U','W']);
        });
    });
});
