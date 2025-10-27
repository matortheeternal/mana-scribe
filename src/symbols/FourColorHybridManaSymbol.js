import HybridManaSymbol from './HybridManaSymbol.js';

export default class FourColorHybridManaSymbol extends HybridManaSymbol {
    static match(str) {
        return super.match(str, 4, /^{[WUBRG](\/[WUBRG]){3}}/i)
            || super.match(str, 4, /^[WUBRG](\/[WUBRG]){3}/i);
    }

    get type() {
        return 'fourColorHybridMana';
    }
}
