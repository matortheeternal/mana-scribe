import HybridManaSymbol from './HybridManaSymbol.js';

export default class TwoColorHybridManaSymbol extends HybridManaSymbol {
    static match(str) {
        return super.match(str, 2, /^{[WUBRG]\/[WUBRG]}/i)
            || super.match(str, 2, /^[WUBRG]\/[WUBRG]/i);
    }

    get type() {
        return 'twoColorHybridMana';
    }
}
