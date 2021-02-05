import LATIN_MAP from './LatinMap';
export default class StringHelper {
    static WHITE_SPACES: Array<string> = [
        ' ',
        '\n',
        '\r',
        '\t',
        '\f',
        '\v',
        '\u00A0',
        '\u1680',
        '\u180E',
        '\u2000',
        '\u2001',
        '\u2002',
        '\u2003',
        '\u2004',
        '\u2005',
        '\u2006',
        '\u2007',
        '\u2008',
        '\u2009',
        '\u200A',
        '\u2028',
        '\u2029',
        '\u202F',
        '\u205F',
        '\u3000',
    ];
    /**
     * Remove chars from beginning of string.
     */
    static ltrim(str: string, chars?: Array<string>): string {
        chars = chars || StringHelper.WHITE_SPACES;

        let start = 0;
        const len: number = str.length;
        const charLen: number = chars.length;
        let found = true;
        let i: number, c: string;

        while (found && start < len) {
            found = false;
            i = -1;
            c = str.charAt(start);

            while (++i < charLen) {
                if (c === chars[i]) {
                    found = true;
                    start++;
                    break;
                }
            }
        }

        return start >= len ? '' : str.substr(start, len);
    }

    /**
     * Remove chars from end of string.
     */
    static rtrim(str: string, chars?: Array<string>): string {
        chars = chars || StringHelper.WHITE_SPACES;

        let end: number = str.length - 1;
        const charLen: number = chars.length;
        let found = true;
        let i: number;
        let c: string;

        while (found && end >= 0) {
            found = false;
            i = -1;
            c = str.charAt(end);

            while (++i < charLen) {
                if (c === chars[i]) {
                    found = true;
                    end--;
                    break;
                }
            }
        }

        return end >= 0 ? str.substring(0, end + 1) : '';
    }

    /**
     * Remove white-spaces from beginning and end of string.
     */
    static trim(str: string, chars?: Array<string>): string {
        chars = chars || StringHelper.WHITE_SPACES;
        return StringHelper.ltrim(StringHelper.rtrim(str, chars), chars);
    }

    /**
     * Capture all capital letters following a word boundary (in case the
     * input is in all caps)
     */
    static abbreviate(str: string): string {
        const strMatch = str.match(/\b([A-Z])/g);
        return strMatch ? strMatch.join('') : '';
    }
    /**
     * "Safer" String.toLowerCase()
     */
    static lowerCase(str: string): string {
        return str.toLowerCase();
    }
    /**
     * "Safer" String.toUpperCase()
     */
    static upperCase(str: string): string {
        return str.toUpperCase();
    }
    /**
     * Replaces all accented chars with regular ones
     */
    ///*
    static replaceAccents(str: string): string {
        return str.replace(/[^A-Za-z0-9]/g, function (x) {
            return LATIN_MAP[x] || x;
        });
    }
    //*/
    /*
    static replaceAccents(str: string): string {
        // verifies if the String has accents and replace them
        if (str.search(/[\xC0-\xFF]/g) > -1) {
            str = str
                .replace(/[\xC0-\xC5]/g, 'A')
                .replace(/[\xC6]/g, 'AE')
                .replace(/[\xC7]/g, 'C')
                .replace(/[\xC8-\xCB]/g, 'E')
                .replace(/[\xCC-\xCF]/g, 'I')
                .replace(/[\xD0]/g, 'D')
                .replace(/[\xD1]/g, 'N')
                .replace(/[\xD2-\xD6\xD8]/g, 'O')
                .replace(/[\xD9-\xDC]/g, 'U')
                .replace(/[\xDD]/g, 'Y')
                .replace(/[\xDE]/g, 'P')
                .replace(/[\xE0-\xE5]/g, 'a')
                .replace(/[\xE6]/g, 'ae')
                .replace(/[\xE7]/g, 'c')
                .replace(/[\xE8-\xEB]/g, 'e')
                .replace(/[\xEC-\xEF]/g, 'i')
                .replace(/[\xF1]/g, 'n')
                .replace(/[\xF2-\xF6\xF8]/g, 'o')
                .replace(/[\xF9-\xFC]/g, 'u')
                .replace(/[\xFE]/g, 'p')
                .replace(/[\xFD\xFF]/g, 'y');
        }

        return str;
    }
    */
    /**
     * Remove non-word chars.
     */
    static removeNonWord(str: string): string {
        return str.replace(/[^0-9a-zA-Z\xC0-\xFF \-]/g, '');
    }
    /**
     * Convert string to camelCase text.
     */
    static camelCase = (str: string): string => {
        str = StringHelper.replaceAccents(str).replace(/\_/g, ' '); //convert all underscor to spaces
        str = StringHelper.removeNonWord(str)
            .replace(/\-/g, ' ') //convert all hyphens to spaces
            .replace(/\s[a-z]/g, StringHelper.upperCase) //convert first char of each word to UPPERCASE
            .replace(/\s+/g, '') //remove spaces
            .replace(/^[A-Z]/g, StringHelper.lowerCase); //convert first char to lowercase
        return str;
    };
    /**
     * Add space between camelCase text.
     */
    static unCamelCase(str: string): string {
        str = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2');
        str = str.toLowerCase(); //add space between camelCase text
        return str;
    }

    /**
     * UPPERCASE first char of each word.
     */
    static properCase(str: string): string {
        return StringHelper.lowerCase(str).replace(/^\w|\s\w/g, StringHelper.upperCase);
    }
    /**
     * camelCase + UPPERCASE first char
     */
    static pascalCase(str: string): string {
        return StringHelper.camelCase(str).replace(/^[a-z]/, StringHelper.upperCase);
    }

    /**
     * Convert line-breaks from DOS/MAC to a single standard (UNIX by default)
     */
    static normalizeLineBreaks(str: string, lineEnd: string): string {
        lineEnd = lineEnd || 'n';
        return str
            .replace(/\rn/g, lineEnd) // DOS
            .replace(/\r/g, lineEnd) // Mac
            .replace(/\n/g, lineEnd); // Unix
    }
    /**
     * UPPERCASE first char of each sentence and lowercase other chars.
     */
    static sentenceCase(str: string): string {
        // Replace first char of each sentence (new line or after '.\s+') to
        // UPPERCASE
        return StringHelper.lowerCase(str).replace(/(^\w)|\.\s+(\w)/gm, StringHelper.upperCase);
    }
    /**
     * Convert to lower case, remove accents, remove non-word chars and
     * replace spaces with the specified delimeter.
     * Does not split camelCase text.
     */
    static slugify(str: string, delimeter: string): string {
        if (delimeter == null) {
            delimeter = '-';
        }

        str = StringHelper.replaceAccents(str);
        str = StringHelper.removeNonWord(str);
        str = StringHelper.trim(str) //should come after removeNonWord
            .replace(/ +/g, delimeter) //replace spaces with delimeter
            .toLowerCase();

        return str;
    }
    /**
     * Replaces spaces with hyphens, split camelCase text, remove non-word chars, remove accents and convert to lower case.
     */
    static hyphenate(str: string): string {
        str = StringHelper.unCamelCase(str);
        return StringHelper.slugify(str, '-');
    }

    /**
     * Replaces hyphens with spaces. (only hyphens between word chars)
     */
    static unhyphenate(str: string): string {
        return str.replace(/(\w)(-)(\w)/g, '$1 $3');
    }
    /**
     * Replaces spaces with underscores, split camelCase text, remove
     * non-word chars, remove accents and convert to lower case.
     */
    static underscore(str: string): string {
        str = StringHelper.unCamelCase(str);
        return StringHelper.slugify(str, '_');
    }
    /**
     * Limit number of chars.
     */
    static truncate(str: string, maxChars: number, append: string, onlyFullWords?: boolean): string {
        append = append || '...';
        maxChars = onlyFullWords ? maxChars + 1 : maxChars;

        str = StringHelper.trim(str);
        if (str.length <= maxChars) {
            return str;
        }
        str = str.substr(0, maxChars - append.length);
        //crop at last space or remove trailing whitespace
        str = onlyFullWords ? str.substr(0, str.lastIndexOf(' ')) : StringHelper.trim(str);
        return str + append;
    }

    /**
     * Searches for a given substring
     */
    static contains(str: string, substring: string, fromIndex: number): boolean {
        return str.indexOf(substring, fromIndex) !== -1;
    }

    /**
     * Truncate string at full words.
     */
    static crop(str: string, maxChars: number, append: string): string {
        return StringHelper.truncate(str, maxChars, append, true);
    }

    /**
     * Escape RegExp string chars.
     */
    static escapeRegExp(str: string): string {
        const ESCAPE_CHARS = /[\\.+*?\^$\[\](){}\/'#]/g;
        return str.replace(ESCAPE_CHARS, '\\$&');
    }
    /**
     * Escapes a string for insertion into HTML.
     */
    static escapeHtml(str: string): string {
        str = str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;');

        return str;
    }
    /**
     * Unescapes HTML special chars
     */
    static unescapeHtml(str: string): string {
        str = str
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            // eslint-disable-next-line quotes
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"');
        return str;
    }
    /**
     * Escape string into unicode sequences
     */
    static escapeUnicode(str: string, shouldEscapePrintable?: boolean): string {
        return str.replace(/[\s\S]/g, function (ch) {
            // skip printable ASCII chars if we should not escape them
            if (!shouldEscapePrintable && /[\x20-\x7E]/.test(ch)) {
                return ch;
            }
            // we use "000" and slice(-4) for brevity, need to pad zeros,
            // unicode escape always have 4 chars after "\u"
            return '\\u' + ('000' + ch.charCodeAt(0).toString(16)).slice(-4);
        });
    }
    /**
     * Remove HTML tags from string.
     */
    static stripHtmlTags(str: string): string {
        return str.replace(/<[^>]*>/g, '');
    }
    /**
     * Remove non-printable ASCII chars
     */
    static removeNonASCII(str: string): string {
        // Matches non-printable ASCII chars -
        // http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
        return str.replace(/[^\x20-\x7E]/g, '');
    }
    /**
     * String interpolation
     */
    static interpolate(template: string, replacements: Record<string, string>, syntax?: string): string {
        const stache = /\{\{(\w+)\}\}/g; //mustache-like

        const replaceFn = function (match: string, prop: string): string {
            return prop in replacements ? replacements[prop] : '';
        };

        return template.replace(syntax || stache, replaceFn);
    }
    /**
     * Repeat string n times
     */
    static repeat(str: string, n: number): string {
        return new Array(n + 1).join(str);
    }
    /**
     * Pad string with `char` if its' length is smaller than `minLen`
     */
    static rpad(str: string, minLen: number, ch?: string): string {
        ch = ch || ' ';
        return str.length < minLen ? str + StringHelper.repeat(ch, minLen - str.length) : str;
    }

    /**
     * Pad string with `char` if its' length is smaller than `minLen`
     */
    static lpad(str: string, minLen: number, ch?: string): string {
        ch = ch || ' ';

        return str.length < minLen ? StringHelper.repeat(ch, minLen - str.length) + str : str;
    }
}
