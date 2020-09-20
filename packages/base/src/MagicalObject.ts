/* eslint-disable @typescript-eslint/no-explicit-any */
/*
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
//  __clone() 
// and __debugInfo()
*/
export type MagicalObjectProp = string | number | symbol;
export class MagicalObject {
    __get(prop: PropertyKey): unknown {
        return this[prop];
    }
    __set(prop: PropertyKey, value: unknown): boolean {
        this[prop] = value;
        return true;
    }
    __unset(prop: PropertyKey): boolean {
        delete this[prop];
        return true;
    }
    __isset(prop: PropertyKey): boolean {
        return prop in this;
    }
    toString(): string {
        return this.__toString();
    }
    __toString(): string {
        return this.constructor.name;
    }
    __call(prop: PropertyKey, args: Array<any>): any {
        return this[prop].bind(this)(...args);
    }
    constructor() {
        /*
        if (getParams(this.__get).length !== 1) {
            throw new InvalidMagicObject('__set need 1 params');
        }
        */
        return new Proxy(this, {
            get: (obj: any, prop: PropertyKey): any => {
                if (obj[prop] != undefined && typeof obj[prop] == 'function') {
                    // Wrap it around a function and return it
                    return function (...args) {
                        return obj.__call(prop, args);
                    };
                }
                return obj.__get(prop);
            },
            set: (obj: any, prop: PropertyKey, value: any): boolean => {
                return obj.__set(prop, value);
            },
            deleteProperty: (obj: any, prop: PropertyKey): boolean => {
                return obj.__unset(prop);
            },
            has: (obj: any, prop: PropertyKey): boolean => {
                return obj.__isset(prop);
            },
        });
    }
}
