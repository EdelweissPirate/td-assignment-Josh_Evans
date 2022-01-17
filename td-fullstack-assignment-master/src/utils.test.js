/* eslint-env mocha */
import { expect } from 'chai';
import { detectSums, addNums, addToEachInArray, arrayIsRedundant, checkForNegs, calcSums, returnResults } from './utils';

describe('Detect sums', () => {
  it('should fail if input is not an array', () => {
    expect(() => detectSums()).to.throw('Input is not an array');
  });

  it('should return an array', () => {
    const result = detectSums([]);
    expect(result).to.be.instanceof(Array);
  });

  it('should detect sums', () => {
    const result = detectSums([1, 2]);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(0);
  });

  it('should detect sums in order', () => {
    const result = detectSums([1, 2, 3]);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(1);
    expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2});
  });
});

describe('check utility functions are returning correctly', () => {
  it('should add numbers correctly', () => {
    const result = addNums(2)(2);
    expect(result).to.equal(4);
  });

  it('should return true if sum of items equal', () => {
    const result = arrayIsRedundant([0, 1, 2], [1, 0, 2]);
    expect(result).to.equal(true);
  });

  it('should add each value of the array to each value of the array and return an array', () => {
    const result = addToEachInArray([1, 2, 3], 1);
    expect(result).to.be.instanceOf(Array);
    expect(result).to.have.lengthOf(3);
    expect(result).to.have.members([2, 3, 4]);
  })

  it('should return true if array contains negative integers', () => {
    const result = checkForNegs([0, 1, -2, 3]);
    expect(result).to.equal(true);
  })

  it('should find sums in array', () => {
    const result = calcSums([1, 2, 3], 1);
    expect(result).to.deep.include([0, 1, 2]);
  })

  it('should return correct result', () => {
    const result = returnResults([3], [2, 3], [1, 2, 3], 0);
    expect(result).to.deep.include([ 0, 1, 2 ]);
  })

})
