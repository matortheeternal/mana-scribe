import customManaRegistry from './ManaRegistry.js';

export function msr(str) {
    const colorKeys = customManaRegistry.getColorKeys().join('');
    const mTypeKeys = customManaRegistry.getManaTypeKeys().join('');
    const pstr = str.raw[0]
        .replaceAll('\\c', '[' + colorKeys + ']')
        .replaceAll('\\T', '[' + mTypeKeys + ']');
    return new RegExp(`^({${pstr}}|${pstr})`, 'i');
}
