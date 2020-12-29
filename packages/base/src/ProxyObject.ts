/* eslint-disable @typescript-eslint/no-explicit-any */
import UnknownMethodException from './UnknownMethodException';
import UnknownPropertyException from './UnknownPropertyException';
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

export type ProxyObjectProp = string | number | symbol;
export interface StaticProxyObjectType {
    new (someParam?: any): ProxyObjectType;
    withProxy: () => void;
    __invoke?: (...argumentsList: any) => any;
    __set?: (props: ProxyObjectProp, value: any) => boolean;
    __isset?: (props: ProxyObjectProp) => boolean;
    __unset?: (props: ProxyObjectProp) => boolean;
    __get?: (props: ProxyObjectProp) => any;
    __call?: (props: ProxyObjectProp, args: any) => any;
}
export interface ProxyObjectType {
    __set?: (props: ProxyObjectProp, value: any) => boolean;
    __get?: (props: ProxyObjectProp) => any;
    __isset?: (props: ProxyObjectProp) => boolean;
    __unset?: (props: ProxyObjectProp) => boolean;
    __call?: (props: ProxyObjectProp, args: any) => any;
}
const SeperatorMethods = '::';
const handlerProxy = {
    get: (obj: any, prop: PropertyKey): any => {
        if (method_exists(obj, prop as string)) {
            if (prop === 'toString') {
                return function () {
                    return obj.toString();
                    //return obj.__isset(args);
                };
            } else if (prop === 'hasOwnProperty') {
                return function (...args) {
                    if (method_exists(obj, '__isset')) {
                        return obj.__isset(args);
                    }
                    return obj.hasOwnProperty(args);
                    //return obj.__isset(args);
                };
            } else {
                if (method_exists(obj, '__call')) {
                    return function (...args) {
                        return Reflect.get(obj, '__call').bind(obj)(prop, args);
                    };
                } else {
                    return obj[prop];
                }
            }
        } else {
            if (method_exists(obj, '__get')) {
                return obj.__get(prop);
            } else {
                let isProp = true;
                if (!Reflect.has(obj, prop)) {
                    Promise.resolve()
                        .then(() => {
                            if (isProp) {
                                if (!Reflect.has(obj, prop)) {
                                    throw new UnknownPropertyException(
                                        'Undefined property: ' +
                                            obj.constructor.name +
                                            SeperatorMethods +
                                            (prop as string),
                                    );
                                }
                            }
                        })
                        .catch((error) => {
                            return error;
                        });
                    return new Proxy(Function, {
                        //get: handlerProxy.get,
                        apply: (target, args) => {
                            isProp = false;
                            if (method_exists(obj, '__call')) {
                                return Reflect.get(obj, '__call').bind(obj)(prop, args);
                            } else {
                                if (!method_exists(obj, prop.toString())) {
                                    throw new UnknownMethodException(
                                        'Undefined method: ' +
                                            obj.constructor.name +
                                            SeperatorMethods +
                                            (prop as string),
                                    );
                                }
                            }

                            //return new Proxy(() => {}, handlerProxy);
                        },
                    });
                } else {
                    return Reflect.get(obj, prop);
                }
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
                Reflect.deleteProperty(obj, prop);
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
};
const handlerProxyStatic = {
    ...handlerProxy,
    apply: function (obj: any, thisArg: any, argumentsList: any): any {
        if (!method_exists(obj, '__invoke')) {
            throw new UnknownPropertyException(
                'Undefined static property: ' + obj.name + SeperatorMethods + '__invoke',
            );
        }
        return obj.__invoke(...argumentsList);
    },
};
export class ProxyObject implements ProxyObjectType {
    static withProxy(): void {
        const proxied = new Proxy(this, handlerProxyStatic);

        return proxied;
    }
    constructor() {
        const proxy = new Proxy(this, handlerProxy);
        return proxy;
    }
}
export default ProxyObject;
