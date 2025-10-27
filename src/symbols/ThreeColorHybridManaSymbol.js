import HybridManaSymbol from './HybridManaSymbol.js';

export default class ThreeColorHybridManaSymbol extends HybridManaSymbol {
    static match(str) {
        return super.match(str, 3, /^{[WUBRG](\/[WUBRG]){2}}/i)
            || super.match(str, 3, /^[WUBRG](\/[WUBRG]){2}/i);
    }

    get type() {
        return 'threeColorHybridMana';
    }
}
