import SnowManaSymbol from '../../src/symbols/SnowManaSymbol.js';

describe('SnowManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from S (shortform and braced)', () => {
            const sym1 = SnowManaSymbol.fromString('S');
            expect(sym1.raw).toBe('S');
            expect(sym1.cmcValue()).toBe(1);

            const sym2 = SnowManaSymbol.fromString('{S}');
            expect(sym2.raw).toBe('S');
            expect(sym2.cmcValue()).toBe(1);
        });

        it('is case insensitive', () => {
            const sym = SnowManaSymbol.fromString('{s}');
            expect(sym.raw).toBe('S');
            expect(sym.cmcValue()).toBe(1);
        });

        it('throws for invalid input', () => {
            expect(() => SnowManaSymbol.fromString('C')).toThrow();
            expect(() => SnowManaSymbol.fromString('{X}')).toThrow();
            expect(() => SnowManaSymbol.fromString('')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type snowMana', () => {
            const sym = SnowManaSymbol.fromString('S');
            expect(sym.type).toBe('snowMana');
        });

        it('cmcValue is always 1', () => {
            const sym = SnowManaSymbol.fromString('{S}');
            expect(sym.cmcValue()).toBe(1);
        });

        it('colors is always empty', () => {
            const sym = SnowManaSymbol.fromString('S');
            expect(sym.colors).toEqual([]);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = SnowManaSymbol.fromString('S');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = SnowManaSymbol.fromString('{S}');
            expect(sym.toString(false)).toBe('S');
            expect(sym.toString(true)).toBe('{S}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{S}';
            const sym1 = SnowManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = SnowManaSymbol.fromString(str);
            expect(sym2.raw).toBe('S');
            expect(sym2.cmcValue()).toBe(1);
        });
    });
});
