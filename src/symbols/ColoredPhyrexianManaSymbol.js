import Symbol from './Symbol.js';
import { msr } from '../services/regExpService.js';

export default class ColoredPhyrexianManaSymbol extends Symbol {
    static match(str) {
        return str.match(msr`(H\/\c|\c\/H)`);
    }

    get colors() {
        return this.raw.toUpperCase().split('/').filter(c => c !== 'H');
    }

    get type() {
        return 'coloredPhyrexianMana';
    }

    cmcValue() {
        return 1;
    }
}
