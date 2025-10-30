import Cost from './Cost.js';
import ColoredManaSymbol from '../symbols/ColoredManaSymbol.js';
import ColoredPhyrexianManaSymbol from '../symbols/ColoredPhyrexianManaSymbol.js';
import ColorlessManaSymbol from '../symbols/ColorlessManaSymbol.js';
import ColorlessPhyrexianManaSymbol from '../symbols/ColorlessPhyrexianManaSymbol.js';
import FiveColorHybridManaSymbol from '../symbols/FiveColorHybridManaSymbol.js';
import FourColorHybridManaSymbol from '../symbols/FourColorHybridManaSymbol.js';
import GenericHybridManaSymbol from '../symbols/GenericHybridManaSymbol.js';
import GenericManaSymbol from '../symbols/GenericManaSymbol.js';
import HalfManaSymbol from '../symbols/HalfManaSymbol.js';
import InfiniteManaSymbol from '../symbols/InfiniteManaSymbol.js';
import TypedManaSymbol from '../symbols/TypedManaSymbol.js';
import ThreeColorHybridManaSymbol from '../symbols/ThreeColorHybridManaSymbol.js';
import TwoColorHybridManaSymbol from '../symbols/TwoColorHybridManaSymbol.js';
import HybridPhyrexianManaSymbol from '../symbols/HybridPhyrexianManaSymbol.js';
import VariableManaSymbol from '../symbols/VariableManaSymbol.js';
import { arrayEquals, arrayGreaterThan, arrayLessThan } from '../arrayComparison.js';

export default class ManaCost extends Cost {
    static get allowedSymbols() {
        return [
            HybridPhyrexianManaSymbol, ColoredPhyrexianManaSymbol,
            GenericHybridManaSymbol, FiveColorHybridManaSymbol,
            FourColorHybridManaSymbol, ThreeColorHybridManaSymbol,
            TwoColorHybridManaSymbol, HalfManaSymbol,
            ColorlessPhyrexianManaSymbol,
            GenericManaSymbol, VariableManaSymbol, InfiniteManaSymbol,
            TypedManaSymbol, ColoredManaSymbol, ColorlessManaSymbol
        ];
    }

    get cmc() {
        return this.symbols.reduce((sum, sym) => sum + sym.cmcValue(), 0);
    }

    getDevotionTo(color) {
        return this.symbols.reduce((devotion, sym) => {
            return devotion + (sym.colors.includes(color) ? 1 : 0);
        }, 0);
    }

    equals(other) {
        return arrayEquals(this.symbols, other.symbols);
    }

    greaterThan(other) {
        return arrayGreaterThan(this.symbols, other.symbols);
    }

    lessThan(other) {
        return arrayLessThan(this.symbols, other.symbols);
    }
}
