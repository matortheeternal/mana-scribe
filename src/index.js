import ActivationCost from './costs/ActivationCost.js';
import ManaCost from './costs/ManaCost.js';
import colorRegistry from './registries/ColorRegistry.js';
import manaTypeRegistry from './registries/ManaTypeRegistry.js';

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

baseColors.forEach(color => colorRegistry.add(color));
baseTypes.forEach(type => manaTypeRegistry.add(type));

export { ActivationCost, ManaCost, manaTypeRegistry, colorRegistry };
