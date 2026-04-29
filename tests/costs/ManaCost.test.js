import { ManaCost } from '../../src/index.js';

beforeAll(() => {
    jasmine.addMatchers({
        toEqualCost: () => ({
            compare: (actual, expected) => ({
                pass: actual.equals(expected),
                message: `Expected ${actual.toString()} to equal ${expected.toString()}`
            })
        }),
        toBeGreaterThanCost: () => ({
            compare: (actual, expected) => ({
                pass: actual.greaterThan(expected),
                message: `Expected ${actual.toString()} to be greater than ${expected.toString()}`
            })
        }),
        toBeLessThanCost: () => ({
            compare: (actual, expected) => ({
                pass: actual.lessThan(expected),
                message: `Expected ${actual.toString()} to be less than ${expected.toString()}`
            })
        })
    });
});

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
            expect(cost.symbols[0].type).toBe('halfMana');
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
            expect(cost.symbols[0].type).toBe('typedMana');
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
            expect(types).toContain('typedMana');
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

    describe('comparison', () => {
        it('treats identical costs as equal', () => {
            const a = ManaCost.parse('3BBB');
            const b = ManaCost.parse('3BBB');
            expect(a).toEqualCost(b);
            expect(a).not.toBeGreaterThanCost(b);
            expect(a).not.toBeLessThanCost(b);
        });

        it('detects superset correctly (greaterThan)', () => {
            const a = ManaCost.parse('3BBB'); // has extra generic
            const b = ManaCost.parse('BBB');
            expect(a).toBeGreaterThanCost(b);
            expect(b).toBeLessThanCost(a);
            expect(a).not.toBeLessThanCost(b);
            expect(b).not.toBeGreaterThanCost(a);
        });

        it('works with extra colored mana', () => {
            const a = ManaCost.parse('WW');
            const b = ManaCost.parse('W');
            expect(a).toBeGreaterThanCost(b);
            expect(b).toBeLessThanCost(a);
        });

        it('does not allow generic to cover colored costs', () => {
            const a = ManaCost.parse('{2}W');  // 2 generic + 1 white
            const b = ManaCost.parse('WW');    // 2 white
            expect(a).not.toBeGreaterThanCost(b);
            expect(a).not.toEqualCost(b);
        });

        it('treats disjoint colored costs as not comparable', () => {
            const a = ManaCost.parse('W');
            const b = ManaCost.parse('U');
            expect(a).not.toBeGreaterThanCost(b);
            expect(b).not.toBeGreaterThanCost(a);
            expect(a).not.toEqualCost(b);
        });

        it('compares generic counts correctly', () => {
            const a = ManaCost.parse('{3}');
            const b = ManaCost.parse('{2}');
            const c = ManaCost.parse('{3}');
            expect(a).toBeGreaterThanCost(b);
            expect(b).toBeLessThanCost(a);
            expect(a).toEqualCost(c);
        });

        it('empty vs non-empty costs', () => {
            const a = ManaCost.parse('');
            const b = ManaCost.parse('W');
            expect(a).toBeLessThanCost(b);
            expect(b).toBeGreaterThanCost(a);
            expect(a).not.toEqualCost(b);
        });

        it('handles variable mana (X) as incomparable', () => {
            const a = ManaCost.parse('X');
            const b = ManaCost.parse('3');
            expect(a).not.toEqualCost(b);
            expect(a).not.toBeGreaterThanCost(b);
            expect(a).not.toBeLessThanCost(b);
        });

        it('handles infinite mana (I)', () => {
            const a = ManaCost.parse('I');
            const b = ManaCost.parse('100');
            expect(a).toBeGreaterThanCost(b);
            expect(b).toBeLessThanCost(a);
        });
    });

    describe('error handling', () => {
        it('stops parsing at invalid symbol and sets remainingStr', () => {
            const cost = ManaCost.parse('WQZ');
            expect(cost.symbols[0].type).toBe('coloredMana');
            expect(cost.remainingStr).toBe('QZ');
        });
    });

    describe('ordering', () => {
        const getPermutations = (symbols) => {
            if (symbols.length <= 1) return [symbols[0].raw];
            const result = [];
            for (let i = 0; i < symbols.length; i++) {
                const sym = symbols[i];
                const remainingSymbols = [...symbols.slice(0, i), ...symbols.slice(i + 1)];
                for (const permutation of getPermutations(remainingSymbols))
                    result.push([sym.raw, ...permutation]);
            }
            return result;
        };

        const testAllPermutations = (str, curlies = false) => {
            const cost = ManaCost.parse(str);
            const permutations = getPermutations(cost.symbols);
            permutations.forEach(p => {
                const input = p.join('');
                it(`should order ${input} as ${str}`, () => {
                    expect(ManaCost.parse(input).toString(curlies)).toBe(str);
                });
            });
        };

        it('should order infinity symbol first', () => {
            const cost = ManaCost.parse('5CSWUBRGI');
            expect(cost.toString()).toBe('I5SCWUBRG');
        });

        it('should order generic mana symbols before colored mana symbols', () => {
            const cost = ManaCost.parse('WUBRG2');
            expect(cost.toString()).toBe('2WUBRG');
        });

        it('should order variable mana symbols before generic mana symbols', () => {
            const cost = ManaCost.parse('RYR2X');
            expect(cost.toString()).toBe('YX2RR');
        });

        it('should order typed mana symbols after generic mana symbols', () => {
            const cost = ManaCost.parse('S1R');
            expect(cost.toString()).toBe('1SR');
        });

        it('should order colorless mana symbols after generic mana symbols', () => {
            const cost = ManaCost.parse('C3');
            expect(cost.toString()).toBe('3C');
        });

        describe('two color symbol order', () => {
            describe('Azorius', () => testAllPermutations('WU'));
            describe('Dimir', () => testAllPermutations('UB'));
            describe('Rakdos', () => testAllPermutations('BR'));
            describe('Gruul', () => testAllPermutations('RG'));
            describe('Selesnya', () => testAllPermutations('GW'));
            describe('Orzhov', () => testAllPermutations('WB'));
            describe('Izzet', () => testAllPermutations('UR'));
            describe('Golgari', () => testAllPermutations('BG'));
            describe('Boros', () => testAllPermutations('RW'));
            describe('Simic', () => testAllPermutations('GU'));
        });

        describe('three color symbol order', () => {
            describe('shards', () => {
                describe('Bant', () => testAllPermutations('GWU'));
                describe('Esper', () => testAllPermutations('WUB'));
                describe('Grixis', () => testAllPermutations('UBR'));
                describe('Jund', () => testAllPermutations('BRG'));
                describe('Naya', () => testAllPermutations('RGW'));
            });

            describe('wedges', () => {
                describe('Abzan', () => testAllPermutations('WBG'));
                describe('Jeskai', () => testAllPermutations('URW'));
                describe('Sultai', () => testAllPermutations('BGU'));
                describe('Mardu', () => testAllPermutations('RWB'));
                describe('Temur', () => testAllPermutations('GUR'));
            });
        });

        describe('four color symbol order', () => {
            describe('Non-Red', () => testAllPermutations('GWUB'));
            describe('Non-Green', () => testAllPermutations('WUBR'));
            describe('Non-White', () => testAllPermutations('UBRG'));
            describe('Non-Blue', () => testAllPermutations('BRGW'));
            describe('Non-Black', () => testAllPermutations('RGWU'));
        });

        describe('five color symbol order', () => {
            describe('WUBRG', () => testAllPermutations('WUBRG'));
        });

        describe('hybrid symbol order', () => {
            describe('three color', () => {
                describe('Arsenal Thresher', () => testAllPermutations('2W/BU'));
                describe('Bant Sureblade', () => testAllPermutations('G/UW'));
                describe('Defibrillating Current', () => testAllPermutations('2/R2/W2/B'));
                describe('Dragonclaw Strike', () => testAllPermutations('2/G2/U2/R'));
                describe('Evelyn, the Covetous', () => testAllPermutations('2U/BBB/R'));
            });

            describe('four color', () => {
                describe('The Fourteenth Doctor', () => testAllPermutations('R/GWU'));
            });

            describe('five color', () => {
                // Leyline of the Guildpact not working currently
                // describe('Leyline of the Guildpact', () => testAllPermutations('G/WG/UB/GR/G'));
                describe('Providence of Night', () => testAllPermutations('W/UU/BB/RR/GG/W'));
            });
        });
    })
});
