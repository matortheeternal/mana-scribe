import HybridManaSymbol from './HybridManaSymbol.js';
import { msr } from '../services/regExpService.js';

export default class FourColorHybridManaSymbol extends HybridManaSymbol {
    static match(str) {
        return super.match(str, 4, msr`\c(\/\c){3}`);
    }

    get type() {
        return 'fourColorHybridMana';
    }
}
