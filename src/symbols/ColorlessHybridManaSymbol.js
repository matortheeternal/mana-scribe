import Symbol from './Symbol.js';
import { msr } from '../services/regExpService.js';

export default class ColorlessHybridManaSymbol extends Symbol {
    static match(str) {
        return str.match(msr`c\/\c`);
    }

    get colors() {
        return this.raw.toUpperCase().split('/').filter(c => msr`\c`.test(c));
    }

    get type() {
        return 'colorlessHybridMana';
    }

    cmcValue() {
        return 1;
    }

    get hybrid() {
        return true;
    }
}
