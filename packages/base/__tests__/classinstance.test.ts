const { expect } = require('chai');
import { it } from 'mocha';
//import MagicalObject from "./../lib/MagicalObject"
const BaseObject = require('../lib/BaseObject').default;
///*
describe('no extended class', function () {
    describe('get class name', function () {
        /*
        const testBaseObject =class testBaseObject extends BaseObject{

        }.withProxy();
        it('should return testBaseObject when call className ', function () {
            expect(testBaseObject.className()).equal('testBaseObject');

        })
        */
        var name = 'Brandon';
        var age = 26;
        function greet(arr, nameArg, ageArg) {
            console.log(arr[0] + nameArg + arr[1] + ageArg + arr[2]);
        }
        greet`Woah, ${name} is ${age}?`;
        // "Woah, Brandon is 26?"
    });
});
