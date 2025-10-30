import ManaCost from '../src/costs/ManaCost.js';
import ActivationCost from '../src/costs/ActivationCost.js';

describe('Real-world integration', () => {
    describe('ManaCost', () => {
        it('Emrakul ({15})', () => {
            const cost = ManaCost.parse('{15}');
            expect(cost.cmc).toBe(15);
            expect(cost.colors).toEqual([]);
            expect(cost.remainingStr).toBe('');
            expect(cost.toString(true)).toBe('{15}');
        });

        it('Niv-Mizzet Reborn ({W}{U}{B}{R}{G})', () => {
            const cost = ManaCost.parse('{W}{U}{B}{R}{G}');
            expect(cost.cmc).toBe(5);
            expect(cost.colors.sort()).toEqual(['B','G','R','U','W']);
            expect(cost.getDevotionTo('W')).toBe(1);
            expect(cost.remainingStr).toBe('');
        });

        it('Phyrexian Metamorph ({3}{U/P} as {3}{U/H})', () => {
            const cost = ManaCost.parse('{3}{U/H}');
            expect(cost.cmc).toBe(4);
            expect(cost.colors).toEqual(['U']);
            expect(cost.remainingStr).toBe('');
        });

        it('cost with trailing reminder text', () => {
            const str = '{1}{U}{U}{U} (choose two…)';
            const cost = ManaCost.parse(str);
            expect(cost.cmc).toBe(4);
            expect(cost.colors).toEqual(['U']);
            expect(cost.remainingStr).toBe(' (choose two…)');
        });
    });

    describe('ActivationCost', () => {
        it('tap then text', () => {
            const str = '{T}: Add {G}.';
            const cost = ActivationCost.parse(str);
            expect(cost.symbols.map(s => s.type)).toEqual(['tap']);
            expect(cost.colors).toEqual([]);
            expect(cost.remainingStr).toBe(': Add {G}.');
        });

        it('mana, then comma and tap + text (stops at comma)', () => {
            const str = '{1}{B}, {T}, Discard a card: Create a 2/2 Zombie.';
            const cost = ActivationCost.parse(str);
            expect(cost.symbols.map(s => s.type)).toEqual(['genericMana','coloredMana']);
            expect(cost.colors).toEqual(['B']);
            expect(cost.remainingStr).toBe(', {T}, Discard a card: Create a 2/2 Zombie.');
        });

        it('untap then text (stops at comma)', () => {
            const str = '{Q}, Pay 2 life: Untap target creature.';
            const cost = ActivationCost.parse(str);
            expect(cost.symbols.map(s => s.type)).toEqual(['untap']);
            expect(cost.colors).toEqual([]);
            expect(cost.remainingStr).toBe(', Pay 2 life: Untap target creature.');
        });

        it('energy then text (stops at comma)', () => {
            const str = '{E}, {T}: Deal 1 damage.';
            const cost = ActivationCost.parse(str);
            expect(cost.symbols.map(s => s.type)).toEqual(['extra']);
            expect(cost.colors).toEqual([]);
            expect(cost.remainingStr).toBe(', {T}: Deal 1 damage.');
        });

        it('mixed shortform + braces then text (stops at comma)', () => {
            const str = '2R, {T}: Ping.';
            const cost = ActivationCost.parse(str);
            // Only "2" then "R" get parsed; stops at the comma before {T}
            expect(cost.symbols.map(s => s.type)).toEqual(['genericMana','coloredMana']);
            expect(cost.colors).toEqual(['R']);
            expect(cost.remainingStr).toBe(', {T}: Ping.');
        });
    });
});
