import NonManaSymbol from './NonManaSymbol.js';
import { msr } from '../services/regExpService.js';

export default class UntapSymbol extends NonManaSymbol {
    static match(str) {
        return str.match(msr`Q`);
    }

    get type() {
        return 'untap';
    }
}
