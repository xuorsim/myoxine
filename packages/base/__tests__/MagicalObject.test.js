const { expect } = require('chai');
const { it } = require('mocha');
//import MagicalObject from "./../lib/MagicalObject"
const MagicalObject = require('../lib/MagicalObject').default;
///*
describe('no extended class', function () {
    describe('constructor set property', function () {
        class testMagicalObjectC extends MagicalObject {
            test = 'value test';
            noValue="value";
            constructor(value) {
                super();
                this.noValue = value;
            }
        };//.withProxy();
        //testMagicalObject = testMagicalObject.proxyStatic();
        obj = new testMagicalObjectC('no value');
        it('should return when the value is not present', function() {
            expect(obj.noValue).equal('no value');
        });        
    });

    describe('test setter and getter property', function () {
        class testMagicalObject extends MagicalObject {
            test = 'value test';
            noValue;
        };
        const obj = new testMagicalObject();
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
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined property: testMagicalObject.test2');
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
        class testMagicalObject extends MagicalObject {
            test = 'value test';
            noValue;
        };
        const obj = new testMagicalObject();
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
        class testMagicalObject extends MagicalObject {
            test = 'value test';
            noValue;
        };
        const obj = new testMagicalObject();
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
    describe('test setter and getter property', function () {
        var testMagicalObject = class testMagicalObject extends MagicalObject {
            test = 'value test';
            noValue;
            constructor(){
                super();
            }
            __get(props) {
                var val = super.__get(props);
                return val + '2';
            }
            __set(props, value) {
                return super.__set(props, value + '3');
            }
        };
        const obj = new testMagicalObject();
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
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined property: testMagicalObject.test2');
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
    });
    describe('test isset property', function () {
        class testMagicalObject extends MagicalObject {
            test = 'value test';
            noValue;
            __isset(prop) {
                return !super.__isset(prop);
            }
        };
        const obj = new testMagicalObject();
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
        class testMagicalObject extends MagicalObject {
            test = 'value test';
            noValue;
            __unset(prop) {
                this['new_' + prop] = this[prop];
                return super.__unset(prop);
            }
        };
        const obj = new testMagicalObject();
        it('should can delete variable has value ', function () {
            delete obj.test;
            expect('test' in obj).equal(false);
            expect(obj.hasOwnProperty('test')).equal(false);
            expect(obj.new_test).equal('value test');
            try {
                obj.test;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined property: testMagicalObject.test');
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
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined property: testMagicalObject.noValue');
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
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined property: testMagicalObject.test2');
            }
        });
    });
});

describe('static module no extended class', function () {
    describe('test setter and getter property', function () {
        var testMagicalObject = class testMagicalObject extends MagicalObject {
            static test = 'value test';
            static noValue;
        }.withProxy();
        it('should error trying trap __invoke', function () {
            try {
                testMagicalObject('test');
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined static property: testMagicalObject.__invoke');
            }
        });

        it('should correct for valid get', function () {
            expect(testMagicalObject.test).equal('value test');
        });
        it('should correct for valid get undefined variable', function () {
            expect(testMagicalObject.noValue).equal(undefined);
        });
        it('should error for get undeclared property', function () {
            try {
                testMagicalObject.test2;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined static property: testMagicalObject.test2');
            }
        });
        it('should correct for valid set', function () {
            testMagicalObject.test = 'changed value test';
            expect(testMagicalObject.test).equal('changed value test');
        });
        it('should correct for valid set undefined', function () {
            testMagicalObject.noValue = 'changed value defined';
            expect(testMagicalObject.noValue).equal('changed value defined');
        });
        it('should allow to set undeclared property', function () {
            try {
                testMagicalObject.test2 = 'new value test2';
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined static property: testMagicalObject.test2');
            }
        });
    });
    describe('test isset property', function () {
        var testMagicalObject = class testMagicalObject extends MagicalObject {
            static test = 'value test';
            static noValue;
        }.withProxy();
        describe('test with "in"', function () {
            it('should true for variable has value"', function () {
                expect('test' in testMagicalObject).equal(true);
            });
            it('should true for variable has no value"', function () {
                expect('noValue' in testMagicalObject).equal(true);
            });
            it('should false for undeclared variable', function () {
                expect('justtest' in testMagicalObject).equal(false);
            });
        });
        describe('test with "hasOwnProperty"', function () {
            it('should can variable has value ', function () {
                expect(testMagicalObject.hasOwnProperty('test')).equal(true);
            });
            it('should true for variable has not value"', function () {
                expect(testMagicalObject.hasOwnProperty('noValue')).equal(true);
            });
            it('should false for undeclared variable"', function () {
                expect(testMagicalObject.hasOwnProperty('justtest')).equal(false);
            });
        });
    });
    describe('test unset property', function () {
        var testMagicalObject = class testMagicalObject extends MagicalObject {
            static test = 'value test';
            static noValue;
        }.withProxy();
        it('should can delete variable has value ', function () {
            delete testMagicalObject.test;
            expect('test' in testMagicalObject).equal(false);
            expect(testMagicalObject.hasOwnProperty('test')).equal(false);
        });
        it('should can delete variable has not value ', function () {
            delete testMagicalObject.noValue;
            expect('noValue' in testMagicalObject).equal(false);
            expect(testMagicalObject.hasOwnProperty('noValue')).equal(false);
        });
        it('should can delete undeclared variable ', function () {
            delete testMagicalObject.test2;
            expect('test2' in testMagicalObject).equal(false);
            expect(testMagicalObject.hasOwnProperty('test2')).equal(false);
        });
    });
});
describe('static module With extended class', function () {
    describe('test setter and getter property', function () {
        var testMagicalObject = class testMagicalObject extends MagicalObject {
            static test = 'value test';
            static noValue;
            static __get(props) {
                var val = super.__get(props);
                return val + '2';
            }
            static __set(props, value) {
                return super.__set(props, value + '3');
            }
            static __invoke(...args) {
                return args;
            }
        }.withProxy();
        it('should valid trying trap __invoke', function () {
            const results = testMagicalObject('test', 'test2');
            expect(results.length).equal(2);
            expect(results[0]).equal('test');
            expect(results[1]).equal('test2');
        });

        it('should correct for valid get', function () {
            expect(testMagicalObject.test).equal('value test2');
        });
        it('should correct for valid get undefined variable', function () {
            expect(testMagicalObject.noValue).equal('undefined2');
        });
        it('should error for get undeclared property', function () {
            try {
                testMagicalObject.test2;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined static property: testMagicalObject.test2');
            }
        });
        it('should correct for valid set', function () {
            testMagicalObject.test = 'changed value test';
            expect(testMagicalObject.test).equal('changed value test32');
        });
        it('should correct for valid set undefined', function () {
            testMagicalObject.noValue = 'changed value defined';
            expect(testMagicalObject.noValue).equal('changed value defined32');
        });
        it('should allow to set undeclared property', function () {
            try {
                testMagicalObject.test2 = 'new value test';
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined static property: testMagicalObject.test2');
            }
        });
    });
    describe('test isset property', function () {
        var testMagicalObject = class testMagicalObject extends MagicalObject {
            static test = 'value test';
            static noValue;
            static __isset(prop) {
                return !super.__isset(prop);
            }
        }.withProxy();
        describe('test with "in"', function () {
            it('should true for variable has value"', function () {
                expect('test' in testMagicalObject).equal(false);
            });
            it('should true for variable has no value"', function () {
                expect('noValue' in testMagicalObject).equal(false);
            });
            it('should false for undeclared variable', function () {
                expect('justtest' in testMagicalObject).equal(true);
            });
        });
        describe('test with "hasOwnProperty"', function () {
            it('should can variable has value ', function () {
                expect(testMagicalObject.hasOwnProperty('test')).equal(false);
            });
            it('should true for variable has not value"', function () {
                expect(testMagicalObject.hasOwnProperty('noValue')).equal(false);
            });
            it('should false for undeclared variable"', function () {
                expect(testMagicalObject.hasOwnProperty('justtest')).equal(true);
            });
        });
    });
    describe('test unset property', function () {
        var testMagicalObject = class testMagicalObject extends MagicalObject {
            static test = 'value test';
            static noValue;
            static __unset(prop) {
                this['new_' + prop] = this[prop];
                return super.__unset(prop);
            }
        }.withProxy();
        it('should can delete variable has value ', function () {
            delete testMagicalObject.test;
            expect('test' in testMagicalObject).equal(false);
            expect(testMagicalObject.hasOwnProperty('test')).equal(false);
            expect(testMagicalObject.new_test).equal('value test');
            try {
                testMagicalObject.test;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined static property: testMagicalObject.test');
            }
        });
        it('should can delete variable has not value ', function () {
            delete testMagicalObject.noValue;
            expect('noValue' in testMagicalObject).equal(false);
            expect(testMagicalObject.hasOwnProperty('noValue')).equal(false);
            expect(testMagicalObject.new_noValue).equal(undefined);
            try {
                testMagicalObject.noValue;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined static property: testMagicalObject.noValue');
            }
        });
        it('should can delete undeclared variable ', function () {
            delete testMagicalObject.test2;
            expect('test2' in testMagicalObject).equal(false);
            expect(testMagicalObject.hasOwnProperty('test2')).equal(false);
            expect(testMagicalObject.new_test2).equal(undefined);
            try {
                testMagicalObject.test2;
            } catch (error) {
                //console.log(error.getMessage());
                expect(error.getName()).equal('Exception');
                expect(error.getMessage()).equal('Undefined static property: testMagicalObject.test2');
            }
        });
    });
});
//*/
