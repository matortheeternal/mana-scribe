import Symbol from './Symbol.js';
import { msr } from '../services/regExpService.js';

export default class VariableManaSymbol extends Symbol {
    static match(str) {
        return str.match(msr`[XYZ]`);
    }

    get type() {
        return 'variableMana';
    }

    cmcValue() {
        return 0;
    }
}
