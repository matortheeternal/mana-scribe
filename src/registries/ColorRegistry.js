import { SchemaError } from '../customErrors.js';
import Registry from './Registry.js';

function validateColorSchema(item) {
    if (!item.id || item.id.constructor !== String)
        throw new SchemaError('Color must have a string "id"');
    if (!item.name || item.name.constructor !== String)
        throw new SchemaError('Color must have a string "name"');
}

class ColorRegistry extends Registry {
    add(item) {
        validateColorSchema(item);
        super.add(item);
    }
}

export default new ColorRegistry();
