import EnergySymbol from '../../src/symbols/EnergySymbol.js';

describe('EnergySymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from E (shortform and braced)', () => {
            const sym1 = EnergySymbol.fromString('E');
            expect(sym1.raw).toBe('E');
            expect(sym1.type).toBe('energy');
            expect(sym1.cmcValue()).toBe(0);
            expect(sym1.colors).toEqual([]);

            const sym2 = EnergySymbol.fromString('{E}');
            expect(sym2.raw).toBe('E');
            expect(sym2.type).toBe('energy');
            expect(sym2.cmcValue()).toBe(0);
            expect(sym2.colors).toEqual([]);
        });

        it('is case insensitive', () => {
            const sym = EnergySymbol.fromString('{e}');
            expect(sym.raw).toBe('E');
            expect(sym.type).toBe('energy');
        });

        it('throws for invalid input', () => {
            expect(() => EnergySymbol.fromString('X')).toThrow();
            expect(() => EnergySymbol.fromString('{W}')).toThrow();
            expect(() => EnergySymbol.fromString('')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type energy', () => {
            const sym = EnergySymbol.fromString('E');
            expect(sym.type).toBe('energy');
        });

        it('cmcValue is always 0', () => {
            const sym = EnergySymbol.fromString('{E}');
            expect(sym.cmcValue()).toBe(0);
        });

        it('colors is always empty', () => {
            const sym = EnergySymbol.fromString('E');
            expect(sym.colors).toEqual([]);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = EnergySymbol.fromString('E');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = EnergySymbol.fromString('{E}');
            expect(sym.toString(false)).toBe('E');
            expect(sym.toString(true)).toBe('{E}');
        });
    });

    describe('roundtrip', () => {
        it('parses and serializes symmetrically', () => {
            const input = '{E}';
            const sym1 = EnergySymbol.fromString(input);
            const str = sym1.toString(true);
            const sym2 = EnergySymbol.fromString(str);
            expect(sym2.raw).toBe('E');
            expect(sym2.type).toBe('energy');
            expect(sym2.cmcValue()).toBe(0);
        });
    });
});
