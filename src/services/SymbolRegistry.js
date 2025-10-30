import { AlreadyRegisteredError, SchemaError } from '../customErrors.js';

const ReservedIds = {
    H: 'Phyrexian',
    I: 'Infinite Mana',
    Q: 'Untap',
    T: 'Tap',
    X: 'Variable Mana',
    Y: 'Variable Mana',
    Z: 'Variable Mana',
};

function isEscapedChar(str) {
    return str.length === 2 && str[0] === '\\';
}

function validateSchema(item, label) {
    if (!item.id || item.id.constructor !== String)
        throw new SchemaError(`${label} must have a string property "id"`);
    if (item.id.length !== 1 && !isEscapedChar(item.id))
        throw new SchemaError(`${label} property "id" length must be 1`);
    if (ReservedIds.hasOwnProperty(item.id))
        throw new SchemaError(
            `${label} id "${item.id}" is not allowed (used for ${ReservedIds[item.id]})`
        );
    if (!item.name || item.name.constructor !== String)
        throw new SchemaError(`${label} must have a string property "name"`);
}

class SymbolRegistry {
    constructor() {
        this.colors = new Map();
        this.manaTypes = new Map();
        this.extraSymbols = new Map();
    }

    checkIfRegistered(key) {
        if (this.colors.has(key))
            throw new AlreadyRegisteredError('Color', key);
        if (this.manaTypes.has(key))
            throw new AlreadyRegisteredError('ManaType', key);
        if (this.extraSymbols.has(key))
            throw new AlreadyRegisteredError('ExtraSym', key);
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

    addExtraSym(item) {
        validateSchema(item, 'ExtraSym');
        const key = item.id;
        this.checkIfRegistered(key);
        this.extraSymbols.set(key, item);
    }

    get colorKeys() {
        return [...this.colors.keys()];
    }

    get manaTypeKeys() {
        return [...this.manaTypes.keys()];
    }

    get extraSymKeys() {
        return [...this.extraSymbols.keys()];
    }
}

export default new SymbolRegistry();
