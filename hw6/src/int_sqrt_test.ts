import * as assert from 'assert';
import { int_sqrt } from './int_sqrt';

// - Tests according to our class requirements for each int_sqrt.ts function
// - Include comments describing which requirements each test fulfills

describe('int_sqrt', function() {

    it('int_sqrt', function() {
        // branch coverage: verify correct handling of a perfect square, testing loop coverage with multiple iterations.
        assert.deepStrictEqual(int_sqrt(1n), 1n); // loop 0 iterations
        assert.deepStrictEqual(int_sqrt(4n), 2n); // loop 1 iteration
        assert.deepStrictEqual(int_sqrt(9n), 3n); // loop 2 iterations
        assert.deepStrictEqual(int_sqrt(100000000000000n), 10000000n); // loop a large number of iterations

        // branch coverage: tests boundaries just above or below perfect squares. (not perfect squares)
        assert.deepStrictEqual(int_sqrt(2n), 2n);
        assert.deepStrictEqual(int_sqrt(35n), 6n);
    });

});