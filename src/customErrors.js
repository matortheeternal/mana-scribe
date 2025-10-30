export class NotImplementedError extends Error {
    constructor(methodName) {
        super(`Method "${methodName}" not implemented`);
        this.name = 'NotImplementedError';
    }
}

export class SchemaError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SchemaError';
    }
}

export class AlreadyRegisteredError extends Error {
    constructor(label, id) {
        super(`${label} with id "${id}" already registered`);
        this.name = 'AlreadyRegisteredError';
    }
}
