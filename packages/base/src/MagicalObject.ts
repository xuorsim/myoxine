/* eslint-disable @typescript-eslint/no-explicit-any */
import Exception from './Exception';
import { method_exists } from './ObjectInfo';
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
export interface StaticMagicObjectType {
    new (someParam?: any): MagicObjectType;
    withProxy: () => void;
    __toString?: () => string;
    __invoke?: (...argumentsList: any) => any;
    __set?: (props: MagicalObjectProp, value: any) => boolean;
    __isset?: (props: MagicalObjectProp) => boolean;
    __unset?: (props: MagicalObjectProp) => boolean;
    __get?: (props: MagicalObjectProp) => any;
    __call?: (props: MagicalObjectProp) => any;
}
export interface MagicObjectType {
    __set?: (props: MagicalObjectProp, value: any) => boolean;
    __get?: (props: MagicalObjectProp) => any;
    __isset?: (props: MagicalObjectProp) => boolean;
    __unset?: (props: MagicalObjectProp) => boolean;
    __call?: (props: MagicalObjectProp) => any;
    __toString?: () => string;
}
const SeperatorMethods = '::';
export class MagicalObject implements MagicObjectType {
    static withProxy(): void {
        const proxied = new Proxy(this, {
            apply: function (obj: any, thisArg: any, argumentsList: any): any {
                if (!method_exists(obj, '__invoke')) {
                    throw new Exception('Undefined static property: ' + obj.name + SeperatorMethods + '__invoke');
                }
                return obj.__invoke(...argumentsList);
            },
            get: (obj: any, prop: PropertyKey, receiver?: any): any => {
                if (prop === 'toString' && method_exists(obj, 'toString')) {
                    return function (...args) {
                        if (method_exists(obj, '__toString')) {
                            return obj.__toString(args);
                        }
                        return obj.toString();
                    };
                } else if (prop === 'hasOwnProperty' && method_exists(obj, 'hasOwnProperty')) {
                    return function (...args) {
                        if (method_exists(obj, '__isset')) {
                            return obj.__isset(args);
                        }
                        return obj.hasOwnProperty(args);
                    };
                } else if (method_exists(obj, prop as string)) {
                    // Wrap it around a function and return it
                    if (prop.toString() === '__get') {
                        return function (...args) {
                            return obj.__get.bind(obj)(args);
                        };
                    } else {
                        return function (...args) {
                            if (method_exists(obj, '__call')) {
                                return obj.__call.bind(obj)(prop, args);
                            }
                            return obj[prop].bind(obj)(...args);
                        };
                    }
                } else {
                    if (method_exists(obj, '__get')) {
                        return obj.__get(prop, receiver);
                    } else {
                        if (!obj.hasOwnProperty(prop)) {
                            throw new Exception(
                                'Undefined static property: ' + obj.name + SeperatorMethods + (prop as string),
                            );
                        }
                        return Reflect.get(obj, prop);
                    }
                    return Reflect.get(obj, prop);
                }
            },
            set: (obj: any, prop: PropertyKey, value: any, receiver: any): boolean => {
                if (typeof prop !== 'symbol' && !receiver.hasOwnProperty(prop)) {
                    throw new Exception('Undefined static property: ' + obj.name + SeperatorMethods + (prop as string));
                }
                if (method_exists(obj, '__set')) {
                    return obj.__set(prop, value);
                } else {
                    return Reflect.set(obj, prop, value);
                }
            },
            has: (obj: any, prop: PropertyKey): boolean => {
                if (method_exists(obj, '__isset')) {
                    return obj.__isset(prop);
                }
                return Reflect.has(obj, prop);
            },
            deleteProperty: (obj: any, prop: PropertyKey): boolean => {
                if (method_exists(obj, '__unset')) {
                    return obj.__unset(prop);
                }
                return Reflect.deleteProperty(obj, prop);
            },
        });
        return proxied;
    }
    constructor() {
        const proxy = new Proxy(this, {
            get: (obj: any, prop: PropertyKey): any => {
                if (prop === 'toString' && method_exists(obj, 'toString')) {
                    return function (...args) {
                        if (method_exists(obj, '__toString')) {
                            return obj.__toString(args);
                        }
                        return obj.toString();
                        //return obj.__isset(args);
                    };
                } else if (prop === 'hasOwnProperty' && method_exists(obj, 'hasOwnProperty')) {
                    return function (...args) {
                        if (method_exists(obj, '__isset')) {
                            return obj.__isset(args);
                        }
                        return obj.hasOwnProperty(args);
                        //return obj.__isset(args);
                    };
                } else if (method_exists(obj, prop as string)) {
                    // Wrap it around a function and return it
                    if (prop.toString() === '__get') {
                        return function (...args) {
                            return obj.__get.bind(obj)(args);
                        };
                    } else {
                        return function (...args) {
                            if (method_exists(obj, '__call')) {
                                return obj.__call.bind(obj)(prop, args);
                            }
                            return obj[prop].bind(obj)(...args);

                            //return obj.__call.bind(obj)(prop, args);
                        };
                    }
                } else {
                    if (method_exists(obj, '__get')) {
                        return obj.__get(prop);
                    } else {
                        if (!obj.hasOwnProperty(prop)) {
                            throw new Exception(
                                'Undefined property: ' + obj.constructor.name + SeperatorMethods + (prop as string),
                            );
                        }
                        return Reflect.get(obj, prop);
                    }
                }
            },
            set: (obj: any, prop: PropertyKey, value: any): boolean => {
                if (!obj.hasOwnProperty(prop)) {
                    Object.defineProperty(obj, prop, { writable: true });
                }
                if (method_exists(obj, '__set')) {
                    if (obj.__set(prop, value)) {
                        return true;
                    } else {
                        obj.deleteProperty(obj, prop);
                        return false;
                    }
                } else {
                    return Reflect.set(obj, prop, value);
                }
            },
            has: (obj: any, prop: PropertyKey): boolean => {
                if (method_exists(obj, '__isset')) {
                    return obj.__isset(prop);
                }
                return Reflect.has(obj, prop);
            },
            deleteProperty: (obj: any, prop: PropertyKey): boolean => {
                if (method_exists(obj, '__unset')) {
                    return obj.__unset(prop);
                }
                return Reflect.deleteProperty(obj, prop);
            },
        });
        return proxy;
    }
}
export default MagicalObject;
