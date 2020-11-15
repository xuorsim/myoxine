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
        return get_methods(Object.getPrototypeOf(obj)).concat(Object.getOwnPropertyNames(obj));
    }
    return Object.getOwnPropertyNames(obj);
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
