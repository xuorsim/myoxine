import { expect } from 'chai';
import { it } from 'mocha';
import { MagicalObject } from './../src/MagicalObject';
describe('test with simple valid declaration', function () {
    class testMagicalObject extends MagicalObject {
        test = '';
    }
    it('should correct for normal setter and getter', function () {
        const obj = new testMagicalObject();
        obj.test = 'test';
        expect(obj.test).equal('test');
    });
});
describe('test with invalid getter', function () {
    class testMagicalObject extends MagicalObject {
        test = '';
        __get = () => {
            return 'invalid';
        };
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
        __set = () => {
            this.test = 'aaa';
            return true;
        };
    }
    it('should allow invalid param getter', function () {
        const obj = new testMagicalObject();
        obj.test = 'test';
        expect(obj.test).equal('invalid');
    });
});
