import Exception from './Exception';

export default class InvalidCallException extends Exception {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidCallException';
    }
}
