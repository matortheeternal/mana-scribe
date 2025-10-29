import '../../src/index.js';
import ColorlessManaSymbol from '../../src/symbols/ColorlessManaSymbol.js';

describe('ColorlessManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from shortform C', () => {
            const sym = ColorlessManaSymbol.fromString('C');
            expect(sym).toBeInstanceOf(ColorlessManaSymbol);
            expect(sym.raw).toBe('C');
            expect(sym.remainingStr).toBe('');
        });

        it('creates a symbol from scryfall style {C}', () => {
            const sym = ColorlessManaSymbol.fromString('{c}');
            expect(sym.raw).toBe('C'); // uppercased
            expect(sym.remainingStr).toBe('');
        });

        it('throws for invalid input', () => {
            expect(() => ColorlessManaSymbol.fromString('{X}')).toThrow();
            expect(() => ColorlessManaSymbol.fromString('W')).toThrow();
            expect(() => ColorlessManaSymbol.fromString('')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type colorlessMana', () => {
            const sym = ColorlessManaSymbol.fromString('C');
            expect(sym.type).toBe('colorlessMana');
        });

        it('cmcValue is always 1', () => {
            const sym = ColorlessManaSymbol.fromString('{C}');
            expect(sym.cmcValue()).toBe(1);
        });

        it('colors is always empty', () => {
            const sym = ColorlessManaSymbol.fromString('C');
            expect(sym.colors).toEqual([]);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = ColorlessManaSymbol.fromString('C');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = ColorlessManaSymbol.fromString('C');
            expect(sym.toString(false)).toBe('C');
            expect(sym.toString(true)).toBe('{C}');
        });
    });
});
