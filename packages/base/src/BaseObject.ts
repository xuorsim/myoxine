/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MagicalObject, { MagicalObjectProp } from './MagicalObject';
import { method_exists, property_exists } from './ObjectInfo';
import StringHelper from '@myoxine/helpers/StringHelper';
import InvalidCallException from './InvalidCallException';
import UnknownPropertyException from './UnknownPropertyException';
import UnknownMethodException from './UnknownMethodException';

import { get_class } from './ObjectInfo';
import Configurable from './Configurable';
export default class BaseObject extends MagicalObject implements Configurable {
    static className(): string {
        return get_class(this);
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
    init = (): void => {
        console.log('test');
    };
    __get = (name: MagicalObjectProp): any => {
        const getter = 'get_' + (name as string);
        if (method_exists(this, StringHelper.camelCase(getter))) {
            return this[getter]();
        } else if (method_exists(this, StringHelper.camelCase('set' + (name as string)))) {
            throw new InvalidCallException(
                'Getting write-only property: ' +
                    Object.getPrototypeOf(this).constructor.name +
                    '::' +
                    (name as string),
            );
        }

        throw new UnknownPropertyException('Getting unknown property: ' + get_class(this) + '::' + (name as string));
    };
    __set = (name: MagicalObjectProp, value: any): boolean => {
        const setter = 'set_' + (name as string);
        if (method_exists(this, StringHelper.camelCase(setter))) {
            return this[setter](value);
        } else if (method_exists(this, StringHelper.camelCase('get_' + (name as string)))) {
            throw new InvalidCallException('Setting read-only property: ' + get_class(this) + '::' + (name as string));
        } else {
            throw new UnknownPropertyException(
                'Setting unknown property: ' + get_class(this) + '::' + (name as string),
            );
        }
        return true;
    };
    __isset = (name: MagicalObjectProp): boolean => {
        const getter = 'get_' + (name as string);
        if (method_exists(this, StringHelper.camelCase(getter))) {
            return this[getter]() !== null && this[getter]() !== undefined;
        }
        return false;
    };
    __unset = (name: MagicalObjectProp): boolean => {
        const setter = 'set_' + (name as string);
        if (method_exists(this, StringHelper.camelCase(setter))) {
            return this[setter](null);
        } else if (method_exists(this, StringHelper.camelCase('get_' + (name as string)))) {
            throw new InvalidCallException(
                'Unsetting read-only property: ' + get_class(this) + '::' + (name as string),
            );
        }
        return false;
    };
    __call(name: string): void {
        throw new UnknownMethodException('Calling unknown method: ' + get_class(this) + '::' + name + '()');
    }
    canGetProperty(name: string, checkVars = true): boolean {
        return (
            method_exists(this, StringHelper.camelCase('get_' + (name as string))) ||
            (checkVars && property_exists(this, name))
        );
    }
    canSetProperty(name: string, checkVars = true): boolean {
        return method_exists(this, 'set' + name) || (checkVars && property_exists(this, name));
    }
    hasProperty(name: string, checkVars = true): boolean {
        return this.canGetProperty(name, checkVars) || this.canSetProperty(name, false);
    }
    hasMethod(name: string): boolean {
        return method_exists(this, name);
    }
}
