import colorRegistry from '../registries/ColorRegistry.js';
import manaTypeRegistry from '../registries/ManaTypeRegistry.js';

export function msr(str) {
    const colors = colorRegistry.getValues('id').join('');
    const manaTypes = manaTypeRegistry.getValues('id').join('');
    const pstr = str.raw[0]
        .replaceAll('\\c', '[' + colors + ']')
        .replaceAll('\\T', '[' + manaTypes + ']');
    return new RegExp(`^({${pstr}}|${pstr})`, 'i');
}
