import ActivationCost from './costs/ActivationCost.js';
import ManaCost from './costs/ManaCost.js';
import manaRegistry from './services/ManaRegistry.js';

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

baseColors.forEach(color => manaRegistry.addColor(color));
baseTypes.forEach(type => manaRegistry.addManaType(type));

export { ActivationCost, ManaCost, manaRegistry };
