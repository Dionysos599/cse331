import * as assert from 'assert';
import {p, s} from './pell';

// NOTE: ordinarily we would include comments describing the coverage on these
// test cases. Since you are writing your own code the descriptions may not
// match, so they have been ommited.

describe('pell', function() {

  // tests for function p
  it('p', function() {
    assert.deepStrictEqual(p(0n), 0n);
    assert.deepStrictEqual(p(1n), 1n);
    assert.deepStrictEqual(p(2n), 2n);
    assert.deepStrictEqual(p(4n), 12n);
  });

  // tests for function a
  it('s', function() {
    assert.deepStrictEqual(s(0n), 0n);
    assert.deepStrictEqual(s(1n), 0n);
    assert.deepStrictEqual(s(2n), 1n);
  });

});