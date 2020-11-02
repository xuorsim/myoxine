export default class Exception extends Error {
    _name = 'Exception';
    _message;
    constructor(message: string) {
        super(message);
        this._message = message;
    }
    getName = (): string => {
        return this._name;
    };
    getMessage = (): string => {
        return this._message;
    };
}
