import symbolRegistry from './SymbolRegistry.js';

export function msr(str) {
    const colorKeys = symbolRegistry.colorKeys.join('');
    const mTypeKeys = symbolRegistry.manaTypeKeys.join('');
    const extraKeys = symbolRegistry.extraSymKeys.join('');
    const pstr = str.raw[0]
        .replaceAll('\\c', '[' + colorKeys + ']')
        .replaceAll('\\T', '[' + mTypeKeys + ']')
        .replaceAll('\\#', '[' + extraKeys + ']');
    return new RegExp(`^({${pstr}}|${pstr})`, 'i');
}
