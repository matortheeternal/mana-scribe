import '../../src/index.js';
import ColorlessHybridManaSymbol from '../../src/symbols/ColorlessHybridManaSymbol.js';

describe('ColorlessHybridManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from C/W and {c/u} (shortform and braced)', () => {
            const sym1 = ColorlessHybridManaSymbol.fromString('C/W')
            expect(sym1.raw).toBe('C/W');
            expect(ColorlessHybridManaSymbol.fromString('{c/u}').raw).toBe('C/U');
            expect(sym1.colors).toEqual(['W']);
        });

        it('is case insensitive', () => {
            const sym = ColorlessHybridManaSymbol.fromString('{c/r}');
            expect(sym.raw).toBe('C/R');
            expect(sym.colors).toEqual(['R']);
        });

        it('throws for invalid input', () => {
            expect(() => ColorlessHybridManaSymbol.fromString('C')).toThrow();
            expect(() => ColorlessHybridManaSymbol.fromString('{X}')).toThrow();
        });
    });

    describe('properties', () => {
        it('has type colorlessHybridMana', () => {
            const sym = ColorlessHybridManaSymbol.fromString('c/b');
            expect(sym.type).toBe('colorlessHybridMana');
        });

        it('cmcValue is always 1', () => {
            const sym = ColorlessHybridManaSymbol.fromString('c/g');
            expect(sym.cmcValue()).toBe(1);
        });

        it('hybrid is true', () => {
            const sym = ColorlessHybridManaSymbol.fromString('{c/R}');
            expect(sym.hybrid).toBe(true);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = ColorlessHybridManaSymbol.fromString('c/w');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym1 = ColorlessHybridManaSymbol.fromString('c/u');
            expect(sym1.toString(false)).toBe('C/U');
            expect(sym1.toString(true)).toBe('{C/U}');
        });
    });
});
