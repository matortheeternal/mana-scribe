import '../../src/index.js';
import HalfManaSymbol from '../../src/symbols/HalfManaSymbol.js';

describe('HalfManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from half-colored mana (braced and shortform)', () => {
            const sym1 = HalfManaSymbol.fromString('{|W}');
            expect(sym1.raw).toBe('|W');
            expect(sym1.colors).toEqual(['W']);

            const sym2 = HalfManaSymbol.fromString('|U');
            expect(sym2.raw).toBe('|U');
            expect(sym2.colors).toEqual(['U']);
        });

        it('parses all five colors', () => {
            for (const c of 'WUBRG') {
                const sym = HalfManaSymbol.fromString(`|${c}`);
                expect(sym.colors).toEqual([c]);
                expect(sym.cmcValue()).toBe(0.5);
            }
        });

        it('parses snow half symbol (S) as colorless', () => {
            const sym = HalfManaSymbol.fromString('|S');
            expect(sym.raw).toBe('|S');
            expect(sym.colors).toEqual([]); // no color
            expect(sym.cmcValue()).toBe(0.5);
        });

        it('is case insensitive', () => {
            const sym = HalfManaSymbol.fromString('{|g}');
            expect(sym.raw).toBe('|G');
            expect(sym.colors).toEqual(['G']);
        });

        it('throws for invalid input', () => {
            expect(() => HalfManaSymbol.fromString('|X')).toThrow();
            expect(() => HalfManaSymbol.fromString('W')).toThrow();
            expect(() => HalfManaSymbol.fromString('')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type halfMana', () => {
            const sym = HalfManaSymbol.fromString('|B');
            expect(sym.type).toBe('halfMana');
        });

        it('cmcValue is always 0.5', () => {
            const sym = HalfManaSymbol.fromString('|R');
            expect(sym.cmcValue()).toBe(0.5);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = HalfManaSymbol.fromString('|W');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = HalfManaSymbol.fromString('{|U}');
            expect(sym.toString(false)).toBe('|U');
            expect(sym.toString(true)).toBe('{|U}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{|G}';
            const sym1 = HalfManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = HalfManaSymbol.fromString(str);
            expect(sym2.raw).toBe('|G');
            expect(sym2.colors).toEqual(['G']);
        });
    });
});
