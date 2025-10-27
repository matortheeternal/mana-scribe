import Symbol from './Symbol.js';

export default class ColorlessManaSymbol extends Symbol {
    static match(str) {
        return str.match(/^{C}/i)
            || str.match(/^C/i);
    }

    get colors() {
        return [];
    }

    get type() {
        return 'colorlessMana';
    }

    cmcValue() {
        return 1;
    }
}
