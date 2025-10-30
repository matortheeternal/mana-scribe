import { symbolRegistry, ManaCost, ActivationCost } from '../../src/index.js';
import { AlreadyRegisteredError, SchemaError } from '../../src/customErrors.js';

const sr = symbolRegistry;

describe('Symbol registry', () => {
    describe('addColor', () => {
        it('adds a new color when using correct schema', () => {
            sr.addColor({ id: 'P', name: 'Purple' });
            const cost = ManaCost.parse('{P}{P/R}{P/H}');
            expect(cost.colors).toEqual(['P', 'R']);
            expect(cost.toString(true)).toBe('{P}{P/R}{P/H}');
        });

        it('throws if string id property is not provided', () => {
            expect(() => sr.addColor({ name: 'New Color' })).toThrowError(
                SchemaError, 'Color must have a string property "id"'
            );
            expect(() => sr, 'Color must have a string property "id"'
            );
            expect(() => sr.addColor({ id: '', name: 'Unknown' })).toThrowError(
                SchemaError, 'Color must have a string property "id"'
            );
        });

        it('throws if id length is not 1, unless it is a single char escape', () => {
            expect(() => sr.addColor({ id: 'JJ', name: 'Jump' })).toThrowError(
                SchemaError, 'Color property "id" length must be 1'
            );
            expect(() => sr.addColor({ id: '\\$', name: 'Money' })).not.toThrowError(
                SchemaError, 'Color property "id" length must be 1'
            );
        });

        it('throws if id was already registered', () => {
            expect(() => sr.addColor({ id: 'W', name: 'Willow' })).toThrowError(
                AlreadyRegisteredError, 'Color with id "W" already registered'
            );
            expect(() => sr.addColor({ id: 'L', name: 'Lilac' })).toThrowError(
                AlreadyRegisteredError, 'ManaType with id "L" already registered'
            );
        });

        it('throws if id is a reserved character', () => {
            expect(() => sr.addColor({ id: 'T', name: 'Turquoise' })).toThrowError(
                SchemaError, 'Color id "T" is not allowed (used for Tap)'
            );
        });

        it('throws if name is not provided', () => {
            expect(() => sr.addColor({ id: 'P' })).toThrowError(
                SchemaError, 'Color must have a string property "name"'
            );
        });
    });

    describe('addManaType', () => {
        it('adds a new mana type when using correct schema', () => {
            sr.addManaType({ id: 'A', name: 'Artificial' });
            const cost = ActivationCost.parse('{A}{A}{T}');
            expect(cost.colors).toEqual([]);
            expect(cost.toString(true)).toBe('{A}{A}{T}');
        });

        it('throws if string id property is not provided', () => {
            expect(() => sr.addManaType({ name: 'New Type' })).toThrowError(
                SchemaError, 'ManaType must have a string property "id"'
            );
            expect(() => sr, 'ManaType must have a string property "id"'
            );
            expect(() => sr.addManaType({ id: '', name: 'Unknown' })).toThrowError(
                SchemaError, 'ManaType must have a string property "id"'
            );
        });

        it('throws if id length is not 1, unless it is a single char escape', () => {
            expect(() => sr.addManaType({ id: 'JJ', name: 'Jump' })).toThrowError(
                SchemaError, 'ManaType property "id" length must be 1'
            );
            expect(() => sr.addColor({ id: '\\$', name: 'Money' })).not.toThrowError(
                SchemaError, 'ManaType property "id" length must be 1'
            );
        });

        it('throws if id was already registered', () => {
            expect(() => sr.addManaType({ id: 'W', name: 'Willow' })).toThrowError(
                AlreadyRegisteredError, 'Color with id "W" already registered'
            );
            expect(() => sr.addManaType({ id: 'L', name: 'Lilac' })).toThrowError(
                AlreadyRegisteredError, 'ManaType with id "L" already registered'
            );
        });

        it('throws if id is a reserved character', () => {
            expect(() => sr.addManaType({ id: 'Q', name: 'Quick' })).toThrowError(
                SchemaError, 'ManaType id "Q" is not allowed (used for Untap)'
            );
        });

        it('throws if name is not provided', () => {
            expect(() => sr.addManaType({ id: 'P' })).toThrowError(
                SchemaError, 'ManaType must have a string property "name"'
            );
        });
    });
});
