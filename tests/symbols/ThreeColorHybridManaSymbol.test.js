import '../../src/index.js';
import ThreeColorHybridManaSymbol from '../../src/symbols/ThreeColorHybridManaSymbol.js';
import TwoColorHybridManaSymbol from '../../src/symbols/TwoColorHybridManaSymbol.js';

describe('ThreeColorHybridManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from three-color hybrid (braced and shortform)', () => {
            const sym1 = ThreeColorHybridManaSymbol.fromString('{W/U/B}');
            expect(sym1.raw).toBe('W/U/B');
            expect(sym1.colors.sort()).toEqual(['B','U','W']);

            const sym2 = ThreeColorHybridManaSymbol.fromString('R/G/U');
            expect(sym2.raw).toBe('R/G/U');
            expect(sym2.colors.sort()).toEqual(['G','R','U']);
        });

        it('is case insensitive', () => {
            const sym = ThreeColorHybridManaSymbol.fromString('{w/u/g}');
            expect(sym.raw).toBe('W/U/G');
            expect(sym.colors.sort()).toEqual(['G','U','W']);
        });

        it('throws for invalid input', () => {
            // fewer than 3 colors
            expect(() => ThreeColorHybridManaSymbol.fromString('W/U')).toThrow();
            // duplicates
            expect(() => ThreeColorHybridManaSymbol.fromString('W/U/W')).toThrow();
            // invalid char
            expect(() => ThreeColorHybridManaSymbol.fromString('W/U/C')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type threeColorHybridMana', () => {
            const sym = ThreeColorHybridManaSymbol.fromString('W/U/B');
            expect(sym.type).toBe('threeColorHybridMana');
        });

        it('cmcValue is always 1', () => {
            const sym = ThreeColorHybridManaSymbol.fromString('{W/U/B}');
            expect(sym.cmcValue()).toBe(1);
        });

        it('hybrid is true', () => {
            const sym = ThreeColorHybridManaSymbol.fromString('{R/G/B}');
            expect(sym.hybrid).toBe(true);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = ThreeColorHybridManaSymbol.fromString('W/U/B');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = ThreeColorHybridManaSymbol.fromString('{W/U/B}');
            expect(sym.toString(false)).toBe('W/U/B');
            expect(sym.toString(true)).toBe('{W/U/B}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{W/U/B}';
            const sym1 = ThreeColorHybridManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = ThreeColorHybridManaSymbol.fromString(str);
            expect(sym2.raw).toBe('W/U/B');
            expect(sym2.colors.sort()).toEqual(['B','U','W']);
        });
    });
});
