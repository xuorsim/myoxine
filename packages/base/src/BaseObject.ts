/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MagicalObject, { ProxyObjectProp } from './MagicalObject';
import { method_exists, property_exists } from './ObjectInfo';
import StringHelper from '@myoxine/helpers/StringHelper';
import InvalidCallException from './InvalidCallException';
import UnknownPropertyException from './UnknownPropertyException';
import UnknownMethodException from './UnknownMethodException';

import { get_class } from './ObjectInfo';
import Configurable from './Configurable';
export default class BaseObject extends MagicalObject implements Configurable {
    static className(): string {
        //console.log(this);
        //return get_class(this);
        return this.name;
    }
    constructor(config) {
        super();
        /*
        if (!empty($config)) {
            Yii::configure($this, $config);
        }
        */
        this.init();
    }
    init(): void {
        //console.log('test');
    }
    __get(name: ProxyObjectProp): any {
        ///*
        if (!this[name] && typeof this[name] !== 'function') {
            const getter = StringHelper.camelCase('get_' + (name as string));
            const setter = StringHelper.camelCase('set_' + (name as string));
            if (method_exists(this, getter)) {
                return this[getter]();
            } else if (method_exists(this, setter)) {
                throw new InvalidCallException(
                    'Getting write-only property: ' +
                        Object.getPrototypeOf(this).constructor.name +
                        '::' +
                        (name as string),
                );
            }

            throw new UnknownPropertyException(
                'Getting unknown property: ' + get_class(this) + '::' + (name as string),
            );
        }
        //*/
    }
    __set(name: ProxyObjectProp, value: any): boolean {
        const setter = StringHelper.camelCase('set_' + (name as string));
        if (method_exists(this, setter)) {
            return this[setter](value);
        } else if (method_exists(this, StringHelper.camelCase('get_' + (name as string)))) {
            throw new InvalidCallException('Setting read-only property: ' + get_class(this) + '::' + (name as string));
        } else {
            throw new UnknownPropertyException(
                'Setting unknown property: ' + get_class(this) + '::' + (name as string),
            );
        }
        //return true;
    }
    __isset(name: ProxyObjectProp): boolean {
        const getter = StringHelper.camelCase('get_' + (name as string));
        if (method_exists(this, getter)) {
            return this[getter]() !== null && this[getter]() !== undefined;
        }
        return false;
    }
    __unset(name: ProxyObjectProp): boolean {
        const setter = StringHelper.camelCase('set_' + (name as string));
        if (method_exists(this, setter)) {
            return this[setter](null);
        } else if (method_exists(this, StringHelper.camelCase('get_' + (name as string)))) {
            throw new InvalidCallException(
                'Unsetting read-only property: ' + get_class(this) + '::' + (name as string),
            );
        }
        return false;
    }
    __call(name: string, args: any): void {
        //if (method_child_exists(this, 'BaseObject', 'name')) {
        throw new UnknownMethodException('Calling unknown method: ' + get_class(this) + '::' + name + '()');
        //}
        return this[name](...args);
    }
    canGetProperty(name: string, checkVars = true): boolean {
        return (
            method_exists(this, StringHelper.camelCase('get_' + (name as string))) ||
            (checkVars && property_exists(this, name))
        );
    }
    canSetProperty(name: string, checkVars = true): boolean {
        return (
            method_exists(this, StringHelper.camelCase('set_' + (name as string))) ||
            (checkVars && property_exists(this, name))
        );
    }
    hasProperty(name: string, checkVars = true): boolean {
        return this.canGetProperty(name, checkVars) || this.canSetProperty(name, false);
    }
    hasMethod(name: string): boolean {
        return method_exists(this, name);
    }
}
