import HalfColoredManaSymbol from '../../src/symbols/HalfColoredManaSymbol.js';

describe('HalfColoredManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from half-colored mana (braced and shortform)', () => {
            const sym1 = HalfColoredManaSymbol.fromString('{|W}');
            expect(sym1.raw).toBe('|W');
            expect(sym1.colors).toEqual(['W']);

            const sym2 = HalfColoredManaSymbol.fromString('|U');
            expect(sym2.raw).toBe('|U');
            expect(sym2.colors).toEqual(['U']);
        });

        it('parses all five colors', () => {
            for (const c of 'WUBRG') {
                const sym = HalfColoredManaSymbol.fromString(`|${c}`);
                expect(sym.colors).toEqual([c]);
                expect(sym.cmcValue()).toBe(0.5);
            }
        });

        it('parses snow half symbol (S) as colorless', () => {
            const sym = HalfColoredManaSymbol.fromString('|S');
            expect(sym.raw).toBe('|S');
            expect(sym.colors).toEqual([]); // no color
            expect(sym.cmcValue()).toBe(0.5);
        });

        it('is case insensitive', () => {
            const sym = HalfColoredManaSymbol.fromString('{|g}');
            expect(sym.raw).toBe('|G');
            expect(sym.colors).toEqual(['G']);
        });

        it('throws for invalid input', () => {
            expect(() => HalfColoredManaSymbol.fromString('|X')).toThrow();
            expect(() => HalfColoredManaSymbol.fromString('W')).toThrow();
            expect(() => HalfColoredManaSymbol.fromString('')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type halfColoredMana', () => {
            const sym = HalfColoredManaSymbol.fromString('|B');
            expect(sym.type).toBe('halfColoredMana');
        });

        it('cmcValue is always 0.5', () => {
            const sym = HalfColoredManaSymbol.fromString('|R');
            expect(sym.cmcValue()).toBe(0.5);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = HalfColoredManaSymbol.fromString('|W');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = HalfColoredManaSymbol.fromString('{|U}');
            expect(sym.toString(false)).toBe('|U');
            expect(sym.toString(true)).toBe('{|U}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{|G}';
            const sym1 = HalfColoredManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = HalfColoredManaSymbol.fromString(str);
            expect(sym2.raw).toBe('|G');
            expect(sym2.colors).toEqual(['G']);
        });
    });
});
