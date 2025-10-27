import Symbol from './Symbol.js';

export default class ColoredManaSymbol extends Symbol {
    static match(str) {
        return str.match(/^{[WUBRG]}/i)
            || str.match(/^[WUBRG]/i);
    }

    get colors() {
        return [this.raw];
    }

    get type() {
        return 'coloredMana';
    }

    cmcValue() {
        return 1;
    }
}
