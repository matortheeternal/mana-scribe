import ColoredPhyrexianManaSymbol from '../../src/symbols/ColoredPhyrexianManaSymbol.js';

describe('ColoredPhyrexianManaSymbol', () => {
    describe('fromString()', () => {
        it('creates a symbol from H/W and W/H (braced and shortform)', () => {
            const s1 = ColoredPhyrexianManaSymbol.fromString('H/W');
            expect(s1.raw).toBe('H/W');
            expect(s1.colors).toEqual(['W']);

            const s2 = ColoredPhyrexianManaSymbol.fromString('{W/H}');
            expect(s2.raw).toBe('W/H');
            expect(s2.colors).toEqual(['W']);
        });

        it('is case insensitive', () => {
            const s1 = ColoredPhyrexianManaSymbol.fromString('{h/b}');
            expect(s1.raw).toBe('H/B');
            expect(s1.colors).toEqual(['B']);

            const s2 = ColoredPhyrexianManaSymbol.fromString('u/h');
            expect(s2.raw).toBe('U/H');
            expect(s2.colors).toEqual(['U']);
        });

        it('throws for invalid input', () => {
            expect(() => ColoredPhyrexianManaSymbol.fromString('{U}')).toThrow();
            expect(() => ColoredPhyrexianManaSymbol.fromString('2/W')).toThrow();
            expect(() => ColoredPhyrexianManaSymbol.fromString('{C}')).toThrow();
        });

        for (const c of 'WUBRG') {
            it(`parses H/${c} and ${c}/H correctly`, () => {
                const sym1 = ColoredPhyrexianManaSymbol.fromString(`H/${c}`);
                expect(sym1.colors).toEqual([c]);

                const sym2 = ColoredPhyrexianManaSymbol.fromString(`${c}/H`);
                expect(sym2.colors).toEqual([c]);
            });
        }

    });

    describe('properties', () => {
        it('has type coloredPhyrexianMana', () => {
            const sym = ColoredPhyrexianManaSymbol.fromString('H/G');
            expect(sym.type).toBe('coloredPhyrexianMana');
        });

        it('cmcValue is always 1', () => {
            expect(ColoredPhyrexianManaSymbol.fromString('H/U').cmcValue()).toBe(1);
            expect(ColoredPhyrexianManaSymbol.fromString('B/H').cmcValue()).toBe(1);
        });
    });

    describe('inherited methods', () => {
        it('apply() pushes to array', () => {
            const arr = [];
            const sym = ColoredPhyrexianManaSymbol.fromString('H/R');
            sym.apply(arr);
            expect(arr[0]).toBe(sym);
        });

        it('toString() outputs correctly', () => {
            const sym = ColoredPhyrexianManaSymbol.fromString('W/H');
            expect(sym.toString(false)).toBe('W/H');
            expect(sym.toString(true)).toBe('{W/H}');
        });
    });
});
