/*
 * Two-Color Pairs: Ordered clockwise by the shortest distance on the card back (e.g., White-Blue is WU, not UW).
 * Three-Color (Shards/Allied): Clockwise on the wheel (e.g., Bant is GWU).
 * Three-Color (Wedges/Enemy): Often center the "opposite" or primary color.
 * Four-Color: Generally ordered clockwise with no gaps.
 * Five-Color: Always WUBRG.
 */

const baseColors = 'WUBRG';
const colorOrder = [ 'W', 'W/U', 'W/B', 'U', 'U/B', 'U/R', 'B', 'B/R', 'B/G', 'R', 'R/G', 'R/W', 'G', 'G/W', 'G/U' ];

const baseFunctions = [
    sym => sym.type === 'extra',
    sym => sym.type === 'infiniteMana',
    sym => sym.type === 'variableMana',
    sym => sym.type === 'genericMana',
    sym => sym.type === 'typedMana',
    sym => sym.type.includes('colorless')
];

const endFunctions = [
    sym => sym.type === 'tap',
    sym => sym.type === 'untap'
];

const colorFunctions = colorOrder.map(c => {
    const colorChars = c.split('/');
    return sym => sym.colors.length === colorChars.length
        && sym.colors.every(char => colorChars.includes(char));
});

// two-colors are always clockwise, minimizing distance.
// so it is RW because only G is between Red and White when traveling clockwise,
// whereas both Blue and Black are between W and R on the wheel when starting at W.

function rotateColorFunctions(rotation) {
    return [
        ...colorFunctions.slice(3 * rotation),
        ...colorFunctions.slice(0, 3 * rotation)
    ];
}

function getColorRotation(colors) {
    const results = [];
    for (let rotation = 0; rotation < baseColors.length; rotation++) {
        let rotatedColors = [
            ...baseColors.slice(rotation),
            ...baseColors.slice(0, rotation)
        ];
        const lastIndexes = colors.map(c => {
            return rotatedColors.lastIndexOf(c);
        });
        const firstIndexes = colors.map(c => {
            return rotatedColors.indexOf(c);
        });
        const last = Math.max(...lastIndexes);
        const first = Math.min(...firstIndexes);
        const size = last - first + 1;
        results.push(size);
    }
    const minValue = Math.min(...results);
    const maxValue = Math.max(...results);
    return {
        min: results.indexOf(minValue),
        minValue,
        max: results.indexOf(maxValue),
        maxValue
    };
}

const colorOffsetStrategies = [{
    test: (numColors, hasCustomColors) => {
        return hasCustomColors || numColors === 5 || numColors < 2;
    },
    apply: () => 0
}, {
    test: numColors => numColors === 3,
    apply: colors => {
        const { min, minValue, max } = getColorRotation(colors);
        return minValue === 4 ? max : min;
    }
}, {
    test: numColors => numColors === 4 || numColors === 2,
    apply: colors => {
        const { min } = getColorRotation(colors);
        return min;
    }
}];

function getColorCounts(cost) {
    return cost.symbols.reduce((colors, sym) => {
        sym.colors.forEach(c => {
            if (!colors.hasOwnProperty(c)) colors[c] = 0;
            colors[c] += 1;
        });
        return colors;
    }, {});
}

function getOrderColors(cost) {
    const coloredSymbols = cost.symbols.filter(sym => sym.colors.length);
    const allHybrid = coloredSymbols.length && coloredSymbols.every(sym => sym.hybrid);
    if (!allHybrid) return cost.colors;
    const colorCounts = getColorCounts(cost);
    const commonColor = Object.entries(colorCounts).find(([, value]) => {
        return value === coloredSymbols.length;
    });
    return cost.colors.filter(c => c !== commonColor?.[0]);
}

function getOrderRotation(cost) {
    const orderColors = getOrderColors(cost);
    const hasCustomColors = orderColors.some(color => {
        return baseColors.indexOf(color.toUpperCase()) === -1;
    });
    const strategy = colorOffsetStrategies.find(strategy => {
        return strategy.test(orderColors.length, hasCustomColors);
    });
    return strategy.apply(orderColors);
}

export default function getSymbolOrder(cost) {
    const rotationAmount = getOrderRotation(cost);
    return [
        ...baseFunctions,
        ...rotateColorFunctions(rotationAmount),
        ...endFunctions
    ];
}