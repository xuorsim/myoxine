import { expect } from 'chai';
import { it } from 'mocha';
import { MagicalObject } from './../lib/MagicalObject';
describe('test with simple declaration', function () {
    class testMagicalObject extends MagicalObject {
        test = undefined;
        static testStatic: string | undefined = undefined;
        runTest(msg): string {
            return msg;
        }
    }
    it('should correct for normal setter and getter', function () {
        const obj = new testMagicalObject();
        obj.test = 'test';
        expect(obj.test).equal('test');
    });
    it('should correct for delete', function () {
        const obj = new testMagicalObject();
        delete obj.test;
        expect(obj.test).equal(undefined);
        delete obj.test;
        expect(obj.test).equal(undefined);
        obj.test = 'test';
        delete obj.test;
        expect(obj.test).equal(undefined);
    });
    it('should correct for isset', function () {
        const obj = new testMagicalObject();
        //expect('test' in obj).equal(true);
        delete obj.test;
        expect('test' in obj).equal(false);
    });
    it('should correct for tostring', function () {
        const obj = new testMagicalObject();
        expect(obj.toString()).equal('testMagicalObject');
        //expect(obj + ' test').equal('testMagicalObject test');
    });
    it('should correct for call', function () {
        const obj = new testMagicalObject();
        expect(obj.runTest('its work')).equal('its work');
    });
});
/*
describe('test with invalid getter', function () {
    class testMagicalObject extends MagicalObject {
        test = '';
        __get() {
            return 'invalid';
        }
    }
    it('should allow invalid param getter', function () {
        const obj = new testMagicalObject();
        obj.test = 'test';
        expect(obj.test).equal('invalid');
    });
});
describe('test with invalid setter', function () {
    class testMagicalObject extends MagicalObject {
        test = '';
        Anothertest = '';
        __set() {
            this.test = 'invalid';
            return true;
        }
    }
    it('should allow invalid param setter', function () {
        const obj = new testMagicalObject();
        obj.test = 'test';
        expect(obj.test).equal('invalid');
    });
});
*/
//describe('test with invalid unsetter', function () {});
