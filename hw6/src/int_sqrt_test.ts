import * as assert from 'assert';
import { int_sqrt } from './int_sqrt';

// - Tests according to our class requirements for each int_sqrt.ts function
// - Include comments describing which requirements each test fulfills

describe('int_sqrt', function() {

    // Test for input 1 (boundary case, loop executes once)
    it('perfect square a', function() {
        // Fulfills exhaustive testing for a simple input where loop executes once.
        assert.strictEqual(int_sqrt(1n), 1n);
    });

    // Test for input 4 (perfect square, loop coverage)
    it('perfect square b', function() {
        // Verifies correct handling of a perfect square, testing loop coverage with multiple iterations.
        assert.strictEqual(int_sqrt(4n), 2n);
    });

    // Test for input 9 (perfect square, loop executes multiple times)
    it('perfect square c', function() {
        // Verifies loop execution for a larger perfect square.
        assert.strictEqual(int_sqrt(9n), 3n);
    });

    // Test for input 2 (boundary case, non-perfect square)
    it('imperfect square a', function() {
        // Tests boundary just above 1 to check correctness for values that are not perfect squares.
        assert.strictEqual(int_sqrt(2n), 2n);
    });

    // Test for input 35 (non-perfect square boundary case, branch coverage)
    it('imperfect square b', function() {
        // Tests a non-perfect square just below the next perfect square to verify boundary handling.
        assert.strictEqual(int_sqrt(35n), 6n);
    });

    // Test for a large input (performance and correctness test for large bigint values)
    it('large input', function() {
        // Tests performance and correctness for large inputs to ensure bigint handling.
        assert.strictEqual(int_sqrt(100000000000000n), 10000000n);
    });

});