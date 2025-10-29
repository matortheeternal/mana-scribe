import '../../src/index.js';
import TapSymbol from '../../src/symbols/TapSymbol.js';

describe('TapSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from T (shortform and braced)', () => {
            const sym1 = TapSymbol.fromString('T');
            expect(sym1.raw).toBe('T');
            expect(sym1.type).toBe('tap');
            expect(sym1.cmcValue()).toBe(0);
            expect(sym1.colors).toEqual([]);

            const sym2 = TapSymbol.fromString('{T}');
            expect(sym2.raw).toBe('T');
            expect(sym2.type).toBe('tap');
            expect(sym2.cmcValue()).toBe(0);
            expect(sym2.colors).toEqual([]);
        });

        it('is case insensitive', () => {
            const sym = TapSymbol.fromString('{t}');
            expect(sym.raw).toBe('T');
            expect(sym.type).toBe('tap');
        });

        it('throws for invalid input', () => {
            expect(() => TapSymbol.fromString('Q')).toThrow(); // Untap, not Tap
            expect(() => TapSymbol.fromString('{W}')).toThrow();
            expect(() => TapSymbol.fromString('')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type tap', () => {
            const sym = TapSymbol.fromString('T');
            expect(sym.type).toBe('tap');
        });

        it('cmcValue is always 0', () => {
            const sym = TapSymbol.fromString('{T}');
            expect(sym.cmcValue()).toBe(0);
        });

        it('colors is always empty', () => {
            const sym = TapSymbol.fromString('T');
            expect(sym.colors).toEqual([]);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = TapSymbol.fromString('T');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = TapSymbol.fromString('{T}');
            expect(sym.toString(false)).toBe('T');
            expect(sym.toString(true)).toBe('{T}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{T}';
            const sym1 = TapSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = TapSymbol.fromString(str);
            expect(sym2.raw).toBe('T');
            expect(sym2.type).toBe('tap');
        });
    });
});
