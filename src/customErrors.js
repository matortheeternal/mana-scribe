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

export class RegistryError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RegistryError';
    }
}
