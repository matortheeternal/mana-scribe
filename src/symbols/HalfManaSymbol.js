import Symbol from './Symbol.js';
import { msr } from '../services/regExpService.js';
import { symbolRegistry } from '../index.js';

export default class HalfManaSymbol extends Symbol {
    static match(str) {
        return str.match(msr`\|(\c|\T)`);
    }

    get colors() {
        const c = this.raw[1];
        const colorIds = symbolRegistry.colorKeys;
        return colorIds.includes(c) ? [c] : [];
    }

    get type() {
        return 'halfMana';
    }

    cmcValue() {
        return 0.5;
    }
}
