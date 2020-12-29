/* eslint-disable @typescript-eslint/no-explicit-any */
//import UnknownMethodException from './UnknownMethodException';
import UnknownPropertyException from './UnknownPropertyException';
import { get_methods, method_exists } from './ObjectInfo';

export type ProxyObjectProp = string | number | symbol;
export interface StaticProxyObjectType {
    new (someParam?: any): ProxyObjectType;
    withProxy: () => void;
    __invoke?: (...argumentsList: any) => any;
    __set?: (props: ProxyObjectProp, value: any) => boolean;
    __isset?: (props: ProxyObjectProp) => boolean;
    __unset?: (props: ProxyObjectProp) => boolean;
    __get?: (props: ProxyObjectProp) => any;
    //    __call?: (props: ProxyObjectProp, args: any) => any;
}
export interface ProxyObjectType {
    __set?: (props: ProxyObjectProp, value: any) => boolean;
    __get?: (props: ProxyObjectProp) => any;
    __isset?: (props: ProxyObjectProp) => boolean;
    __unset?: (props: ProxyObjectProp) => boolean;
    //withProxy: () => void;
    //    __call?: (props: ProxyObjectProp, args: any) => any;
}
const SeperatorMethods = '::';

const handlerProxy = {
    get: (obj: any, prop: PropertyKey, receiver: any): any => {
        if (prop === 'hasOwnProperty') {
            return function (...args) {
                if (method_exists(obj, '__isset')) {
                    return obj.__isset(args);
                }
                return obj.hasOwnProperty(args);
                //return obj.__isset(args);
            };
        } else if (!Reflect.has(obj, prop)) {
            if (method_exists(obj, '__get')) {
                return obj.__get(prop);
            } else {
                throw new UnknownPropertyException(
                    'Undefined property: ' + obj.constructor.name + SeperatorMethods + (prop as string),
                );
            }
        }
        //const value = Reflect.get(obj, prop);
        //return typeof value == 'function' ? value.bind(receiver) : value;
        return Reflect.get(obj, prop);
    },
    set: (obj: any, prop: PropertyKey, value: any, receiver: any): boolean => {
        if (!Reflect.has(obj, prop)) {
            if (method_exists(obj, '__set')) {
                //return Reflect.get(obj, '__set', receiver).bind(obj)(prop, value);
                return obj.__set(prop, value);
            } else {
                throw new UnknownPropertyException(
                    'Undefined property: ' + obj.constructor.name + SeperatorMethods + (prop as string),
                );
            }
        } else {
            return Reflect.set(obj, prop, value);
        }
    },
    has: (obj: any, prop: PropertyKey): boolean => {
        if (!Reflect.has(obj, prop)) {
            if (method_exists(obj, '__isset')) {
                return obj.__isset(prop);
            }
        }
        return Reflect.has(obj, prop);
    },
    deleteProperty: (obj: any, prop: PropertyKey): boolean => {
        if (!Reflect.has(obj, prop)) {
            if (method_exists(obj, '__unset')) {
                return obj.__unset(prop);
            } else {
                throw new UnknownPropertyException(
                    'Undefined property: ' + obj.constructor.name + SeperatorMethods + (prop as string),
                );
            }
        }
        return Reflect.deleteProperty(obj, prop);
    },
};

const handlerProxyStatic = {
    ...handlerProxy,
    apply: (obj: any, thisArg: any, argumentsList: any): any => {
        if (!method_exists(obj, '__invoke')) {
            throw new UnknownPropertyException(
                'Undefined static property: ' + obj.name + SeperatorMethods + '__invoke',
            );
        }
        return obj.__invoke(...argumentsList);
    },
};
export class ProxyObject implements ProxyObjectType {
    ///*
    static withProxy(): void {
        const proxied = new Proxy(this, handlerProxyStatic);
        return proxied;
    }
    //*/
    /*
    withProxy(): void {
        const proxied = new Proxy(this, handlerProxy);

        return proxied;
    }
    */
    ///*
    constructor() {
        //console.log(Object.getOwnPropertyNames(this));
        const proxy = new Proxy(this, handlerProxy);
        return proxy;
    }
    //*/
}
export default ProxyObject;
