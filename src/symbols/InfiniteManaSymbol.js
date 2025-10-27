import Symbol from './Symbol.js';

export default class InfiniteManaSymbol extends Symbol {
    static match(str) {
        return str.match(/^{I}/i)
            || str.match(/^I/i)
    }

    get type() {
        return 'infiniteMana';
    }

    cmcValue() {
        return Infinity;
    }
}
