import '../../src/index.js';
import FourColorHybridManaSymbol from '../../src/symbols/FourColorHybridManaSymbol.js';

describe('FourColorHybridManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from four-color hybrid (braced and shortform)', () => {
            const sym1 = FourColorHybridManaSymbol.fromString('{W/U/B/R}');
            expect(sym1.raw).toBe('W/U/B/R');
            expect(sym1.colors.sort()).toEqual(['B','R','U','W']);

            const sym2 = FourColorHybridManaSymbol.fromString('W/U/B/R');
            expect(sym2.raw).toBe('W/U/B/R');
            expect(sym2.colors.sort()).toEqual(['B','R','U','W']);
        });

        it('is case insensitive', () => {
            const sym = FourColorHybridManaSymbol.fromString('{w/u/b/g}');
            expect(sym.raw).toBe('W/U/B/G');
            expect(sym.colors.sort()).toEqual(['B','G','U','W']);
        });

        it('throws for invalid input', () => {
            // fewer than 4 colors
            expect(() => FourColorHybridManaSymbol.fromString('W/U/B')).toThrow();
            // duplicates
            expect(() => FourColorHybridManaSymbol.fromString('W/U/B/W')).toThrow();
            // includes invalid
            expect(() => FourColorHybridManaSymbol.fromString('W/U/B/C')).toThrow();
            // not hybrid at all
            expect(() => FourColorHybridManaSymbol.fromString('W')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type fourColorHybridMana', () => {
            const sym = FourColorHybridManaSymbol.fromString('W/U/B/R');
            expect(sym.type).toBe('fourColorHybridMana');
        });

        it('cmcValue is always 1', () => {
            const sym = FourColorHybridManaSymbol.fromString('{W/U/B/R}');
            expect(sym.cmcValue()).toBe(1);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = FourColorHybridManaSymbol.fromString('W/U/B/R');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = FourColorHybridManaSymbol.fromString('{W/U/B/R}');
            expect(sym.toString(false)).toBe('W/U/B/R');
            expect(sym.toString(true)).toBe('{W/U/B/R}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{W/U/B/R}';
            const sym1 = FourColorHybridManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = FourColorHybridManaSymbol.fromString(str);
            expect(sym2.raw).toBe('W/U/B/R');
            expect(sym2.colors.sort()).toEqual(['B','R','U','W']);
        });
    });
});
