import * as assert from 'assert';
import { even_non_zeros } from './even_non_zeros';

// - Tests according to our class requirements for even_non_zeros
// - Include comments describing which requirements each test fulfills

describe('even_non_zeros', function() {

    // Test for an empty list (edge case, exhaustive for small inputs)
    it('empty list', function() {
        // Fulfills exhaustive testing for an empty input and verifies that an empty list is even.
        const [nonZeroCount, isEven] = even_non_zeros({ kind: "nil" });
        assert.strictEqual(nonZeroCount, 0n);
        assert.strictEqual(isEven, true);
    });

    // Test for a single zero digit (edge case, exhaustive for small inputs)
    it('[0]', function() {
        // Fulfills exhaustive testing for a single-element list containing 0 and verifies evenness.
        const [nonZeroCount, isEven] = even_non_zeros({ kind: "cons", hd: 0, tl: { kind: "nil" } });
        assert.strictEqual(nonZeroCount, 0n);
        assert.strictEqual(isEven, true);
    });

    // Test for a single non-zero digit '1' (edge case, exhaustive for small inputs)
    it('[1]', function() {
        // Fulfills exhaustive testing for a single-element list containing 1 and verifies that it toggles evenness.
        const [nonZeroCount, isEven] = even_non_zeros({ kind: "cons", hd: 1, tl: { kind: "nil" } });
        assert.strictEqual(nonZeroCount, 1n);
        assert.strictEqual(isEven, false);
    });

    // Test for a single non-zero digit '2' (edge case, exhaustive for small inputs)
    it('[2]', function() {
        // Fulfills exhaustive testing for a single-element list containing 2 and verifies evenness remains the same.
        const [nonZeroCount, isEven] = even_non_zeros({ kind: "cons", hd: 2, tl: { kind: "nil" } });
        assert.strictEqual(nonZeroCount, 1n);
        assert.strictEqual(isEven, true);
    });

    // Test for a mix of digits with an odd length (statement and branch coverage)
    it('[2, 1, 0]', function() {
        // Tests a combination of 0, 1, and 2 to ensure all branches are covered.
        const [nonZeroCount, isEven] = even_non_zeros({
            kind: "cons",
            hd: 2,
            tl: { kind: "cons", hd: 1, tl: { kind: "cons", hd: 0, tl: { kind: "nil" } } }
        });
        assert.strictEqual(nonZeroCount, 2n);
        assert.strictEqual(isEven, false);
    });

    // Test for a mix of digits with an even length (statement and branch coverage)
    it('[2, 0, 1, 0]', function() {
        // Tests a list with even length, ensuring correct counting and even parity.
        const [nonZeroCount, isEven] = even_non_zeros({
            kind: "cons",
            hd: 2,
            tl: {
                kind: "cons",
                hd: 0,
                tl: { kind: "cons", hd: 1, tl: { kind: "cons", hd: 0, tl: { kind: "nil" } } }
            }
        });
        assert.strictEqual(nonZeroCount, 2n);
        assert.strictEqual(isEven, false);
    });

    // Test for all non-zero elements (statement and branch coverage)
    it('[1, 1, 2, 1]', function() {
        // Tests a list with only non-zero digits to verify accurate counting and odd parity toggle.
        const [nonZeroCount, isEven] = even_non_zeros({
            kind: "cons",
            hd: 1,
            tl: {
                kind: "cons",
                hd: 1,
                tl: { kind: "cons", hd: 2, tl: { kind: "cons", hd: 1, tl: { kind: "nil" } } }
            }
        });
        assert.strictEqual(nonZeroCount, 4n);
        assert.strictEqual(isEven, false);
    });

    // Test for a list with only zeroes (edge case, statement coverage)
    it('[0, 0, 0]', function() {
        // Verifies that multiple zeroes do not affect non-zero count or evenness.
        const [nonZeroCount, isEven] = even_non_zeros({
            kind: "cons",
            hd: 0,
            tl: { kind: "cons", hd: 0, tl: { kind: "cons", hd: 0, tl: { kind: "nil" } } }
        });
        assert.strictEqual(nonZeroCount, 0n);
        assert.strictEqual(isEven, true);
    });

    // Test for alternating digits to verify parity toggling (branch and loop coverage)
    it('[1, 2, 1, 2]', function() {
        // Verifies correct counting of non-zero digits and parity with alternating values.
        const [nonZeroCount, isEven] = even_non_zeros({
            kind: "cons",
            hd: 1,
            tl: {
                kind: "cons",
                hd: 2,
                tl: { kind: "cons", hd: 1, tl: { kind: "cons", hd: 2, tl: { kind: "nil" } } }
            }
        });
        assert.strictEqual(nonZeroCount, 4n);
        assert.strictEqual(isEven, true);
    });
});