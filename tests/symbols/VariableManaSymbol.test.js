import VariableManaSymbol from '../../src/symbols/VariableManaSymbol.js';

describe('VariableManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from variable (shortform and braced)', () => {
            for (const v of ['X','Y','Z']) {
                const sym1 = VariableManaSymbol.fromString(v);
                expect(sym1.raw).toBe(v);
                expect(sym1.cmcValue()).toBe(0);

                const sym2 = VariableManaSymbol.fromString(`{${v}}`);
                expect(sym2.raw).toBe(v);
                expect(sym2.cmcValue()).toBe(0);
            }
        });

        it('is case insensitive', () => {
            const sym = VariableManaSymbol.fromString('{x}');
            expect(sym.raw).toBe('X');
            expect(sym.cmcValue()).toBe(0);
        });

        it('throws for invalid input', () => {
            expect(() => VariableManaSymbol.fromString('W')).toThrow();
            expect(() => VariableManaSymbol.fromString('1')).toThrow();
            expect(() => VariableManaSymbol.fromString('')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type variable', () => {
            const sym = VariableManaSymbol.fromString('X');
            expect(sym.type).toBe('variableMana');
        });

        it('cmcValue is always 0', () => {
            const sym = VariableManaSymbol.fromString('{Y}');
            expect(sym.cmcValue()).toBe(0);
        });

        it('colors is always empty', () => {
            const sym = VariableManaSymbol.fromString('Z');
            expect(sym.colors).toEqual([]);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = VariableManaSymbol.fromString('X');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = VariableManaSymbol.fromString('{Y}');
            expect(sym.toString(false)).toBe('Y');
            expect(sym.toString(true)).toBe('{Y}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{Z}';
            const sym1 = VariableManaSymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = VariableManaSymbol.fromString(str);
            expect(sym2.raw).toBe('Z');
            expect(sym2.cmcValue()).toBe(0);
        });
    });
});
