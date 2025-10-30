import { AlreadyRegisteredError, SchemaError } from '../customErrors.js';

const ReservedIds = {
    H: 'Phyrexian',
    I: 'Infinite Mana',
    E: 'Energy',
    Q: 'Untap',
    T: 'Tap',
    X: 'Variable Mana',
    Y: 'Variable Mana',
    Z: 'Variable Mana',
};

function validateSchema(item, label) {
    if (!item.id || item.id.constructor !== String)
        throw new SchemaError(`${label} must have a string property "id"`);
    if (item.id.length !== 1)
        throw new SchemaError(`${label} property "id" length must be 1`);
    if (ReservedIds.hasOwnProperty(item.id))
        throw new SchemaError(
            `${label} id "${item.id}" is not allowed (used for ${ReservedIds[item.id]})`
        );
    if (!item.name || item.name.constructor !== String)
        throw new SchemaError(`${label} must have a string property "name"`);
}

class ManaRegistry {
    constructor() {
        this.colors = new Map();
        this.manaTypes = new Map();
    }

    checkIfRegistered(key) {
        if (this.colors.has(key))
            throw new AlreadyRegisteredError('Color', key);
        if (this.manaTypes.has(key))
            throw new AlreadyRegisteredError('ManaType', key);
    }

    addColor(item) {
        validateSchema(item, 'Color');
        const key = item.id;
        this.checkIfRegistered(key);
        this.colors.set(key, item);
    }

    addManaType(item) {
        validateSchema(item, 'ManaType');
        const key = item.id;
        this.checkIfRegistered(key);
        this.manaTypes.set(key, item);
    }

    getColorKeys() {
        return [...this.colors.keys()];
    }

    getManaTypeKeys() {
        return [...this.manaTypes.keys()];
    }
}

export default new ManaRegistry();
