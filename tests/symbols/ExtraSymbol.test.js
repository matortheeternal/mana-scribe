import '../../src/index.js';
import ExtraSymbol from '../../src/symbols/ExtraSymbol.js';

describe('ExtraSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from E (shortform and braced)', () => {
            const sym1 = ExtraSymbol.fromString('E');
            expect(sym1.raw).toBe('E');
            expect(sym1.type).toBe('extra');
            expect(sym1.cmcValue()).toBe(0);
            expect(sym1.colors).toEqual([]);

            const sym2 = ExtraSymbol.fromString('{E}');
            expect(sym2.raw).toBe('E');
            expect(sym2.type).toBe('extra');
            expect(sym2.cmcValue()).toBe(0);
            expect(sym2.colors).toEqual([]);
        });

        it('is case insensitive', () => {
            const sym = ExtraSymbol.fromString('{e}');
            expect(sym.raw).toBe('E');
            expect(sym.type).toBe('extra');
        });

        it('throws for invalid input', () => {
            expect(() => ExtraSymbol.fromString('X')).toThrow();
            expect(() => ExtraSymbol.fromString('{W}')).toThrow();
            expect(() => ExtraSymbol.fromString('')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type energy', () => {
            const sym = ExtraSymbol.fromString('E');
            expect(sym.type).toBe('extra');
        });

        it('cmcValue is always 0', () => {
            const sym = ExtraSymbol.fromString('{E}');
            expect(sym.cmcValue()).toBe(0);
        });

        it('colors is always empty', () => {
            const sym = ExtraSymbol.fromString('E');
            expect(sym.colors).toEqual([]);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = ExtraSymbol.fromString('E');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = ExtraSymbol.fromString('{E}');
            expect(sym.toString(false)).toBe('E');
            expect(sym.toString(true)).toBe('{E}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{E}';
            const sym1 = ExtraSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = ExtraSymbol.fromString(str);
            expect(sym2.raw).toBe('E');
            expect(sym2.type).toBe('extra');
            expect(sym2.cmcValue()).toBe(0);
        });
    });
});
