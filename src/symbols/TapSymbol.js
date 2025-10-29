import NonManaSymbol from './NonManaSymbol.js';
import { msr } from '../services/regExpService.js';

export default class TapSymbol extends NonManaSymbol {
    static match(str) {
        return str.match(msr`T`);
    }

    get type() {
        return 'tap';
    }
}
