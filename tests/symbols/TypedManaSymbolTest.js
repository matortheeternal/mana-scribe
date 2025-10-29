import '../../src/index.js';
import TypedManaSymbol from '../../src/symbols/TypedManaSymbol.js';

describe('TypedManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from S (shortform and braced)', () => {
            const sym1 = TypedManaSymbol.fromString('S');
            expect(sym1.raw).toBe('S');
            expect(sym1.cmcValue()).toBe(1);

            const sym2 = TypedManaSymbol.fromString('{S}');
            expect(sym2.raw).toBe('S');
            expect(sym2.cmcValue()).toBe(1);
        });

        it('is case insensitive', () => {
            const sym = TypedManaSymbol.fromString('{s}');
            expect(sym.raw).toBe('S');
            expect(sym.cmcValue()).toBe(1);
        });

        it('throws for invalid input', () => {
            expect(() => TypedManaSymbol.fromString('C')).toThrow();
            expect(() => TypedManaSymbol.fromString('{X}')).toThrow();
            expect(() => TypedManaSymbol.fromString('')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type typedMana', () => {
            const sym = TypedManaSymbol.fromString('S');
            expect(sym.type).toBe('typedMana');
        });

        it('cmcValue is always 1', () => {
            const sym = TypedManaSymbol.fromString('{S}');
            expect(sym.cmcValue()).toBe(1);
        });

        it('colors is always empty', () => {
            const sym = TypedManaSymbol.fromString('S');
            expect(sym.colors).toEqual([]);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = TypedManaSymbol.fromString('S');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = TypedManaSymbol.fromString('{S}');
            expect(sym.toString(false)).toBe('S');
            expect(sym.toString(true)).toBe('{S}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{S}';
            const sym1 = TypedManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = TypedManaSymbol.fromString(str);
            expect(sym2.raw).toBe('S');
            expect(sym2.cmcValue()).toBe(1);
        });
    });
});
