export default [
    sym => sym.type === 'infiniteMana',
    sym => sym.type === 'variableMana',
    sym => sym.type === 'genericMana',
    sym => sym.type === 'typedMana',
    sym => sym.type.includes('colorless'),
    sym => sym.colors.length > 0,
    sym => sym.type === 'tap' || sym.type === 'untap',
]