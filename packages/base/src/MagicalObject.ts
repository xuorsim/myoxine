/* eslint-disable @typescript-eslint/no-explicit-any */
import Exception from './Exception';
/*
PHP magic method
// __construct(), 
//__destruct(), 
//__call(), 
//__callStatic(), 
//__get(), **
//__set(), **
//__isset(), **
//__unset(), **
//__sleep(), 
//__wakeup(), 
// __serialize(), 
//__unserialize(), 
// __toString(), ** 
// __invoke(), 
// __set_state(),
// __clone() 
// __debugInfo()

additional magic method

*/

export type MagicalObjectProp = string | number | symbol;
class MagicalObjectClass {
    __get(prop: PropertyKey): unknown {
        return this[prop];
    }
    __set(prop: PropertyKey, value: unknown): boolean {
        this[prop] = value;
        return true;
    }
    __isset(prop: PropertyKey): boolean {
        return prop in this && this.hasOwnProperty(prop);
    }
    __unset(prop: PropertyKey): boolean {
        delete this[prop];
        return true;
    }
    toString(): string {
        return this.__toString();
    }
    __toString(): string {
        return this.constructor.name;
    }
    __call(prop: PropertyKey, args: Array<any>): any {
        return this[prop](...args);
    }
    constructor() {
        /*
        if (getParams(this.__get).length !== 1) {
            throw new InvalidMagicObject('__set need 1 params');
        }
        */
        return new Proxy(this, {
            get: (obj: any, prop: PropertyKey, receiver?: any): any => {
                if (prop === 'hasOwnProperty' && obj[prop] != undefined && typeof obj[prop] == 'function') {
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
                    Object.defineProperty(obj, 'property1', { writable: true });
                }
                if (obj.__set(prop, value)) {
                    return true;
                } else {
                    obj.deleteProperty(obj, 'property1');
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
    }
}
export const MagicalObject = MagicalObjectClass;

/*
export const MagicalObject = new Proxy(MagicalObjectClass, {
    get: (obj: any, prop: PropertyKey): boolean => {
        if (!obj.hasOwnProperty(prop)) {
            throw new Exception('Access to undeclared static property');
        }

    },
    set: (obj: any, prop: PropertyKey, value: any): boolean => {
        if (!obj.hasOwnProperty(prop)) {
            throw new Exception('Access to undeclared static property');
        }
    },
});
*/
