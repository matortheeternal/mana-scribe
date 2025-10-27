import Symbol from './Symbol.js';

function getHybridCount(str) {
    return new Set(str.split('/')).size;
}

export default class HybridManaSymbol extends Symbol {
    static match(str, hybridCount, expr) {
        const matchData = str.match(expr);
        if (!matchData || getHybridCount(matchData[0]) !== hybridCount) return;
        return matchData;
    }

    get colors() {
        return this.raw.split('/');
    }

    cmcValue() {
        return 1;
    }
}
