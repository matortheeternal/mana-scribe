import NonManaSymbol from './NonManaSymbol.js';

export default class TapSymbol extends NonManaSymbol {
    static match(str) {
        return str.match(/^{T}/i)
            || str.match(/^T/i);
    }

    get type() {
        return 'tap';
    }
}
