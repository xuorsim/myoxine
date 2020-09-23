export class Exception extends Error {
    constructor(message: string) {
        super(message); // (1)
        this.name = 'Exception'; // (2)
    }
}
export default Exception;
