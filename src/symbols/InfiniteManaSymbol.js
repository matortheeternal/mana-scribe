import Symbol from './Symbol.js';
import { msr } from '../services/regExpService.js';

export default class InfiniteManaSymbol extends Symbol {
    static match(str) {
        return str.match(msr`I`);
    }

    get type() {
        return 'infiniteMana';
    }

    cmcValue() {
        return Infinity;
    }
}
