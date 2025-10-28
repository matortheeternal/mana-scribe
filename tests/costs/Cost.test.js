import Cost from '../../src/costs/Cost.js';
import { NotImplementedError } from '../../src/customErrors.js';

describe('Cost class', () => {
    describe('allowedSymbols', () => {
        it('should throw NotImplementedError when accessed', () => {
            expect(() => {
                Cost.allowedSymbols;
            }).toThrowError(
                NotImplementedError,
                'Method "allowedSymbols" not implemented'
            );
        });
    });

    describe('parseNextSymbol', () => {
        it('should throw NotImplementedError when trying to use allowedSymbols', () => {
            class DummyCost extends Cost {}
            expect(() => {
                new DummyCost().parseNextSymbol('{X}');
            }).toThrowError(
                NotImplementedError,
                'Method "allowedSymbols" not implemented'
            );
        });
    });
});
