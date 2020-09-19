/* eslint-disable @typescript-eslint/no-explicit-any */
export type MagicalObjectProp = string | number | symbol;
export class MagicalObject {
    __get = (prop: PropertyKey): unknown => {
        return this[prop];
    };
    __set = (prop: PropertyKey, value: unknown): boolean => {
        this[prop] = value;
        return true;
    };
    constructor() {
        return new Proxy(this, {
            get: (obj: any, prop: PropertyKey): any => {
                return obj.__get(prop);
            },
            set: (obj: any, prop: PropertyKey, value: any): boolean => {
                return obj.__set(prop, value);
            },
        });
    }
}
