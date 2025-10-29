import Symbol from './Symbol.js';
import { msr } from '../services/regExpService.js';

export default class ColoredManaSymbol extends Symbol {
    static match(str) {
        return str.match(msr`\c`)
    }

    get colors() {
        return [this.raw];
    }

    get type() {
        return 'coloredMana';
    }

    cmcValue() {
        return 1;
    }
}
