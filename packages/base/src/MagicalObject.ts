/* eslint-disable @typescript-eslint/no-explicit-any */
import Exception from './Exception';
/*
PHP magic method
// __construct()**, 
//__destruct(), 
//__call(), **
//__callStatic() **, 
//__get(), **
//__set(), **
//__isset(), **
//__unset(), **
//__sleep(), 
//__wakeup(), 
// __serialize(), 
//__unserialize(), 
// __toString(), ** 
// __invoke()*, 
// __set_state(),
// __clone() 
// __debugInfo()

additional magic method

*/

export type MagicalObjectProp = string | number | symbol;
export class MagicalObject {
    static withProxy(): void {
        const proxied = new Proxy(this, {
            construct(target, args) {
                return new Proxy(new target(...args), {
                    get: (obj: any, prop: PropertyKey, receiver?: any): any => {
                        if (prop === 'hasOwnProperty' && obj[prop] !== undefined && typeof obj[prop] === 'function') {
                            return function (...args) {
                                return obj.__isset(args);
                            };
                        } else if (obj[prop] != undefined && typeof obj[prop] == 'function') {
                            // Wrap it around a function and return it
                            if (prop.toString() === '__get') {
                                return function (...args) {
                                    return obj.__get.bind(obj)(args);
                                };
                            } else {
                                return function (...args) {
                                    return obj.__call.bind(obj)(prop, args);
                                };
                            }
                        } else {
                            if (!obj.hasOwnProperty(prop)) {
                                throw new Exception(
                                    'Undefined property: ' + obj.constructor.name + '.' + (prop as string),
                                );
                            }

                            return obj.__get(prop, receiver);
                        }
                    },
                    set: (obj: any, prop: PropertyKey, value: any): boolean => {
                        if (!obj.hasOwnProperty(prop)) {
                            Object.defineProperty(obj, prop, { writable: true });
                        }
                        if (obj.__set(prop, value)) {
                            return true;
                        } else {
                            obj.deleteProperty(obj, prop);
                            return false;
                        }
                    },
                    has: (obj: any, prop: PropertyKey): boolean => {
                        return obj.__isset(prop);
                    },
                    deleteProperty: (obj: any, prop: PropertyKey): boolean => {
                        return obj.__unset(prop);
                    },
                });
            },
            apply: function (obj: any, thisArg: any, argumentsList: any): any {
                if (!obj.hasOwnProperty('__invoke') || typeof obj['__invoke'] !== 'function') {
                    throw new Exception('Undefined static property: ' + obj.name + '.' + '__invoke');
                }
                return obj.__invoke(...argumentsList);
            },
            get: (obj: any, prop: PropertyKey, receiver?: any): any => {
                if (prop === 'hasOwnProperty' && obj[prop] != undefined && typeof obj[prop] === 'function') {
                    return function (...args) {
                        return obj.__isset(args);
                    };
                } else if (obj[prop] != undefined && typeof obj[prop] == 'function') {
                    // Wrap it around a function and return it
                    if (prop.toString() === '__get') {
                        return function (...args) {
                            return obj.__get.bind(obj)(args);
                        };
                    } else {
                        return function (...args) {
                            return obj.__call.bind(obj)(prop, args);
                        };
                    }
                } else {
                    if (!obj.hasOwnProperty(prop)) {
                        throw new Exception('Undefined static property: ' + obj.name + '.' + (prop as string));
                    }

                    return obj.__get(prop, receiver);
                }
            },
            set: (obj: any, prop: PropertyKey, value: any, receiver: any): boolean => {
                if (!receiver.hasOwnProperty(prop)) {
                    throw new Exception('Undefined static property: ' + obj.name + '.' + (prop as string));
                }
                return obj.__set(prop, value);
            },
            has: (obj: any, prop: PropertyKey): boolean => {
                return obj.__isset(prop);
            },
            deleteProperty: (obj: any, prop: PropertyKey): boolean => {
                return obj.__unset(prop);
            },
        });
        return proxied;
    }
    static __get(prop: PropertyKey): unknown {
        return this[prop];
    }
    __get(prop: PropertyKey): unknown {
        return this[prop];
    }
    static __set(prop: PropertyKey, value: unknown): boolean {
        this[prop] = value;
        return true;
    }
    __set(prop: PropertyKey, value: unknown): boolean {
        this[prop] = value;
        return true;
    }
    static __isset(prop: PropertyKey): boolean {
        return prop in this && this.hasOwnProperty(prop);
    }
    __isset(prop: PropertyKey): boolean {
        return prop in this && this.hasOwnProperty(prop);
    }
    static __unset(prop: PropertyKey): boolean {
        delete this[prop];
        return true;
    }
    __unset(prop: PropertyKey): boolean {
        delete this[prop];
        return true;
    }
    toString(): string {
        return this.__toString();
    }
    static toString(): string {
        return this.__toString();
    }
    __toString(): string {
        return this.constructor.name;
    }
    static __toString(): string {
        return this.constructor.name;
    }
    __call(prop: PropertyKey, args: Array<any>): any {
        return this[prop](...args);
    }
    static __call(prop: PropertyKey, args: Array<any>): any {
        return this[prop](...args);
    }
    /*
    constructor(...args: any) {
        const proxy = new Proxy(this, {
            get: (obj: any, prop: PropertyKey, receiver?: any): any => {
                if (prop === 'hasOwnProperty' && obj[prop] !== undefined && typeof obj[prop] === 'function') {
                    return function (...args) {
                        return obj.__isset(args);
                    };
                } else if (obj[prop] != undefined && typeof obj[prop] == 'function') {
                    // Wrap it around a function and return it
                    if (prop.toString() === '__get') {
                        return function (...args) {
                            return obj.__get.bind(obj)(args);
                        };
                    } else {
                        return function (...args) {
                            return obj.__call.bind(obj)(prop, args);
                        };
                    }
                } else {
                    if (!obj.hasOwnProperty(prop)) {
                        throw new Exception('Undefined property: ' + obj.constructor.name + '.' + (prop as string));
                    }

                    return obj.__get(prop, receiver);
                }
            },
            set: (obj: any, prop: PropertyKey, value: any): boolean => {
                if (!obj.hasOwnProperty(prop)) {
                    Object.defineProperty(obj, prop, { writable: true });
                }
                if (obj.__set(prop, value)) {
                    return true;
                } else {
                    obj.deleteProperty(obj, prop);
                    return false;
                }
            },
            has: (obj: any, prop: PropertyKey): boolean => {
                return obj.__isset(prop);
            },
            deleteProperty: (obj: any, prop: PropertyKey): boolean => {
                return obj.__unset(prop);
            },
        });
        return proxy;
    }
    */
}
