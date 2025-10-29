import '../../src/index.js';
import GenericHybridManaSymbol from '../../src/symbols/GenericHybridManaSymbol.js';

describe('GenericHybridManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from generic-color hybrid (braced and shortform)', () => {
            const sym1 = GenericHybridManaSymbol.fromString('{2/W}');
            expect(sym1.raw).toBe('2/W');
            expect(sym1.colors).toEqual(['W']);

            const sym2 = GenericHybridManaSymbol.fromString('2/W');
            expect(sym2.raw).toBe('2/W');
            expect(sym2.colors).toEqual(['W']);
        });

        it('supports generic/colorless', () => {
            const sym = GenericHybridManaSymbol.fromString('2/C');
            expect(sym.raw).toBe('2/C');
            expect(sym.colors).toEqual([]);
        });

        it('supports large numbers', () => {
            const sym = GenericHybridManaSymbol.fromString('{9/U}');
            expect(sym.raw).toBe('9/U');
            expect(sym.colors).toEqual(['U']);
        });

        it('is case insensitive for color', () => {
            const sym = GenericHybridManaSymbol.fromString('3/g');
            expect(sym.raw).toBe('3/G');
            expect(sym.colors).toEqual(['G']);
        });

        it('throws for invalid input', () => {
            // missing digit
            expect(() => GenericHybridManaSymbol.fromString('/W')).toThrow();
            // invalid color
            expect(() => GenericHybridManaSymbol.fromString('2/Y')).toThrow();
            // multi digit
            expect(() => GenericHybridManaSymbol.fromString('10/R')).toThrow();
            // not a hybrid at all
            expect(() => GenericHybridManaSymbol.fromString('W')).toThrow();
        });
    });

    describe('properties', () => {
        it('cmcValue is always 1', () => {
            const sym = GenericHybridManaSymbol.fromString('{2/U}');
            expect(sym.cmcValue()).toBe(1);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = GenericHybridManaSymbol.fromString('2/R');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = GenericHybridManaSymbol.fromString('{3/G}');
            expect(sym.toString(false)).toBe('3/G');
            expect(sym.toString(true)).toBe('{3/G}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{4/B}';
            const sym1 = GenericHybridManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = GenericHybridManaSymbol.fromString(str);
            expect(sym2.raw).toBe('4/B');
            expect(sym2.colors).toEqual(['B']);
        });
    });
});
