import Symbol from './Symbol.js';
import { msr } from '../services/regExpService.js';

// used for typed mana, like snow or legendary
export default class TypedManaSymbol extends Symbol {
    static match(str) {
        return str.match(msr`\T`);
    }

    get colors() {
        return [];
    }

    get type() {
        return 'typedMana';
    }

    cmcValue() {
        return 1;
    }
}
