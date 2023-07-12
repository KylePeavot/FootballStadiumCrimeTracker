import {initCap} from "./string.service";

describe('String utils', function () {
    it('should capitalise the first letter of a string', function () {
        //Given
        const theString = 'the string';

        //When/Then
        expect(initCap(theString)).toBe('The string');
    });
});