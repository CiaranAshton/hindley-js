const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const Maybe = require('folktale/maybe');

const { checkSigniture } = require('../index');

describe('checkSigniture', () => {
    it('returns true for correct signiture for addOne', () => {
        const addOne = x => x + 1;
        const signiture = `addOne :: Int -> Int`;

        const res = checkSigniture(addOne)(signiture);

        expect(res).to.be.true;
    });

    it('returns true for correct signiture for concat', () => {
        const add = x => y => x + y;
        const signiture = `add :: Int -> Int -> Int`;

        const res = checkSigniture(add)(signiture);

        expect(res).to.be.true;
    });

    it('returns false if the names do not match', () => {
        const addOne = x => x + 1;
        const signiture = `addTwo :: Int -> Int`;

        const res = checkSigniture(addOne)(signiture);

        expect(res).to.be.false;
    });

    it('returns false if there are different number of args to the sig', () => {
        const addOne = x => x + 1;
        const signiture = `addOne :: Int -> Int -> Int`;

        const res = checkSigniture(addOne)(signiture);

        expect(res).to.be.false;
    });

    it('returns false if there are different number of args to the sig', () => {
        const add = x => y => x + y;
        const signiture = `add :: Int -> Int -> Int -> Int`;

        const res = checkSigniture(add)(signiture);

        expect(res).to.be.false;
    });

    it('returns true when using "function" keyword', () => {
        const add = function(x) {
            return function(y) {
                return x + y;
            };
        };
        const signiture = `add :: Int -> Int -> Int`;

        const res = checkSigniture(add)(signiture);

        expect(res).to.be.true;
    });

    it('returns true when using "function" keyword with arrow functions', () => {
        const add = x => {
            return function(y) {
                return x + y;
            };
        };
        const signiture = `add :: Int -> Int -> Int`;

        const res = checkSigniture(add)(signiture);

        expect(res).to.be.true;
    });
});
