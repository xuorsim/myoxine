const { expect } = require('chai');
const { it } = require('mocha');
//import MagicalObject from "./../lib/MagicalObject"
const BaseObject = require('../lib/BaseObject').default;
const get_methods = require('../lib/ObjectInfo').get_methods;

const SeperatorMethods = '::';
describe('define className baseobject', function () {
    class TestBaseObject extends BaseObject {}
    //const test = new TestBaseObject();
    it('should get classname', function () {
        expect(TestBaseObject.className()).equal('TestBaseObject');
    });
    it('should configure property', function () {
        try {
            const test = new TestBaseObject({ test: 'coba' });
            //expect(test.test).equal('coba');
        } catch (error) {
            //console.log(error.getMessage());
            expect(error.getName()).equal('Unknown Property');
            expect(error.getMessage()).equal('Setting unknown property: TestBaseObject' + SeperatorMethods + 'test');
        }
    });
});
describe('defined property baseobject', function () {
    class TestBaseObject extends BaseObject {
        test = 'test';
        changeTest(value) {
            this.test = value;
        }
    }
    it('should no erro when set & get', function () {
        const test = new TestBaseObject();
        test.test = 'aaa';
        expect(test.test).equal('aaa');
    });
    it('should check has method', function () {
        const test = new TestBaseObject();
        expect(test.hasMethod('changeTest')).equal(true);
    });
    it('should check has method', function () {
        const test = new TestBaseObject();
        expect(test.hasProperty('test')).equal(true);
    });
    it('should check can set property', function () {
        const test = new TestBaseObject();
        expect(test.canSetProperty('test')).equal(true);
    });
    it('should check can get property', function () {
        const test = new TestBaseObject();
        expect(test.canGetProperty('test')).equal(true);
    });
});
describe('undefined property baseobject', function () {
    class TestBaseObject extends BaseObject {
        test = 'test';
    }
    const test = new TestBaseObject();
    it('error getter Unknown Property', function () {
        try {
            test.no_declare;
        } catch (error) {
            //console.log(error.getMessage());
            expect(error.getName()).equal('Unknown Property');
            expect(error.getMessage()).equal(
                'Getting unknown property: TestBaseObject' + SeperatorMethods + 'no_declare',
            );
        }
    });
    it('error setter Unknown Property', function () {
        try {
            test.no_declare = 'aaa';
        } catch (error) {
            //console.log(error.getMessage());
            expect(error.getName()).equal('Unknown Property');
            expect(error.getMessage()).equal(
                'Setting unknown property: TestBaseObject' + SeperatorMethods + 'no_declare',
            );
        }
    });
    it('error  Unknown method', function () {
        try {
            test.coba();
        } catch (error) {
            expect(error.getName()).equal('Unknown Method');
            expect(error.getMessage()).equal('Undefined method: TestBaseObject' + SeperatorMethods + 'coba');
        }
    });
    it('retrun false when dont have setter and getter', function () {
        expect(delete test.no_declare).equal(false);
    });
});
describe('setter and getter property baseobject', function () {
    class TestBaseObject extends BaseObject {
        test = 'test';
        #privateProp = 'aaa';
        constructor() {
            super();
            this.getNoDeclare = this.getNoDeclare.bind(this);
            this.setNoDeclare = this.setNoDeclare.bind(this);
        }
        getNoDeclare() {
            return this.#privateProp;
        }
        setNoDeclare(val) {
            return (this.#privateProp = val);
        }
    }
    const test = new TestBaseObject();
    it('should call setter and getter function for Unknown Property', function () {
        test.no_declare = 'zzz';
        expect(test.no_declare).equal('zzz');
    });
    it('should call isset function for Unknown Property', function () {
        expect('no_declare' in test).equal(true);
    });
    it('should not call isset function for Unknown Property', function () {
        expect('test' in test).equal(true);
    });
    it('should return false when dont isset function for Unknown Property', function () {
        expect('coba' in test).equal(false);
    });
    it('should can unset when have setter function for Unknown Property', function () {
        delete test.no_declare;
        expect(test.no_declare).equal(null);
    });
});
describe('readonly/writeonly property baseobject', function () {
    class TestBaseObject extends BaseObject {
        //test = 'test';
        #privateProp = 'aaa';
        constructor() {
            super();
            this.setTest = this.setTest.bind(this);
            this.getCoba = this.getCoba.bind(this);
        }
        setTest(val) {
            return (this.#privateProp = val);
        }
        getCoba(val) {
            return this.#privateProp;
        }
    }
    const test = new TestBaseObject();
    it('error call getter and setter for write only', function () {
        try {
            test.test;
        } catch (error) {
            //console.log(error.getMessage());
            expect(error.getName()).equal('InvalidCallException');
            expect(error.getMessage()).equal('Getting write-only property: TestBaseObject' + SeperatorMethods + 'test');
        }
        try {
            test.coba = 'aaa';
        } catch (error) {
            //console.log(error.getMessage());
            expect(error.getName()).equal('InvalidCallException');
            expect(error.getMessage()).equal('Setting read-only property: TestBaseObject' + SeperatorMethods + 'coba');
        }
    });

    it('should retrunt false has property write only', function () {
        expect(test.hasOwnProperty('test')).equal(false);
        expect('test' in test).equal(false);
    });
    it('should retrunt true has property read only', function () {
        expect(test.hasOwnProperty('coba')).equal(true);
        expect('coba' in test).equal(true);
    });
    it('should check has property write only', function () {
        expect(test.hasProperty('test')).equal(true);
    });
    it('should check has property read only', function () {
        expect(test.hasProperty('coba')).equal(true);
    });
    it('error call unset for write only', function () {
        try {
            delete test.coba;
        } catch (error) {
            //console.log(error.getMessage());
            expect(error.getName()).equal('InvalidCallException');
            expect(error.getMessage()).equal(
                'Unsetting read-only property: TestBaseObject' + SeperatorMethods + 'coba',
            );
        }
    });
});

/*
describe('define getter baseobject', function () {
    it('should no erro when declare property', function () {
        class TestBaseObject extends BaseObject {
            test = 'test';
        }
        const test = new TestBaseObject();
        expect(test.test).equal('test');
    });
    it('error getter Unknown Property', function () {
        class TestBaseObject extends BaseObject {
            test = 'test';
        }
        const test = new TestBaseObject();
        try {
            test.no_declare;
        } catch (error) {
            //console.log(error.getMessage());
            expect(error.getName()).equal('Unknown Property');
            expect(error.getMessage()).equal(
                'Getting unknown property: TestBaseObject' + SeperatorMethods + 'no_declare',
            );
        }
    });
    it('should call getter function for Unknown Property', function () {
        class TestBaseObject extends BaseObject {
            test = 'test';
            #privateProp = 'aaa';
            constructor() {
                super();
                this.getNoDeclare = this.getNoDeclare.bind(this);
            }
            getNoDeclare() {
                return this.#privateProp;
            }
        }
        const test = new TestBaseObject();
        expect(test.no_declare).equal('aaa');
    });
    it('error call getter for write only', function () {
        class TestBaseObject extends BaseObject {
            test = 'test';
            #privateProp = 'aaa';
            constructor() {
                super();
                this.setNoDeclare = this.setNoDeclare.bind(this);
            }
            setNoDeclare(val) {
                return (this.#privateProp = val);
            }
        }
        const test = new TestBaseObject();
        try {
            test.no_declare;
        } catch (error) {
            //console.log(error.getMessage());
            expect(error.getName()).equal('InvalidCallException');
            expect(error.getMessage()).equal(
                'Getting write-only property: TestBaseObject' + SeperatorMethods + 'no_declare',
            );
        }
    });
});
*/
/*

describe('define setter baseobject', function () {
    it('error setter Unknown Property', function () {
        class TestBaseObject extends BaseObject {
            _tes = 'test';
        }
        const obj = new TestBaseObject();
        try {
            obj.test = 'aaaa';
        } catch (error) {
            //console.log(error.getMessage());
            expect(error.getName()).equal('Unknown Property');
            expect(error.getMessage()).equal('Setting unknown property: TestBaseObject' + SeperatorMethods + 'test');
        }
    });
    it('error getter InvalidCallException:', function () {
        class TestBaseObject extends BaseObject {
            test = 'test';
            getTest(value) {
                this.test = value;
            }
        }
        const test = new TestBaseObject();
        try {
            test.test = 'aaaa';
        } catch (error) {
            expect(error.getName()).equal('InvalidCallException');
            expect(error.getMessage()).equal('Setting read-only property: TestBaseObject' + SeperatorMethods + 'test');
        }
    });
    it('success define getter:', function () {
        class TestBaseObject extends BaseObject {
            _tes = 'test';
            setTest(value) {
                this._tes = value;
            }
            getTest() {
                return this._tes;
            }
        }
        const obj = new TestBaseObject();
        obj.test = 'aaaa';
        expect(obj.test).equal('aaaa');
    });
});
describe('define isset baseobject', function () {
    it('should return false', function () {
        class TestBaseObject extends BaseObject {
            _tes = 'test';
        }
        const obj = new TestBaseObject();
        expect(obj.hasOwnProperty('test')).equal(false);
    });
    it('should return true:', function () {
        class TestBaseObject extends BaseObject {
            _tes = 'test';
            getTest() {
                return this._tes;
            }
        }
        const obj = new TestBaseObject();
        expect(obj.hasOwnProperty('test')).equal(true);
    });
});
describe('define unset baseobject', function () {
    it('should return error:', function () {
        class TestBaseObject extends BaseObject {
            _tes = 'test';
            getTest() {
                return this._tes;
            }
        }
        const obj = new TestBaseObject();

        try {
            delete obj.test;
        } catch (error) {
            expect(error.getName()).equal('InvalidCallException');
            expect(error.getMessage()).equal(
                'Unsetting read-only property: TestBaseObject' + SeperatorMethods + 'test',
            );
        }
    });
    it('should return false:', function () {
        class TestBaseObject extends BaseObject {
            _tes = 'test';
        }
        const obj = new TestBaseObject();

        const flag = delete obj.test;
        expect(flag).equal(false);
    });
    it('success delete property:', function () {
        class TestBaseObject extends BaseObject {
            _tes = 'test';
            setTest(value) {
                return (this._tes = value);
            }
            getTest() {
                return this._tes;
            }
        }
        const obj = new TestBaseObject();
        delete obj.test;
        expect(obj.test).equal(null);
    });
});
describe('define call baseobject', function () {
    describe('should error when call function', function () {
        class TestBaseObject extends BaseObject {
            //someDo() {
            //    return false;
            //}
        }
        const obj = new TestBaseObject();
        //try {
        obj.someDo();
        //} catch (error) {
        //    expect(error.getName()).equal('Unknown Method');
        //    expect(error.getMessage()).equal('Calling unknown method: TestBaseObject' + SeperatorMethods + 'someDo()');
        //}
    });
});
describe('define General baseobject', function () {
    class TestBaseObject extends BaseObject {
        someDo() {
            return false;
        }
    }
    const obj = new TestBaseObject();
    describe('should true  when check method exist', function () {
        expect(obj.hasMethod('someDo')).equal(true);
    });
});
*/
