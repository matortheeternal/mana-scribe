import NonManaSymbol from './NonManaSymbol.js';
import { msr } from '../services/regExpService.js';

export default class ExtraSymbol extends NonManaSymbol {
    static match(str) {
        return str.match(msr`\#`);
    }

    get type() {
        return 'extra';
    }
}
