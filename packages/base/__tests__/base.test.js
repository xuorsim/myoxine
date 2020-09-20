const {expect} = require('chai');
const { get } = require('http');
const {it} = require('mocha');
const { MagicalObject } = require('./../lib/MagicalObject');
///*
describe('test with simple valid declaration', function () {
    class testMagicalObject extends MagicalObject {
    }
    let obj = new testMagicalObject();
    it('should correct get undefined property', function () {
        expect(obj.test).equal(undefined);        
        obj.test="test"
        expect(obj.test).equal("test");        
        delete obj.test;
        expect(obj.test).equal(undefined);        
    });

    it('should correct for normal setter and getter', function () {
        obj.test = 'test';
        expect(obj.test).equal('test');
        
    });
});
//*/
///*
describe('test with invalid getter', function () {
    class testMagicalObject extends MagicalObject {
        __get(){
            console.log("testMagicalObject.__get")
            return "invalid";
        };
    }
    it('should correct get undefined property', function () {
        let obj = new testMagicalObject();
        //obj.test="aa";
        expect(obj.test).equal('invalid');        
    });
});
//*/