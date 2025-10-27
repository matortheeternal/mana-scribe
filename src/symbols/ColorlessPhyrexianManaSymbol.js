import ColorlessManaSymbol from './ColorlessManaSymbol.js';

export default class ColorlessPhyrexianManaSymbol extends ColorlessManaSymbol {
    static match(str) {
        return str.match(/^{(h\/c|c\/h|h)}/i)
            || str.match(/^(h\/c|c\/h|h)/i);
    }

    get type() {
        return 'colorlessPhyrexianMana';
    }
}
