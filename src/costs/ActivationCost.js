import Cost from './Cost.js';
import ColoredManaSymbol from '../symbols/ColoredManaSymbol.js';
import ColoredPhyrexianManaSymbol from '../symbols/ColoredPhyrexianManaSymbol.js';
import ColorlessManaSymbol from '../symbols/ColorlessManaSymbol.js';
import ColorlessPhyrexianManaSymbol from '../symbols/ColorlessPhyrexianManaSymbol.js';
import EnergySymbol from '../symbols/EnergySymbol.js';
import FiveColorHybridManaSymbol from '../symbols/FiveColorHybridManaSymbol.js';
import FourColorHybridManaSymbol from '../symbols/FourColorHybridManaSymbol.js';
import GenericHybridManaSymbol from '../symbols/GenericHybridManaSymbol.js';
import GenericManaSymbol from '../symbols/GenericManaSymbol.js';
import HalfColoredManaSymbol from '../symbols/HalfColoredManaSymbol.js';
import InfiniteManaSymbol from '../symbols/InfiniteManaSymbol.js';
import SnowManaSymbol from '../symbols/SnowManaSymbol.js';
import TapSymbol from '../symbols/TapSymbol.js';
import ThreeColorHybridManaSymbol from '../symbols/ThreeColorHybridManaSymbol.js';
import TwoColorHybridManaSymbol from '../symbols/TwoColorHybridManaSymbol.js';
import UntapSymbol from '../symbols/UntapSymbol.js';
import VariableManaSymbol from '../symbols/VariableManaSymbol.js';

export default class ActivationCost extends Cost {
    static get allowedSymbols() {
        return [
            ColoredPhyrexianManaSymbol, GenericHybridManaSymbol, FiveColorHybridManaSymbol,
            FourColorHybridManaSymbol, ThreeColorHybridManaSymbol, TwoColorHybridManaSymbol,
            ColorlessPhyrexianManaSymbol, HalfColoredManaSymbol,
            GenericManaSymbol, VariableManaSymbol,
            InfiniteManaSymbol, SnowManaSymbol,
            ColoredManaSymbol, ColorlessManaSymbol,
            EnergySymbol, TapSymbol, UntapSymbol,
        ];
    }
}
