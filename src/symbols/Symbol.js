import { NotImplementedError } from '../customErrors.js';

export default class Symbol {
    static match(str) {
        throw new NotImplementedError('match');
    }

    static fromString(str) {
        const matchData = this.match(str);
        if (!matchData)
            throw new Error(`Invalid ${this.name} input: ${str}`);
        return this.parse(matchData, str);
    }

    static parse(match, str) {
        return new this(match, str);
    }

    constructor(match, str) {
        const raw = match[0];
        this.raw = (raw[0] === '{' ? raw.slice(1, -1) : raw).toUpperCase();
        this.remainingStr = str.slice(match[0].length);
    }

    get type() {
        throw new NotImplementedError('type');
    }

    get cmcValue() {
        throw new NotImplementedError('cmcValue');
    }

    get colors() {
        return [];
    }

    apply(symbols) {
        symbols.push(this);
    }

    toString(useBraces = false) {
        return useBraces ? `{${this.raw}}` : this.raw;
    }
}
