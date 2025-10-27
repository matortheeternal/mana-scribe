import InfiniteManaSymbol from '../../src/symbols/InfiniteManaSymbol.js';

describe('InfiniteManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from I (shortform and braced)', () => {
            const sym1 = InfiniteManaSymbol.fromString('I');
            expect(sym1.raw).toBe('I');
            expect(sym1.cmcValue()).toBe(Infinity);

            const sym2 = InfiniteManaSymbol.fromString('{I}');
            expect(sym2.raw).toBe('I');
            expect(sym2.cmcValue()).toBe(Infinity);
        });

        it('is case insensitive', () => {
            const sym = InfiniteManaSymbol.fromString('{i}');
            expect(sym.raw).toBe('I');
            expect(sym.cmcValue()).toBe(Infinity);
        });

        it('throws for invalid input', () => {
            expect(() => InfiniteManaSymbol.fromString('W')).toThrow();
            expect(() => InfiniteManaSymbol.fromString('{X}')).toThrow();
            expect(() => InfiniteManaSymbol.fromString('')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type infinity', () => {
            const sym = InfiniteManaSymbol.fromString('I');
            expect(sym.type).toBe('infiniteMana');
        });

        it('cmcValue is Infinity', () => {
            const sym = InfiniteManaSymbol.fromString('{I}');
            expect(sym.cmcValue()).toBe(Infinity);
        });

        it('colors is always empty', () => {
            const sym = InfiniteManaSymbol.fromString('I');
            expect(sym.colors).toEqual([]);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = InfiniteManaSymbol.fromString('I');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = InfiniteManaSymbol.fromString('{I}');
            expect(sym.toString(false)).toBe('I');
            expect(sym.toString(true)).toBe('{I}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{I}';
            const sym1 = InfiniteManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = InfiniteManaSymbol.fromString(str);
            expect(sym2.raw).toBe('I');
            expect(sym2.cmcValue()).toBe(Infinity);
        });
    });
});
