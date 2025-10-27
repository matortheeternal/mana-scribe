import Symbol from './Symbol.js';

export default class HalfColoredManaSymbol extends Symbol {
    static match(str) {
        return str.match(/^{\|[WUBRGS]}/i)
            || str.match(/^\|[WUBRGS]/i);
    }

    get colors() {
        const c = this.raw[1];
        return c === 'S' ? [] : [c];
    }

    get type() {
        return 'halfColoredMana';
    }

    cmcValue() {
        return 0.5;
    }
}
