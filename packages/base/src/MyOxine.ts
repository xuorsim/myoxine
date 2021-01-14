/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
class MyOxine {
    static configure(object: any, properties: Record<string, any>): any {
        for (const property in properties) {
            //Reflect.set(object, property, properties[property]);
            object[property] = properties[property];
        }
        return object;
    }
}
export default MyOxine;
