import Symbol from './Symbol.js';

export default class ColoredPhyrexianManaSymbol extends Symbol {
    static match(str) {
        return str.match(/^{(h\/[wubrgh]|[wubrg]\/h)}/i)
            || str.match(/^(h\/[wubrgh]|[wubrg]\/h)/i);
    }

    get colors() {
        return this.raw.split('/').filter(c => 'WUBRG'.includes(c));
    }

    get type() {
        return 'coloredPhyrexianMana';
    }

    cmcValue() {
        return 1;
    }
}
