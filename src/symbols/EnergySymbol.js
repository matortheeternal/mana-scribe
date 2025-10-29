import NonManaSymbol from './NonManaSymbol.js';
import { msr } from '../services/regExpService.js';

export default class EnergySymbol extends NonManaSymbol {
    static match(str) {
        return str.match(msr`E`);
    }

    get type() {
        return 'energy';
    }
}
