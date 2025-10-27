import Symbol from './Symbol.js';

export default class NonManaSymbol extends Symbol {
    get colors() {
        return [];
    }

    cmcValue() {
        return 0;
    }
}
