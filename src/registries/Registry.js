import { RegistryError } from '../customErrors.js';

export default class Registry {
    constructor() {
        this.items = new Map();
    }

    getKey(item) {
        return item.id;
    }

    add(item) {
        const key = this.getKey(item);
        if (this.items.has(key))
            throw new RegistryError(`Item "${key}" already registered`);
        this.items.set(key, item);
    }

    getValues(key) {
        return [...this.items.values().map(v => v[key])];
    }

    reset() {
        this.items = new Map();
    }
}
