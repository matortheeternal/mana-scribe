import ActivationCost from './costs/ActivationCost.js';
import ManaCost from './costs/ManaCost.js';
import symbolRegistry from './services/SymbolRegistry.js';

const baseColors = [
    { id: 'W', name: 'White' },
    { id: 'U', name: 'Blue'  },
    { id: 'B', name: 'Black' },
    { id: 'R', name: 'Red'   },
    { id: 'G', name: 'Green' },
];

const baseTypes = [
    { id: 'S', name: 'Snow',     },
    { id: 'L', name: 'Legendary' },
];

const extraSymbols = [
    { id: 'E', name: 'Energy' }
];

baseColors.forEach(color => symbolRegistry.addColor(color));
baseTypes.forEach(type => symbolRegistry.addManaType(type));
extraSymbols.forEach(type => symbolRegistry.addExtraSym(type));

export { ActivationCost, ManaCost, symbolRegistry };
