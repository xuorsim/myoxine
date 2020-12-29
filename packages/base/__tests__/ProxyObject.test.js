/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const { it } = require('mocha');
//import ProxyObject from './../lib/ProxyObject';
const ProxyObject = require('../lib/ProxyObject').default;
const OInfo = require('../lib/ObjectInfo');

///*
const SeperatorMethods = '::';
describe('no extended class', function () {
    describe('test toString property', function () {
        class testProxyObject extends ProxyObject {
            test = 'value test';
            noValue;
        }
        const obj = new testProxyObject('no value');
        it('should return [object Object] when call toString', function () {
            expect(obj.toString()).equal('[object Object]');
        });
        it('should throw error when call noFoundMethod', function () {
            try {
                obj.noFoundMethod();
            } catch (error) {
                expect(error.getName()).equal('Unknown Method');
                expect(error.getMessage()).equal(
                    'Undefined method: testProxyObject' + SeperatorMethods + 'noFoundMethod',
                );
            }
        });
    });
    describe('constructor set property', function () {
        class testProxyObjectC extends ProxyObject {
            test = 'value test';
            noValue = 'value';
            constructor(value) {
                super();
                this.noValue = value;
            }
        } //.withProxy();
        //testProxyObject = testProxyObject.proxyStatic();
        obj = new testProxyObjectC('no value');
        const nv = obj.noValue;
        console.log(nv);
        it('should return when the value is not present', function () {
            expect(obj.noValue).equal('no value');
        });
    });

    describe('test setter and getter property', function () {
        class testProxyObject extends ProxyObject {
            test = 'value test';
            noValue;
        }
        const obj = new testProxyObject();
        it('should correct for valid get', function () {
            expect(obj.test).equal('value test');
        });
        it('should correct for valid get undefined variable', function () {
            expect(obj.noValue).equal(undefined);
        });
        it('should error for get undeclared property', function () {
            try {
                obj.test2;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('UnknownPropertyUnknown Property');
                expect(error.getMessage()).equal('Undefined property: testProxyObject' + SeperatorMethods + 'test2');
            }
        });
        it('should correct for valid set', function () {
            obj.test = 'changed value test';
            expect(obj.test).equal('changed value test');
        });
        it('should correct for valid set undefined', function () {
            obj.noValue = 'changed value defined';
            expect(obj.noValue).equal('changed value defined');
        });
        it('should allow to set undeclared property', function () {
            obj.test2 = 'new value test2';
            expect(obj.test2).equal('new value test2');
        });
    });
    describe('test isset property', function () {
        class testProxyObject extends ProxyObject {
            test = 'value test';
            noValue;
        }
        const obj = new testProxyObject();
        describe('test with "in"', function () {
            it('should true for variable has value"', function () {
                expect('test' in obj).equal(true);
            });
            it('should true for variable has no value"', function () {
                expect('noValue' in obj).equal(true);
            });
            it('should false for undeclared variable', function () {
                expect('justtest' in obj).equal(false);
            });
        });
        describe('test with "hasOwnProperty"', function () {
            it('should can variable has value ', function () {
                expect(obj.hasOwnProperty('test')).equal(true);
            });
            it('should true for variable has not value"', function () {
                expect(obj.hasOwnProperty('noValue')).equal(true);
            });
            it('should false for undeclared variable"', function () {
                expect(obj.hasOwnProperty('justtest')).equal(false);
            });
        });
    });
    describe('test unset property', function () {
        class testProxyObject extends ProxyObject {
            test = 'value test';
            noValue;
        }
        const obj = new testProxyObject();
        it('should can delete variable has value ', function () {
            delete obj.test;
            expect('test' in obj).equal(false);
            expect(obj.hasOwnProperty('test')).equal(false);
        });
        it('should can delete variable has not value ', function () {
            delete obj.noValue;
            expect('noValue' in obj).equal(false);
            expect(obj.hasOwnProperty('noValue')).equal(false);
        });
        it('should can delete undeclared variable ', function () {
            delete obj.test2;
            expect('test2' in obj).equal(false);
            expect(obj.hasOwnProperty('test2')).equal(false);
        });
    });
});
describe('With extended class', function () {
    describe('test toString property', function () {
        class testObject {
            test = 'value';
            getTest() {
                return this.test;
            }
            test() {
                return 'test';
            }
        }
        class testProxyObject extends ProxyObject {
            test = 'value';
            toString() {
                return this.test + '1';
            }
            getTest() {
                return this.test;
            }
            test() {
                return 'test';
            }
        }
        const testObj = new testObject();
        const obj = new testProxyObject();
        it('should correct for valid toString', function () {
            expect(obj.toString()).equal('value1');
        });
        it('should correct for valid function', function () {
            expect(obj.getTest()).equal('value');
        });
        it('should correct for valid test function', function () {
            try {
                obj.test();
            } catch (err) {
                expect(err.name).equal('TypeError');
            }
        });
        it('should correct for valid test property', function () {
            expect(obj.test).equal('value');
        });
        it('should correct for valid test function pure obj', function () {
            try {
                testObj.test();
            } catch (err) {
                expect(err.name).equal('TypeError');
            }
            //expect().equal('test');
        });
        it('should correct for valid test property  pure obj', function () {
            expect(testObj.test).equal('value');
        });
    });

    describe('test setter and getter property', function () {
        class testSGProxyObject extends ProxyObject {
            test = 'value test';
            noValue;
            /*
            constructor(){
                super();
            }
            */
            __get(props) {
                return this[props] + '2';
            }
            __set(props, value) {
                return (this[props] = value + '3');
            }
        }
        const obj = new testSGProxyObject();
        it('should correct for valid get', function () {
            expect(obj.test).equal('value test2');
        });
        it('should correct for valid get undefined variable', function () {
            expect(obj.noValue).equal('undefined2');
        });
        it('should error for get undeclared property', function () {
            try {
                obj.test2;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('UnknownPropertyUnknown Property');
                expect(error.getMessage()).equal('Undefined property: testProxyObject' + SeperatorMethods + 'test2');
            }
        });
        it('should correct for valid set', function () {
            obj.test = 'changed value test';
            expect(obj.test).equal('changed value test32');
        });
        it('should correct for valid set undefined', function () {
            obj.noValue = 'changed value defined';
            expect(obj.noValue).equal('changed value defined32');
        });
        it('should allow to set undeclared property', function () {
            obj.test2 = 'new value test';
            expect(obj.test2).equal('new value test32');
        });
        it('should return false when setter', function () {
            class testSGProxyObject extends ProxyObject {
                __set(props, value) {
                    return false;
                }
            }
            const obj = new testSGProxyObject();
            obj.noValue = 'undefined value';
            expect(obj.noValue).equal(undefined);
        });
    });
    describe('test isset property', function () {
        class testProxyObject extends ProxyObject {
            test = 'value test';
            noValue;
            __isset(prop) {
                return !this.hasOwnProperty(prop);
            }
        }
        const obj = new testProxyObject();
        describe('test with "in"', function () {
            it('should true for variable has value"', function () {
                expect('test' in obj).equal(false);
            });
            it('should true for variable has no value"', function () {
                expect('noValue' in obj).equal(false);
            });
            it('should false for undeclared variable', function () {
                expect('justtest' in obj).equal(true);
            });
        });
        describe('test with "hasOwnProperty"', function () {
            it('should can variable has value ', function () {
                expect(obj.hasOwnProperty('test')).equal(false);
            });
            it('should true for variable has not value"', function () {
                expect(obj.hasOwnProperty('noValue')).equal(false);
            });
            it('should false for undeclared variable"', function () {
                expect(obj.hasOwnProperty('justtest')).equal(true);
            });
        });
    });
    describe('test unset property', function () {
        class testProxyObject extends ProxyObject {
            test = 'value test';
            noValue;
            __unset(prop) {
                this['new_' + prop] = this[prop];
                return delete this[prop];
            }
        }
        const obj = new testProxyObject();
        it('should can delete variable has value ', function () {
            delete obj.test;
            expect('test' in obj).equal(false);
            expect(obj.hasOwnProperty('test')).equal(false);
            expect(obj.new_test).equal('value test');
            try {
                obj.test;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('UnknownPropertyUnknown Property');
                expect(error.getMessage()).equal('Undefined property: testProxyObject' + SeperatorMethods + 'test');
            }
        });
        it('should can delete variable has not value ', function () {
            delete obj.noValue;
            expect('noValue' in obj).equal(false);
            expect(obj.hasOwnProperty('noValue')).equal(false);
            expect(obj.new_noValue).equal(undefined);
            try {
                obj.noValue;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('UnknownPropertyUnknown Property');
                expect(error.getMessage()).equal('Undefined property: testProxyObject' + SeperatorMethods + 'noValue');
            }
        });
        it('should can delete undeclared variable ', function () {
            delete obj.test2;
            expect('test2' in obj).equal(false);
            expect(obj.hasOwnProperty('test2')).equal(false);
            expect(obj.new_test2).equal(undefined);
            try {
                obj.test2;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('UnknownPropertyUnknown Property');
                expect(error.getMessage()).equal('Undefined property: testProxyObject' + SeperatorMethods + 'test2');
            }
        });
    });
    describe('test __call property', function () {
        class testProxyObject extends ProxyObject {
            test = 'value test';
            callTest() {
                return this.test;
            }
            __call(prop, args) {
                if (prop === 'warpTest') {
                    return this.callTest();
                } else {
                    return this[prop](args);
                }
            }
        }
        it('should call with warpcall', function () {
            const test = new testProxyObject();
            expect(test.warpTest()).equal('value test');
        });
        it('should call with callTest', function () {
            const test = new testProxyObject();
            expect(test.callTest()).equal('value test');
        });
    });
});

describe('static module no extended class', function () {
    describe('test setter and getter property', function () {
        var testProxyObject = class testProxyObject extends ProxyObject {
            static test = 'value test';
            static noValue;
        }.withProxy();
        it('should error trying trap __invoke', function () {
            try {
                testProxyObject('test');
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('Unknown Property');
                expect(error.getMessage()).equal(
                    'Undefined static property: testProxyObject' + SeperatorMethods + '__invoke',
                );
            }
        });

        it('should correct for valid get', function () {
            expect(testProxyObject.test).equal('value test');
        });
        it('should correct for valid get undefined variable', function () {
            expect(testProxyObject.noValue).equal(undefined);
        });
        it('should error for get undeclared property', function () {
            try {
                testProxyObject.test2;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('UnknownPropertyUnknown Property');
                expect(error.getMessage()).equal(
                    'Undefined static property: testProxyObject' + SeperatorMethods + 'test2',
                );
            }
        });
        it('should correct for valid set', function () {
            testProxyObject.test = 'changed value test';
            expect(testProxyObject.test).equal('changed value test');
        });
        it('should correct for valid set undefined', function () {
            testProxyObject.noValue = 'changed value defined';
            expect(testProxyObject.noValue).equal('changed value defined');
        });
        it('should allow to set undeclared property', function () {
            try {
                testProxyObject.test2 = 'new value test2';
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('UnknownPropertyUnknown Property');
                expect(error.getMessage()).equal(
                    'Undefined static property: testProxyObject' + SeperatorMethods + 'test2',
                );
            }
        });
    });
    describe('test isset property', function () {
        var testProxyObject = class testProxyObject extends ProxyObject {
            static test = 'value test';
            static noValue;
        }.withProxy();
        describe('test with "in"', function () {
            it('should true for variable has value"', function () {
                expect('test' in testProxyObject).equal(true);
            });
            it('should true for variable has no value"', function () {
                expect('noValue' in testProxyObject).equal(true);
            });
            it('should false for undeclared variable', function () {
                expect('justtest' in testProxyObject).equal(false);
            });
        });
        describe('test with "hasOwnProperty"', function () {
            it('should can variable has value ', function () {
                expect(testProxyObject.hasOwnProperty('test')).equal(true);
            });
            it('should true for variable has not value"', function () {
                expect(testProxyObject.hasOwnProperty('noValue')).equal(true);
            });
            it('should false for undeclared variable"', function () {
                expect(testProxyObject.hasOwnProperty('justtest')).equal(false);
            });
        });
    });
    describe('test unset property', function () {
        var testProxyObject = class testProxyObject extends ProxyObject {
            static test = 'value test';
            static noValue;
        }.withProxy();
        it('should can delete variable has value ', function () {
            delete testProxyObject.test;
            expect('test' in testProxyObject).equal(false);
            expect(testProxyObject.hasOwnProperty('test')).equal(false);
        });
        it('should can delete variable has not value ', function () {
            delete testProxyObject.noValue;
            expect('noValue' in testProxyObject).equal(false);
            expect(testProxyObject.hasOwnProperty('noValue')).equal(false);
        });
        it('should can delete undeclared variable ', function () {
            delete testProxyObject.test2;
            expect('test2' in testProxyObject).equal(false);
            expect(testProxyObject.hasOwnProperty('test2')).equal(false);
        });
    });
});
describe('static module With extended class', function () {
    describe('test setter and getter property', function () {
        var testProxyObject = class testProxyObject extends ProxyObject {
            static test = 'value test';
            static noValue;
            static __get(props) {
                //var val = super.__get(props);
                return this[props] + '2';
            }
            static __set(props, value) {
                this[props] = value + '3';
                return true;
            }
            static __invoke(...args) {
                return args;
            }
        }.withProxy();
        it('should valid trying trap __invoke', function () {
            const results = testProxyObject('test', 'test2');
            expect(results.length).equal(2);
            expect(results[0]).equal('test');
            expect(results[1]).equal('test2');
        });

        it('should correct for valid get', function () {
            expect(testProxyObject.test).equal('value test2');
        });
        it('should correct for valid get undefined variable', function () {
            expect(testProxyObject.noValue).equal('undefined2');
        });
        it('should error for get undeclared property', function () {
            try {
                testProxyObject.test2;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('UnknownPropertyUnknown Property');
                expect(error.getMessage()).equal(
                    'Undefined static property: testProxyObject' + SeperatorMethods + 'test2',
                );
            }
        });
        it('should correct for valid set', function () {
            testProxyObject.test = 'changed value test';
            expect(testProxyObject.test).equal('changed value test32');
        });
        it('should correct for valid set undefined', function () {
            testProxyObject.noValue = 'changed value defined';
            expect(testProxyObject.noValue).equal('changed value defined32');
        });
        it('should allow to set undeclared property', function () {
            try {
                testProxyObject.test2 = 'new value test';
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('UnknownPropertyUnknown Property');
                expect(error.getMessage()).equal(
                    'Undefined static property: testProxyObject' + SeperatorMethods + 'test2',
                );
            }
        });
    });
    describe('test toString property', function () {
        const testProxyObject = class testProxyObject extends ProxyObject {}.withProxy();
        it('should correct for valid toString', function () {
            expect(testProxyObject.toString().replace('ProxyObject {}', 'ProxyObject{}')).equal(
                'class testProxyObject extends ProxyObject{}',
            );
        });
    });
    describe('test __toString property', function () {
        const testProxyObject = class testProxyObject extends ProxyObject {
            static toString() {
                return this.name + '1';
            }
        }.withProxy();
        it('should correct for valid toString', function () {
            expect(testProxyObject.toString()).equal('testProxyObject1');
        });
    });

    describe('test isset property', function () {
        var testProxyObject = class testProxyObject extends ProxyObject {
            static test = 'value test';
            static noValue;
            static __isset(prop) {
                return !this.hasOwnProperty(prop);
            }
        }.withProxy();
        describe('test with "in"', function () {
            it('should true for variable has value"', function () {
                expect('test' in testProxyObject).equal(false);
            });
            it('should true for variable has no value"', function () {
                expect('noValue' in testProxyObject).equal(false);
            });
            it('should false for undeclared variable', function () {
                expect('justtest' in testProxyObject).equal(true);
            });
        });
        describe('test with "hasOwnProperty"', function () {
            it('should can variable has value ', function () {
                expect(testProxyObject.hasOwnProperty('test')).equal(false);
            });
            it('should true for variable has not value"', function () {
                expect(testProxyObject.hasOwnProperty('noValue')).equal(false);
            });
            it('should false for undeclared variable"', function () {
                expect(testProxyObject.hasOwnProperty('justtest')).equal(true);
            });
        });
    });
    describe('test unset property', function () {
        var testProxyObject = class testProxyObject extends ProxyObject {
            static test = 'value test';
            static noValue;
            static __unset(prop) {
                this['new_' + prop] = this[prop];
                return delete this[prop];
            }
        }.withProxy();
        it('should can delete variable has value ', function () {
            delete testProxyObject.test;
            expect('test' in testProxyObject).equal(false);
            expect(testProxyObject.hasOwnProperty('test')).equal(false);
            expect(testProxyObject.new_test).equal('value test');
            try {
                testProxyObject.test;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('UnknownPropertyUnknown Property');
                expect(error.getMessage()).equal(
                    'Undefined static property: testProxyObject' + SeperatorMethods + 'test',
                );
            }
        });
        it('should can delete variable has not value ', function () {
            delete testProxyObject.noValue;
            expect('noValue' in testProxyObject).equal(false);
            expect(testProxyObject.hasOwnProperty('noValue')).equal(false);
            expect(testProxyObject.new_noValue).equal(undefined);
            try {
                testProxyObject.noValue;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('UnknownPropertyUnknown Property');
                expect(error.getMessage()).equal(
                    'Undefined static property: testProxyObject' + SeperatorMethods + 'noValue',
                );
            }
        });
        it('should can delete undeclared variable ', function () {
            delete testProxyObject.test2;
            expect('test2' in testProxyObject).equal(false);
            expect(testProxyObject.hasOwnProperty('test2')).equal(false);
            expect(testProxyObject.new_test2).equal(undefined);
            try {
                testProxyObject.test2;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('UnknownPropertyUnknown Property');
                expect(error.getMessage()).equal(
                    'Undefined static property: testProxyObject' + SeperatorMethods + 'test2',
                );
            }
        });
    });
});
//*/
