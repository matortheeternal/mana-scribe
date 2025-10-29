import ColorlessManaSymbol from './ColorlessManaSymbol.js';
import { msr } from '../services/regExpService.js';

export default class ColorlessPhyrexianManaSymbol extends ColorlessManaSymbol {
    static match(str) {
        return str.match(msr`(h\/c|c\/h|h)`);
    }

    get type() {
        return 'colorlessPhyrexianMana';
    }
}
