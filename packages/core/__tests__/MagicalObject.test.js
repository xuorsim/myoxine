/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require('chai');
const { it } = require('mocha');
//import ProxyObject from './../lib/ProxyObject';
const MagicalObject = require('../lib/base/MagicalObject').default;
const get_methods = require('../lib/base/ObjectInfo').get_methods;
const SeperatorMethods = '::';
describe('test getter, setter property', function () {
    ///*
    it('should return value when declared property', function () {
        class testMagicalObject extends MagicalObject {
            bbb = 'test';
        }
        const test = new testMagicalObject();
        test.bbb = 'bbb';
        expect(test.bbb).equal('bbb');
        expect(test.hasOwnProperty('bbb')).equal(true);
        expect('bbb' in test).equal(true);
        delete test.bbb;
    });
    it('should return error when undeclare property', function () {
        class testMagicalObject extends MagicalObject {
            bbb = 'test';
        }
        const test = new testMagicalObject();
        try {
            test.aaa;
        } catch (error) {
            expect(error.getName()).equal('Unknown Property');
            expect(error.getMessage()).equal('Undefined property: testMagicalObject' + SeperatorMethods + 'aaa');
        }
        try {
            test.aaa = 'aaaa';
        } catch (error) {
            expect(error.getName()).equal('Unknown Property');
            expect(error.getMessage()).equal('Undefined property: testMagicalObject' + SeperatorMethods + 'aaa');
        }
        try {
            delete test.aaa;
        } catch (error) {
            expect(error.getName()).equal('Unknown Property');
            expect(error.getMessage()).equal('Undefined property: testMagicalObject' + SeperatorMethods + 'aaa');
        }
    });
    //*/
    it('should call __get __set __isset and __unset when undeclare property', function () {
        ///*
        class testMagicalObject extends MagicalObject {
            #hiddenProp = 'zzz';
            constructor(data) {
                super();
                this.#hiddenProp = data;
                this.__isset = this.__isset.bind(this);
                this.__get = this.__get.bind(this);
                this.__set = this.__set.bind(this);
                this.__unset = this.__unset.bind(this);
                //return this.withProxy();
            }
            __get(prop) {
                return this.#hiddenProp;
            }
            __set(prop, value) {
                //console.log(this.getHidden() + 'vvv');
                return (this.#hiddenProp = value);
            }
            __unset(prop) {
                return (this.#hiddenProp = 'zzz');
            }
            __isset(prop) {
                return this.#hiddenProp !== 'zzz';
            }
            getHidden() {
                return this.#hiddenProp;
            }
        }
        const test = new testMagicalObject('xxx');
        test.ccc = 'aaa';
        expect(test.ccc).equal('aaa');
        expect('ccc' in test).equal(true);
        delete test.ccc;
        expect(test.hasOwnProperty('ccc')).equal(false);
        //*/
        /*
        class DataStore {
            #data; // must be declared
            constructor(data) {
                this.#data = data;
            }
            getData() {
                return this.#data;
            }
        }
        const test = new DataStore('aaa');
        expect(test.getData()).equal('aaa');
        */
    });
    it('should call __invoke', function () {
        var testMagicalObject = class testMagicalObject extends MagicalObject {
            static __invoke(...args) {
                console.log('invoke');
                return args;
            }
        }.withProxy();
        const results = testMagicalObject('test', 'test2');
        expect(results.length).equal(2);
        expect(results[0]).equal('test');
        expect(results[1]).equal('test2');
    });
    it('should error call __invoke', function () {
        var testMagicalObject = class testMagicalObject extends MagicalObject {}.withProxy();
        try {
            const results = testMagicalObject('test', 'test2');
        } catch (error) {
            expect(error.getName()).equal('Unknown Property');
            expect(error.getMessage()).equal(
                'Undefined static property: testMagicalObject' + SeperatorMethods + '__invoke',
            );
        }
    });
});
