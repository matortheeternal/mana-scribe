import HybridManaSymbol from './HybridManaSymbol.js';
import { msr } from '../services/regExpService.js';

export default class TwoColorHybridManaSymbol extends HybridManaSymbol {
    static match(str) {
        return super.match(str, 2, msr`\c\/\c`);
    }

    get type() {
        return 'twoColorHybridMana';
    }
}
