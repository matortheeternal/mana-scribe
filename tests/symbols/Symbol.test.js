import '../../src/index.js';
import Symbol from '../../src/symbols/Symbol.js';
import { NotImplementedError } from '../../src/customErrors.js';

class DummySymbol extends Symbol {}

describe('Symbol class', () => {
    describe('match', () => {
        it('should throw NotImplementedError when called', () => {
            expect(() => {
                DummySymbol.match('{X}');
            }).toThrowError(
                NotImplementedError,
                'Method "match" not implemented'
            );
        });
    });

    describe('type getter', () => {
        it('should throw NotImplementedError when accessed', () => {
            const dummy = new DummySymbol(['{X}'], '{X}');
            expect(() => {
                dummy.type;
            }).toThrowError(
                NotImplementedError,
                'Method "type" not implemented'
            );
        });
    });

    describe('hybrid getter', () => {
        it('should return false', () => {
            const dummy = new DummySymbol(['{X}'], '{X}');
            expect(dummy.hybrid).toEqual(false);
        });
    });

    describe('cmcValue getter', () => {
        it('should throw NotImplementedError when accessed', () => {
            const dummy = new DummySymbol(['{X}'], '{X}');
            expect(() => {
                dummy.cmcValue;
            }).toThrowError(
                NotImplementedError,
                'Method "cmcValue" not implemented'
            );
        });
    });
});
