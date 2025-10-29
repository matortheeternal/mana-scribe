import '../../src/index.js';
import ColoredManaSymbol from '../../src/symbols/ColoredManaSymbol.js';

describe('ColoredManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from shortform', () => {
            const sym = ColoredManaSymbol.fromString('R');
            expect(sym).toBeInstanceOf(ColoredManaSymbol);
            expect(sym.raw).toBe('R');
            expect(sym.remainingStr).toBe('');
        });

        it('creates a symbol from scryfall braces', () => {
            const sym = ColoredManaSymbol.fromString('{g}');
            expect(sym.raw).toBe('G'); // normalized to uppercase
            expect(sym.remainingStr).toBe('');
        });

        it('throws for invalid input', () => {
            expect(() => ColoredManaSymbol.fromString('X')).toThrow();
            expect(() => ColoredManaSymbol.fromString('{C}')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type coloredMana', () => {
            expect(ColoredManaSymbol.fromString('U').type).toBe('coloredMana');
        });

        it('cmcValue is always 1', () => {
            for (const c of 'WUBRG') {
                expect(ColoredManaSymbol.fromString(c).cmcValue()).toBe(1);
            }
        });

        it('reports correct colors', () => {
            for (const c of 'WUBRG') {
                expect(ColoredManaSymbol.fromString(c).colors).toEqual([c]);
            }
        });

        it('devotion to its color is 1, others 0', () => {
            const sym = ColoredManaSymbol.fromString('U');
            expect(sym.devotion('U')).toBe(1);
            expect(sym.devotion('R')).toBe(0);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = ColoredManaSymbol.fromString('W');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = ColoredManaSymbol.fromString('G');
            expect(sym.toString(false)).toBe('G');
            expect(sym.toString(true)).toBe('{G}');
        });
    });
});
