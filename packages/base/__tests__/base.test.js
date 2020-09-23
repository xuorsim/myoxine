const {expect} = require('chai');
const { get } = require('http');
const {it} = require('mocha');
const { MagicalObject } = require('./../lib/MagicalObject');
describe('no extended class', function () {
    describe('test setter and getter property', function () {
        class testMagicalObject extends MagicalObject {
            test = 'value test';
            noValue ;
        }
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
                //console.log(error.message);
                expect(error.name).equal('Exception');
                expect(error.message).equal('Undefined property: testMagicalObject.test2')
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
            noValue ;
        }
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
            noValue ;
        }
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

 