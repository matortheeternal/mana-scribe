import ColorlessManaSymbol from './ColorlessManaSymbol.js';
import { msr } from '../services/regExpService.js';

export default class ColorlessPhyrexianManaSymbol extends ColorlessManaSymbol {
    static match(str) {
        return str.match(msr`(H\/c|c\/H|H)`);
    }

    get type() {
        return 'colorlessPhyrexianMana';
    }
}
