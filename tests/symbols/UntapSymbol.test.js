import UntapSymbol from '../../src/symbols/UntapSymbol.js';

describe('UntapSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from Q (shortform and braced)', () => {
            const sym1 = UntapSymbol.fromString('Q');
            expect(sym1.raw).toBe('Q');
            expect(sym1.type).toBe('untap');
            expect(sym1.cmcValue()).toBe(0);
            expect(sym1.colors).toEqual([]);

            const sym2 = UntapSymbol.fromString('{Q}');
            expect(sym2.raw).toBe('Q');
            expect(sym2.type).toBe('untap');
            expect(sym2.cmcValue()).toBe(0);
            expect(sym2.colors).toEqual([]);
        });

        it('is case insensitive', () => {
            const sym = UntapSymbol.fromString('{q}');
            expect(sym.raw).toBe('Q');
            expect(sym.type).toBe('untap');
        });

        it('throws for invalid input', () => {
            expect(() => UntapSymbol.fromString('T')).toThrow(); // Tap, not Untap
            expect(() => UntapSymbol.fromString('{W}')).toThrow();
            expect(() => UntapSymbol.fromString('')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type untap', () => {
            const sym = UntapSymbol.fromString('Q');
            expect(sym.type).toBe('untap');
        });

        it('cmcValue is always 0', () => {
            const sym = UntapSymbol.fromString('{Q}');
            expect(sym.cmcValue()).toBe(0);
        });

        it('colors is always empty', () => {
            const sym = UntapSymbol.fromString('Q');
            expect(sym.colors).toEqual([]);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = UntapSymbol.fromString('Q');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = UntapSymbol.fromString('{Q}');
            expect(sym.toString(false)).toBe('Q');
            expect(sym.toString(true)).toBe('{Q}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{Q}';
            const sym1 = UntapSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = UntapSymbol.fromString(str);
            expect(sym2.raw).toBe('Q');
            expect(sym2.type).toBe('untap');
        });
    });
});
