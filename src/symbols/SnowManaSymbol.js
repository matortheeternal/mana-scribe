import Symbol from './Symbol.js';

export default class SnowManaSymbol extends Symbol {
    static match(str) {
        return str.match(/^{S}/i)
            || str.match(/^S/i);
    }

    get colors() {
        return [];
    }

    get type() {
        return 'snowMana';
    }

    cmcValue() {
        return 1;
    }
}
