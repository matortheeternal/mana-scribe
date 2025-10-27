import Symbol from './Symbol.js';

export default class VariableManaSymbol extends Symbol {
    static match(str) {
        return str.match(/^{[XYZ]}/i)
            || str.match(/^[XYZ]/i);
    }

    get type() {
        return 'variableMana';
    }

    cmcValue() {
        return 0;
    }
}
