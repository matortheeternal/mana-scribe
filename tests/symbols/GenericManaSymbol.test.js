import '../../src/index.js';
import GenericManaSymbol from '../../src/symbols/GenericManaSymbol.js';

describe('GenericManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from generic numbers (braced and shortform)', () => {
            const sym1 = GenericManaSymbol.fromString('{5}');
            expect(sym1.raw).toBe('5');
            expect(sym1.cmcValue()).toBe(5);

            const sym2 = GenericManaSymbol.fromString('7');
            expect(sym2.raw).toBe('7');
            expect(sym2.cmcValue()).toBe(7);
        });

        it('supports double digit numbers', () => {
            const sym = GenericManaSymbol.fromString('12');
            expect(sym.raw).toBe('12');
            expect(sym.cmcValue()).toBe(12);
        });

        it('throws for invalid input', () => {
            // letters
            expect(() => GenericManaSymbol.fromString('W')).toThrow();
            // empty
            expect(() => GenericManaSymbol.fromString('')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type genericMana', () => {
            const sym = GenericManaSymbol.fromString('8');
            expect(sym.type).toBe('genericMana');
        });

        it('cmcValue matches the numeric value', () => {
            for (let n = 0; n <= 20; n++) {
                const sym = GenericManaSymbol.fromString(n.toString());
                expect(sym.cmcValue()).toBe(n);
            }
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = GenericManaSymbol.fromString('3');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = GenericManaSymbol.fromString('{9}');
            expect(sym.toString(false)).toBe('9');
            expect(sym.toString(true)).toBe('{9}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{15}';
            const sym1 = GenericManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = GenericManaSymbol.fromString(str);
            expect(sym2.raw).toBe('15');
            expect(sym2.cmcValue()).toBe(15);
        });
    });
});
