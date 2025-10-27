import ManaCost from '../../src/costs/ManaCost.js';

describe('ManaCost (E2E)', () => {
    describe('parsing simple costs', () => {
        it('parses generic numbers', () => {
            const cost = ManaCost.parse('3');
            expect(cost.symbols.length).toBe(1);
            expect(cost.symbols[0].type).toBe('genericMana');
            expect(cost.cmc).toBe(3);
            expect(cost.colors).toEqual([]);
        });

        it('parses colored mana', () => {
            const cost = ManaCost.parse('WUBRG');
            expect(cost.symbols.map(s => s.type)).toEqual([
                'coloredMana','coloredMana','coloredMana','coloredMana','coloredMana'
            ]);
            expect(cost.cmc).toBe(5);
            expect(cost.colors.sort()).toEqual(['B','G','R','U','W']);
        });
    });

    describe('hybrid and phyrexian costs', () => {
        it('parses two-color hybrid', () => {
            const cost = ManaCost.parse('{G/U}');
            expect(cost.symbols.length).toBe(1);
            expect(cost.symbols[0].type).toBe('twoColorHybridMana');
            expect(cost.cmc).toBe(1);
            expect(cost.colors.sort()).toEqual(['G','U']);
        });

        it('parses generic hybrid', () => {
            const cost = ManaCost.parse('2/W');
            expect(cost.symbols[0].type).toBe('genericHybridMana');
            expect(cost.cmc).toBe(1);
            expect(cost.colors).toEqual(['W']);
        });

        it('parses colored phyrexian', () => {
            const cost = ManaCost.parse('R/H');
            expect(cost.symbols[0].type).toBe('coloredPhyrexianMana');
            expect(cost.cmc).toBe(1);
            expect(cost.colors).toEqual(['R']);
        });

        it('parses colorless phyrexian', () => {
            const cost = ManaCost.parse('{H}');
            expect(cost.symbols[0].type).toBe('colorlessPhyrexianMana');
            expect(cost.cmc).toBe(1);
            expect(cost.colors).toEqual([]);
        });
    });

    describe('special symbols', () => {
        it('parses half mana', () => {
            const cost = ManaCost.parse('|G');
            expect(cost.symbols[0].type).toBe('halfColoredMana');
            expect(cost.cmc).toBe(0.5);
            expect(cost.colors).toEqual(['G']);
        });

        it('parses variable mana (X)', () => {
            const cost = ManaCost.parse('X');
            expect(cost.symbols[0].type).toBe('variableMana');
            expect(cost.cmc).toBe(0);
        });

        it('parses infinity', () => {
            const cost = ManaCost.parse('I');
            expect(cost.symbols[0].type).toBe('infiniteMana');
            expect(cost.cmc).toBe(Infinity);
        });

        it('parses snow mana', () => {
            const cost = ManaCost.parse('S');
            expect(cost.symbols[0].type).toBe('snowMana');
            expect(cost.cmc).toBe(1);
        });

        it('parses colorless mana', () => {
            const cost = ManaCost.parse('C');
            expect(cost.symbols[0].type).toBe('colorlessMana');
            expect(cost.cmc).toBe(1);
        });
    });

    describe('complex costs', () => {
        it('parses a mixed cost string', () => {
            const cost = ManaCost.parse('{3}{W}{U}{B}{R}{G}{2/W}{G/U}{H}{S}{X}{C}');
            const types = cost.symbols.map(s => s.type);
            expect(types).toContain('genericMana');
            expect(types).toContain('coloredMana');
            expect(types).toContain('genericHybridMana');
            expect(types).toContain('twoColorHybridMana');
            expect(types).toContain('colorlessPhyrexianMana');
            expect(types).toContain('snowMana');
            expect(types).toContain('variableMana');
            expect(types).toContain('colorlessMana');
            expect(cost.cmc).toBe(13);
            expect(cost.colors.sort()).toEqual(['B','G','R','U','W']);
        });

        it('computes devotion correctly', () => {
            const cost = ManaCost.parse('WWWU');
            expect(cost.getDevotionTo('W')).toBe(3);
            expect(cost.getDevotionTo('U')).toBe(1);
            expect(cost.getDevotionTo('B')).toBe(0);
        });

        it('serializes back to string', () => {
            const input = '{3}{W}{U}{B}{R}{G}';
            const cost = ManaCost.parse(input);
            expect(cost.toString(true)).toBe(input);
        });
    });

    describe('error handling', () => {
        it('stops parsing at invalid symbol and sets remainingStr', () => {
            const cost = ManaCost.parse('WQZ'); // W is valid, Q is not a mana symbol here
            expect(cost.symbols[0].type).toBe('coloredMana');
            expect(cost.remainingStr).toBe('QZ');
        });
    });
});
