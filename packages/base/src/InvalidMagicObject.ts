export class InvalidMagicObject extends ReferenceError {
    constructor(message: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'InvalidMagicObject';
    }
}
export default InvalidMagicObject;
