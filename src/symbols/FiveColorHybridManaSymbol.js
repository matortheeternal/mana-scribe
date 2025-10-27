import HybridManaSymbol from './HybridManaSymbol.js';

export default class FiveColorHybridManaSymbol extends HybridManaSymbol {
    static match(str) {
        return super.match(str, 5, /^{[WUBRG](\/[WUBRG]){4}}/i)
            || super.match(str, 5, /^[WUBRG](\/[WUBRG]){4}/i);
    }

    get type() {
        return 'fiveColorHybridMana';
    }
}
