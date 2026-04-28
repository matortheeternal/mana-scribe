import Symbol from './Symbol.js';
import { msr } from '../services/regExpService.js';

export default class GenericHybridManaSymbol extends Symbol {
    static match(str) {
        return str.match(msr`\d\/(\c|c)`);
    }

    get colors() {
        return this.raw.toUpperCase().split('/').filter(c => msr`\c`.test(c));
    }

    get type() {
        return 'genericHybridMana';
    }

    cmcValue() {
        return 1;
    }

    get hybrid() {
        return true;
    }
}
