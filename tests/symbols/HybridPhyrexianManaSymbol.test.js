import '../../src/index.js';
import HybridPhyrexianManaSymbol from '../../src/symbols/HybridPhyrexianManaSymbol.js';
import ThreeColorHybridManaSymbol from '../../src/symbols/ThreeColorHybridManaSymbol.js';

describe('HybridPhyrexianManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from two-color hybrid (braced and shortform)', () => {
            const sym1 = HybridPhyrexianManaSymbol.fromString('{H/W/U}');
            expect(sym1.raw).toBe('H/W/U');
            expect(sym1.colors.sort()).toEqual(['U','W']);

            const sym2 = HybridPhyrexianManaSymbol.fromString('H/R/G');
            expect(sym2.raw).toBe('H/R/G');
            expect(sym2.colors.sort()).toEqual(['G','R']);
        });

        it('is case insensitive', () => {
            const sym = HybridPhyrexianManaSymbol.fromString('{h/b/r}');
            expect(sym.raw).toBe('H/B/R');
            expect(sym.colors.sort()).toEqual(['B','R']);
        });

        it('is order insensitive', () => {
            const sym1 = HybridPhyrexianManaSymbol.fromString('{h/b/r}');
            const sym2 = HybridPhyrexianManaSymbol.fromString('{b/h/r}');
            const sym3 = HybridPhyrexianManaSymbol.fromString('{b/r/h}');
            expect(sym1.type).toBe('hybridPhyrexianMana');
            expect(sym2.type).toBe('hybridPhyrexianMana');
            expect(sym3.type).toBe('hybridPhyrexianMana');
            expect(sym1.colors.sort()).toEqual(['B','R']);
            expect(sym2.colors.sort()).toEqual(['B','R']);
            expect(sym3.colors.sort()).toEqual(['B','R']);
        });

        it('throws for invalid input', () => {
            // single color
            expect(() => HybridPhyrexianManaSymbol.fromString('H/W')).toThrow();
            // duplicates
            expect(() => HybridPhyrexianManaSymbol.fromString('H/W/W')).toThrow();
            // invalid char
            expect(() => HybridPhyrexianManaSymbol.fromString('H/W/C')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type twoColorHybridMana', () => {
            const sym = HybridPhyrexianManaSymbol.fromString('H/W/U');
            expect(sym.type).toBe('hybridPhyrexianMana');
        });

        it('cmcValue is always 1', () => {
            const sym = HybridPhyrexianManaSymbol.fromString('{H/R/G}');
            expect(sym.cmcValue()).toBe(1);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = HybridPhyrexianManaSymbol.fromString('H/W/U');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = HybridPhyrexianManaSymbol.fromString('{H/U/B}');
            expect(sym.toString(false)).toBe('H/U/B');
            expect(sym.toString(true)).toBe('{H/U/B}');
        });

        it('hybrid is true', () => {
            const sym = HybridPhyrexianManaSymbol.fromString('{H/R/G}');
            expect(sym.hybrid).toBe(true);
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{H/G/R}';
            const sym1 = HybridPhyrexianManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = HybridPhyrexianManaSymbol.fromString(str);
            expect(sym2.raw).toBe('H/G/R');
            expect(sym2.colors.sort()).toEqual(['G','R']);
        });
    });
});
