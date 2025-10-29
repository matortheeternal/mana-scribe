import Symbol from './Symbol.js';
import { msr } from '../services/regExpService.js';

export default class ColoredPhyrexianManaSymbol extends Symbol {
    static match(str) {
        return str.match(msr`(h\/\c|\c\/h)`);
    }

    get colors() {
        return this.raw.split('/').filter(c => 'WUBRG'.includes(c));
    }

    get type() {
        return 'coloredPhyrexianMana';
    }

    cmcValue() {
        return 1;
    }
}
