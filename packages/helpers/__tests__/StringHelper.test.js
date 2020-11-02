const { expect } = require('chai');
const { it } = require('mocha');
//import MagicalObject from "./../lib/MagicalObject"
const StringHelper = require('../lib/StringHelper').default;
///*
describe('String transform', function () {
    it('lowerCase', function () {
        expect(StringHelper.lowerCase("AaBbCcDdEe123!@#")).equal('aabbccddee123!@#');
    });
    it('upperCase', function () {
        expect(StringHelper.upperCase("AaBbCcDdEe123!@#")).equal('AABBCCDDEE123!@#');
    });
    it('sentenceCase', function () {
        expect(StringHelper.sentenceCase("test test test. aaa aaaaa aaaa aaaa. bbbbb bbbba")).equal('Test test test. Aaa aaaaa aaaa aaaa. Bbbbb bbbba');
    });
    
    it('camelCase', function () {
        expect(StringHelper.camelCase("aaa bbb_cccc-ddd&eee")).equal('aaaBbbCcccDddeee');
    });
    it('unCamelCase', function () {
        expect(StringHelper.unCamelCase("AaaBbbCcccDddeee")).equal('aaa bbb cccc dddeee');
    });
    it('pascalCase', function () {
        expect(StringHelper.pascalCase("aaa bbb_cccc-ddd&eee")).equal('AaaBbbCcccDddeee');
    });
    it('latinese', function () {
        expect(StringHelper.replaceAccents("ĀāĂăĄą")).equal('AaAaAa');
    });
    it('properCase', function () {
        expect(StringHelper.properCase("i love you more then words")).equal('I Love You More Then Words');
    });
    it('abbreviate', function () {
        expect(StringHelper.abbreviate(StringHelper.properCase("i love you more then words"))).equal('ILYMTW');
        expect(StringHelper.abbreviate(StringHelper.properCase(""))).equal('');
    });
    it('hyphenate', function () {
        expect(StringHelper.hyphenate("i love you more then words")).equal('i-love-you-more-then-words');
    });
    it('underscore', function () {
        expect(StringHelper.underscore("i love you more then words")).equal('i_love_you_more_then_words');
    });
    it('unhyphenate', function () {
        expect(StringHelper.unhyphenate('i-love-you-more-then-words')).equal("i love you more then words");
    });
    it('truncate', function () {
        expect(StringHelper.truncate('i love you more then words',10)).equal("i love...");
        expect(StringHelper.truncate('i love you more then words',100)).equal("i love you more then words");
    });    
    it('crop', function () {
        expect(StringHelper.crop('i love you more then words',10)).equal("i love...");
    });    
    
    it('stripHtmlTags', function () {
        expect(StringHelper.stripHtmlTags('<b>love</b>')).equal("love");
    });    
    it('escapeHtml', function () {
        expect(StringHelper.escapeHtml('<b>love</b>')).equal("&lt;b&gt;love&lt;/b&gt;");
    });    
    it('unescapeHtml', function () {
        expect(StringHelper.unescapeHtml('&lt;b&gt;love&lt;/b&gt;')).equal("<b>love</b>");
    });    
    it('normalizeLineBreaks', function () {
        expect(StringHelper.normalizeLineBreaks("i love you \n more then word","<br />")).equal("i love you <br /> more then word");
        expect(StringHelper.normalizeLineBreaks("i love you \n more then word")).equal("i love you n more then word");
    });    
    it('escapeUnicode', function () {
        expect(StringHelper.escapeUnicode("ĀāĂăĄą")).equal("\\u0100\\u0101\\u0102\\u0103\\u0104\\u0105");
        expect(StringHelper.escapeUnicode("ĀāĂăĄą abc")).equal("\\u0100\\u0101\\u0102\\u0103\\u0104\\u0105 abc");
    });
    it('removeNonASCII', function () {
        expect(StringHelper.removeNonASCII("ĀāĂăĄą")).equal("");
        expect(StringHelper.removeNonASCII("ĀāĂăĄą abc")).equal(" abc");
    });    
    it('interpolate', function () {
        expect(StringHelper.interpolate("{{name}} said Hello World to the crowd of people.{{ok}}",{"name":"alice"})).equal("alice said Hello World to the crowd of people.");
    });    
    it('escapeRegExp', function () {
        expect(StringHelper.escapeRegExp("[a-zA-Z0-9]")).equal("\\[a-zA-Z0-9\\]");
    });    
    it('slugify', function () {
        expect(StringHelper.slugify("i love you more then word")).equal("i-love-you-more-then-word");
    });    
    
    
});


describe('String Trimming', function () {
    it('ltrim', function () {
        expect(StringHelper.ltrim(" test ")).equal('test ');
        expect(StringHelper.ltrim("")).equal('');
    });
    it('rtrim', function () {
        expect(StringHelper.rtrim(" test ")).equal(' test');
        expect(StringHelper.rtrim("")).equal('');
    });
    it('trim', function () {
        expect(StringHelper.trim(" test ")).equal('test');
    });
});
describe('String padding', function () {
    it('lpad', function () {
        expect(StringHelper.lpad("test",10,"-")).equal('------test');
        expect(StringHelper.lpad("test",10)).equal('      test');
        expect(StringHelper.lpad("test",3)).equal('test');
    });
    it('rpad', function () {
        expect(StringHelper.rpad("test",10,"-")).equal('test------');
        expect(StringHelper.rpad("test",10)).equal('test      ');
        expect(StringHelper.rpad("test",3)).equal('test');
    });
});
describe('String checking', function () {
    it('rpad', function () {
        expect(StringHelper.contains("i love you more then words","love")).equal(true);
        expect(StringHelper.contains("i love you more then words","hate")).equal(false);
    });
});

