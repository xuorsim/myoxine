export default class Exception extends Error {
    name = 'Exception';
    _message;
    constructor(message: string) {
        super(message);
        this._message = message;
    }
    getName = (): string => {
        return this.constructor.name;
    };
    getMessage = (): string => {
        return this._message;
    };
}
