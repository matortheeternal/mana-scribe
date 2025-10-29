import { ActivationCost } from '../../src/index.js';

describe('ActivationCost (E2E)', () => {
    describe('parsing non-mana symbols', () => {
        it('parses tap symbol', () => {
            const cost = ActivationCost.parse('T');
            expect(cost.symbols.length).toBe(1);
            expect(cost.symbols[0].type).toBe('tap');
        });

        it('parses untap symbol', () => {
            const cost = ActivationCost.parse('{Q}');
            expect(cost.symbols[0].type).toBe('untap');
        });

        it('parses energy symbol', () => {
            const cost = ActivationCost.parse('{E}');
            expect(cost.symbols[0].type).toBe('energy');
        });
    });

    describe('mixed activation + mana costs', () => {
        it('parses {2}{R}{T}', () => {
            const cost = ActivationCost.parse('{2}{R}{T}');
            const types = cost.symbols.map(s => s.type);
            expect(types).toContain('genericMana');
            expect(types).toContain('coloredMana');
            expect(types).toContain('tap');
            expect(cost.colors).toEqual(['R']);
        });

        it('parses {E}{W}{Q}', () => {
            const cost = ActivationCost.parse('{E}{W}{Q}');
            const types = cost.symbols.map(s => s.type);
            expect(types).toEqual(['energy','coloredMana','untap']);
            expect(cost.colors).toEqual(['W']);
        });
    });

    describe('case insensitivity', () => {
        it('parses lowercase {t}{q}{e}{w}', () => {
            const cost = ActivationCost.parse('{t}{q}{e}{w}');
            const types = cost.symbols.map(s => s.type);
            expect(types).toEqual(['tap','untap','energy','coloredMana']);
            expect(cost.colors).toEqual(['W']);
        });
    });

    describe('serialization', () => {
        it('serializes back to string with braces', () => {
            const input = '{2}{U}{T}{E}';
            const cost = ActivationCost.parse(input);
            expect(cost.toString(true)).toBe(input);
        });
    });

    describe('error handling', () => {
        it('stops parsing at invalid symbol', () => {
            const cost = ActivationCost.parse('{W}, T:');
            expect(cost.symbols.length).toBe(1);
            expect(cost.symbols[0].type).toBe('coloredMana');
            expect(cost.remainingStr).toBe(', T:');
        });
    });
});
