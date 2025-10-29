import HybridManaSymbol from './HybridManaSymbol.js';
import { msr } from '../services/regExpService.js';

export default class FiveColorHybridManaSymbol extends HybridManaSymbol {
    static match(str) {
        return super.match(str, 5, msr`\c(\/\c){4}`);
    }

    get type() {
        return 'fiveColorHybridMana';
    }
}
