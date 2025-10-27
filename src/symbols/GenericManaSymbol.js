import Symbol from './Symbol.js';

export default class GenericManaSymbol extends Symbol {
    static match(str) {
        return str.match(/^{[0-9][0-9]?}/)
            || str.match(/^[0-9][0-9]?/);
    }

    get type() {
        return 'genericMana';
    }

    cmcValue() {
        return parseInt(this.raw);
    }
}
