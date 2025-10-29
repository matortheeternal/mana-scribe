import HybridManaSymbol from './HybridManaSymbol.js';
import { msr } from '../services/regExpService.js';

export default class ThreeColorHybridManaSymbol extends HybridManaSymbol {
    static match(str) {
        return super.match(str, 3, msr`\c(\/\c){2}`);
    }

    get type() {
        return 'threeColorHybridMana';
    }
}
