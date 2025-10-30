import { manaRegistry, ManaCost, ActivationCost } from '../../src/index.js';
import { AlreadyRegisteredError, SchemaError } from '../../src/customErrors.js';

const mr = manaRegistry;

describe('Mana registry', () => {
    describe('addColor', () => {
        it('adds a new color when using correct schema', () => {
            mr.addColor({ id: 'P', name: 'Purple' });
            const cost = ManaCost.parse('{P}{P/R}{P/H}');
            expect(cost.colors).toEqual(['P', 'R']);
            expect(cost.toString(true)).toBe('{P}{P/R}{P/H}');
        });

        it('throws if string id property is not provided', () => {
            expect(() => mr.addColor({ name: 'New Color' })).toThrowError(
                SchemaError, 'Color must have a string property "id"'
            );
            expect(() => mr, 'Color must have a string property "id"'
            );
            expect(() => mr.addColor({ id: '', name: 'Unknown' })).toThrowError(
                SchemaError, 'Color must have a string property "id"'
            );
        });

        it('throws if id length is not 1', () => {
            expect(() => mr.addColor({ id: 'JJ', name: 'Jump' })).toThrowError(
                SchemaError, 'Color property "id" length must be 1'
            );
        });

        it('throws if id was already registered', () => {
            expect(() => mr.addColor({ id: 'W', name: 'Willow' })).toThrowError(
                AlreadyRegisteredError, 'Color with id "W" already registered'
            );
            expect(() => mr.addColor({ id: 'L', name: 'Lilac' })).toThrowError(
                AlreadyRegisteredError, 'ManaType with id "L" already registered'
            );
        });

        it('throws if id is a reserved character', () => {
            expect(() => mr.addColor({ id: 'E', name: 'Energetic' })).toThrowError(
                SchemaError, 'Color id "E" is not allowed (used for Energy)'
            );
        });

        it('throws if name is not provided', () => {
            expect(() => mr.addColor({ id: 'P' })).toThrowError(
                SchemaError, 'Color must have a string property "name"'
            );
        });
    });

    describe('addManaType', () => {
        it('adds a new mana type when using correct schema', () => {
            mr.addManaType({ id: 'A', name: 'Artificial' });
            const cost = ActivationCost.parse('{A}{A}{T}');
            expect(cost.colors).toEqual([]);
            expect(cost.toString(true)).toBe('{A}{A}{T}');
        });

        it('throws if string id property is not provided', () => {
            expect(() => mr.addManaType({ name: 'New Type' })).toThrowError(
                SchemaError, 'ManaType must have a string property "id"'
            );
            expect(() => mr, 'ManaType must have a string property "id"'
            );
            expect(() => mr.addManaType({ id: '', name: 'Unknown' })).toThrowError(
                SchemaError, 'ManaType must have a string property "id"'
            );
        });

        it('throws if id length is not 1', () => {
            expect(() => mr.addManaType({ id: 'JJ', name: 'Jump' })).toThrowError(
                SchemaError, 'ManaType property "id" length must be 1'
            );
        });

        it('throws if id was already registered', () => {
            expect(() => mr.addManaType({ id: 'W', name: 'Willow' })).toThrowError(
                AlreadyRegisteredError, 'Color with id "W" already registered'
            );
            expect(() => mr.addManaType({ id: 'L', name: 'Lilac' })).toThrowError(
                AlreadyRegisteredError, 'ManaType with id "L" already registered'
            );
        });

        it('throws if id is a reserved character', () => {
            expect(() => mr.addManaType({ id: 'E', name: 'Energetic' })).toThrowError(
                SchemaError, 'ManaType id "E" is not allowed (used for Energy)'
            );
        });

        it('throws if name is not provided', () => {
            expect(() => mr.addManaType({ id: 'P' })).toThrowError(
                SchemaError, 'ManaType must have a string property "name"'
            );
        });
    });
});
