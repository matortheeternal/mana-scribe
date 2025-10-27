import NonManaSymbol from './NonManaSymbol.js';

export default class EnergySymbol extends NonManaSymbol {
    static match(str) {
        return str.match(/^{E}/i)
            || str.match(/^E/i);
    }

    get type() {
        return 'energy';
    }
}
