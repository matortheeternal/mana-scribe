import Symbol from './Symbol.js';

export default class GenericHybridManaSymbol extends Symbol {
    static match(str) {
        return str.match(/^{\d\/([WUBRGC])}/i)
            || str.match(/^\d\/([WUBRGC])/i)
    }

    get colors() {
        return this.raw.split('/').filter(c => 'WUBRG'.includes(c));
    }

    cmcValue() {
        return 1;
    }
}
