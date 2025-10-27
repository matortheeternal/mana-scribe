import NonManaSymbol from './NonManaSymbol.js';

export default class UntapSymbol extends NonManaSymbol {
    static match(str) {
        return str.match(/^{Q}/i)
            || str.match(/^Q/i);
    }

    get type() {
        return 'untap';
    }
}
