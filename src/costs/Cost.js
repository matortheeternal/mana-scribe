import { NotImplementedError } from '../customErrors.js';
import getSymbolOrder from '../symbolOrder.js';

export default class Cost {
    static get allowedSymbols() {
        throw new NotImplementedError('allowedSymbols');
    }

    static parse(str) {
        const cost = new this();
        cost.parseSymbols(str);
        return cost;
    }

    constructor(symbols = []) {
        this.symbols = symbols;
    }

    get colors() {
        const set = new Set(this.symbols.flatMap(sym => sym.colors));
        return [...set];
    }

    parseSymbols(str) {
        let remainingStr = str.trim();
        while (remainingStr.length) {
            const symbol = this.parseNextSymbol(remainingStr);
            if (!symbol) break;
            symbol.apply(this.symbols);
            if (remainingStr === symbol.remainingStr) break;
            remainingStr = symbol.remainingStr;
        }
        this.remainingStr = remainingStr;
    }

    parseNextSymbol(str) {
        for (const symbol of this.constructor.allowedSymbols) {
            const match = symbol.match(str);
            if (!match) continue;
            return symbol.parse(match, str);
        }
    }

    toString(useBraces = false, ordered = true) {
        if (!ordered)
            return this.symbols.map(sym => sym.toString(useBraces)).join('');

        const symbolOrder = getSymbolOrder(this);
        const getOrder = sym => symbolOrder.findIndex(fn => fn(sym));
        
        return [...this.symbols].sort((a, b) => {
            return getOrder(a) - getOrder(b);
        }).map(sym => {
            return sym.toString(useBraces);
        }).join('');
    }
}
