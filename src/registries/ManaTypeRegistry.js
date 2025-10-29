import Registry from './Registry.js';
import {SchemaError} from '../customErrors.js';

function validateManaTypeSchema(item) {
    if (!item.id || item.id.constructor !== String)
        throw new SchemaError('ManaType must have a string "id"');
    if (!item.name || item.name.constructor !== String)
        throw new SchemaError('ManaType must have a string "name"');
}

class ManaTypeRegistry extends Registry {
    add(item) {
        validateManaTypeSchema(item);
        super.add(item);
    }
}

export default new ManaTypeRegistry();
