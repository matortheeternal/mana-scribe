import Symbol from './Symbol.js';
import { msr } from '../services/regExpService.js';

export default class HalfColoredManaSymbol extends Symbol {
    static match(str) {
        return str.match(msr`\|(\c|\T)`);
    }

    get colors() {
        const c = this.raw[1];
        return c === 'S' ? [] : [c];
    }

    get type() {
        return 'halfColoredMana';
    }

    cmcValue() {
        return 0.5;
    }
}
