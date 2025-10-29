import Symbol from './Symbol.js';
import { msr } from '../services/regExpService.js';

export default class GenericManaSymbol extends Symbol {
    static match(str) {
        return str.match(msr`[0-9][0-9]?`);
    }

    get type() {
        return 'genericMana';
    }

    cmcValue() {
        return parseInt(this.raw);
    }
}
