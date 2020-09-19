const {expect} = require('chai');
const {it} = require('mocha');
const { MagicalObject } = require('./../lib/MagicalObject');

describe('test with simple valid declaration', function () {
    const Rectangle = class { 
        constructor(height, width) { 
          this.height = height; 
          this.width = width; 
        } 
        
        area() { 
          return this.height * this.width; 
        } 
      }; 
      it('should correct for normal setter and getter', function () {
        const obj = new Rectangle(10,20);
        obj.height=20;
        expect(obj.area()).equal(400);
    });
});
