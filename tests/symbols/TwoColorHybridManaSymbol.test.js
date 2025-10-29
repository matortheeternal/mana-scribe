import '../../src/index.js';
import TwoColorHybridManaSymbol from '../../src/symbols/TwoColorHybridManaSymbol.js';

describe('TwoColorHybridManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from two-color hybrid (braced and shortform)', () => {
            const sym1 = TwoColorHybridManaSymbol.fromString('{W/U}');
            expect(sym1.raw).toBe('W/U');
            expect(sym1.colors.sort()).toEqual(['U','W']);

            const sym2 = TwoColorHybridManaSymbol.fromString('R/G');
            expect(sym2.raw).toBe('R/G');
            expect(sym2.colors.sort()).toEqual(['G','R']);
        });

        it('is case insensitive', () => {
            const sym = TwoColorHybridManaSymbol.fromString('{b/r}');
            expect(sym.raw).toBe('B/R');
            expect(sym.colors.sort()).toEqual(['B','R']);
        });

        it('throws for invalid input', () => {
            // single color
            expect(() => TwoColorHybridManaSymbol.fromString('W')).toThrow();
            // duplicates
            expect(() => TwoColorHybridManaSymbol.fromString('W/W')).toThrow();
            // invalid char
            expect(() => TwoColorHybridManaSymbol.fromString('W/C')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type twoColorHybridMana', () => {
            const sym = TwoColorHybridManaSymbol.fromString('W/U');
            expect(sym.type).toBe('twoColorHybridMana');
        });

        it('cmcValue is always 1', () => {
            const sym = TwoColorHybridManaSymbol.fromString('{R/G}');
            expect(sym.cmcValue()).toBe(1);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = TwoColorHybridManaSymbol.fromString('W/U');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = TwoColorHybridManaSymbol.fromString('{U/B}');
            expect(sym.toString(false)).toBe('U/B');
            expect(sym.toString(true)).toBe('{U/B}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{G/R}';
            const sym1 = TwoColorHybridManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = TwoColorHybridManaSymbol.fromString(str);
            expect(sym2.raw).toBe('G/R');
            expect(sym2.colors.sort()).toEqual(['G','R']);
        });
    });
});
