import Symbol from './Symbol.js';
import { msr } from '../services/regExpService.js';

export default class ColoredPhyrexianManaSymbol extends Symbol {
    static match(str) {
        return str.match(msr`(H\/\c|\c\/H)`);
    }

    get colors() {
        return this.raw.split('/').filter(c => msr`\c`.test(c));
    }

    get type() {
        return 'coloredPhyrexianMana';
    }

    cmcValue() {
        return 1;
    }
}
