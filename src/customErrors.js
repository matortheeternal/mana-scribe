export class NotImplementedError extends Error {
    constructor(methodName) {
        super(`Method "${methodName}" not implemented`);
        this.name = 'NotImplementedError';
    }
}
