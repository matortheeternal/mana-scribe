import '../../src/index.js';
import ColorlessPhyrexianManaSymbol from '../../src/symbols/ColorlessPhyrexianManaSymbol.js';

describe('ColorlessPhyrexianManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from H/C and C/H (shortform and braced)', () => {
            expect(ColorlessPhyrexianManaSymbol.fromString('H/C').raw).toBe('H/C');
            expect(ColorlessPhyrexianManaSymbol.fromString('{c/h}').raw).toBe('C/H');
        });

        it('creates a symbol from H (shortform and braced)', () => {
            expect(ColorlessPhyrexianManaSymbol.fromString('H').raw).toBe('H');
            expect(ColorlessPhyrexianManaSymbol.fromString('{h}').raw).toBe('H');
        });

        it('is case insensitive', () => {
            const sym = ColorlessPhyrexianManaSymbol.fromString('{h/c}');
            expect(sym.raw).toBe('H/C');
        });

        it('throws for invalid input', () => {
            expect(() => ColorlessPhyrexianManaSymbol.fromString('C')).toThrow();
            expect(() => ColorlessPhyrexianManaSymbol.fromString('{X}')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type colorlessPhyrexianMana', () => {
            const sym = ColorlessPhyrexianManaSymbol.fromString('H');
            expect(sym.type).toBe('colorlessPhyrexianMana');
        });

        it('cmcValue is always 1', () => {
            const sym = ColorlessPhyrexianManaSymbol.fromString('H/C');
            expect(sym.cmcValue()).toBe(1);
        });

        it('colors is always empty', () => {
            const sym = ColorlessPhyrexianManaSymbol.fromString('C/H');
            expect(sym.colors).toEqual([]);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = ColorlessPhyrexianManaSymbol.fromString('H');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym1 = ColorlessPhyrexianManaSymbol.fromString('H/C');
            expect(sym1.toString(false)).toBe('H/C');
            expect(sym1.toString(true)).toBe('{H/C}');

            const sym2 = ColorlessPhyrexianManaSymbol.fromString('H');
            expect(sym2.toString(false)).toBe('H');
            expect(sym2.toString(true)).toBe('{H}');
        });
    });
});
