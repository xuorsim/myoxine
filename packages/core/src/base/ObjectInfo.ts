/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const get_class = (obj: any): string => {
    if (obj.constructor) {
        return obj.constructor.name;
    } else {
        return obj.name;
    }
};
export const get_methods = (obj: any): Array<string> => {
    if (Object.getPrototypeOf(obj)) {
        return [...Object.getOwnPropertyNames(obj), ...get_methods(Object.getPrototypeOf(obj))];
    }
    return Object.getOwnPropertyNames(obj);
};
export const get_grouped_methods = (obj: any): Record<string, Array<string>> => {
    if (Object.getPrototypeOf(obj)) {
        return {
            [get_class(obj)]: Object.getOwnPropertyNames(obj),
            ...get_grouped_methods(Object.getPrototypeOf(obj)),
        };

        //return get_methods(Object.getPrototypeOf(obj)).concat(Object.getOwnPropertyNames(obj));
    }
    return { [get_class(obj)]: Object.getOwnPropertyNames(obj) };
};

export const get_child_methods = (obj: any, currentObject: string): Array<string> => {
    let methods: Array<string> = [];
    const allMethods = get_grouped_methods(obj);
    for (const k in allMethods) {
        if (k === currentObject) {
            break;
        } else {
            methods = [...methods, ...allMethods[k]];
        }
    }
    return methods;
};
export const method_child_exists = (obj: any, currentObject: string, prop: string): boolean => {
    return get_child_methods(obj, currentObject).includes(prop);
};
export const method_exists = (obj: any, prop: string, caseSensitive = true): boolean => {
    const methods = get_methods(obj);
    if (caseSensitive) {
        if (methods.includes(prop) && typeof obj[prop] === 'function') {
            return true;
        }
    } else {
        for (let i = 0; i < methods.length; i++) {
            if (methods[i].toLowerCase() === prop.toLowerCase() && typeof obj[methods[i]] === 'function') {
                return true;
            }
        }
    }

    return false;
};
export const property_exists = (obj: any, prop: string, caseSensitive = true): boolean => {
    const methods = get_methods(obj);
    if (caseSensitive) {
        if (methods.includes(prop) && typeof obj[prop] !== 'function') {
            return true;
        }
    } else {
        for (let i = 0; i < methods.length; i++) {
            if (methods[i].toLowerCase() === prop.toLowerCase() && typeof obj[methods[i]] !== 'function') {
                return true;
            }
        }
    }

    return false;
};
