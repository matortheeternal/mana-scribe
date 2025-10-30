import HybridManaSymbol from './HybridManaSymbol.js';
import { msr } from '../services/regExpService.js';

export default class HybridPhyrexianManaSymbol extends HybridManaSymbol {
    static match(str) {
        return super.match(str, 3, msr`(H\/\c\/\c|\c\/H\/\c|\c\/\c\/H)`);
    }

    get colors() {
        return this.raw.split('/').filter(c => c !== 'H');
    }

    get type() {
        return 'hybridPhyrexianMana';
    }
}
