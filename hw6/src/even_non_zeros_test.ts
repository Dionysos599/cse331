import * as assert from 'assert';
import { even_non_zeros } from './even_non_zeros';

// - Tests according to our class requirements for even_non_zeros
// - Include comments describing which requirements each test fulfills

describe('even_non_zeros', function() {

    it('even_non_zeros', function() {
        // Exhaustive test for possible branches and edge cases.
        // edge case, empty list
        let [nonZeroCount, isEven] = even_non_zeros({ kind: "nil" });
        assert.deepStrictEqual(nonZeroCount, 0n);
        assert.deepStrictEqual(isEven, true);

        // edge case, single zero digit
        [nonZeroCount, isEven] = even_non_zeros({ kind: "cons", hd: 0, tl: { kind: "nil" } });
        assert.deepStrictEqual(nonZeroCount, 0n);
        assert.deepStrictEqual(isEven, true);

        // edge case, single non-zero digit '1'
        [nonZeroCount, isEven] = even_non_zeros({ kind: "cons", hd: 1, tl: { kind: "nil" } });
        assert.deepStrictEqual(nonZeroCount, 1n);
        assert.deepStrictEqual(isEven, false);

        // edge case, single non-zero digit '2'
        [nonZeroCount, isEven] = even_non_zeros({ kind: "cons", hd: 2, tl: { kind: "nil" } });
        assert.deepStrictEqual(nonZeroCount, 1n);
        assert.deepStrictEqual(isEven, true);

        // branch coverage, combination of 0, 1, and 2 with odd length
        [nonZeroCount, isEven] = even_non_zeros({
            kind: "cons",
            hd: 2,
            tl: { kind: "cons", hd: 1, tl: { kind: "cons", hd: 0, tl: { kind: "nil" } } }
        }); // [2, 1, 0]
        assert.deepStrictEqual(nonZeroCount, 2n);
        assert.deepStrictEqual(isEven, false);

        // branch coverage, combination of 0, 1, and 2 with even length
        [nonZeroCount, isEven] = even_non_zeros({
            kind: "cons",
            hd: 2,
            tl: {
                kind: "cons",
                hd: 0,
                tl: { kind: "cons", hd: 1, tl: { kind: "cons", hd: 0, tl: { kind: "nil" } } }
            }
        }); // [2, 0, 1, 0]
        assert.deepStrictEqual(nonZeroCount, 2n);
        assert.deepStrictEqual(isEven, false);

        // branch coverage, list with only non-zero digits
        [nonZeroCount, isEven] = even_non_zeros({
            kind: "cons",
            hd: 1,
            tl: {
                kind: "cons",
                hd: 1,
                tl: { kind: "cons", hd: 2, tl: { kind: "cons", hd: 1, tl: { kind: "nil" } } }
            }
        }); // [1, 1, 2, 1]
        assert.deepStrictEqual(nonZeroCount, 4n);
        assert.deepStrictEqual(isEven, false);

        // branch coverage, list with only zero digits
        [nonZeroCount, isEven] = even_non_zeros({
            kind: "cons",
            hd: 0,
            tl: { kind: "cons", hd: 0, tl: { kind: "cons", hd: 0, tl: { kind: "nil" } } }
        });
        assert.deepStrictEqual(nonZeroCount, 0n);
        assert.deepStrictEqual(isEven, true);

        // branch and loop coverage, list with alternating digits
        [nonZeroCount, isEven] = even_non_zeros({
            kind: "cons",
            hd: 1,
            tl: {
                kind: "cons",
                hd: 2,
                tl: { kind: "cons", hd: 1, tl: { kind: "cons", hd: 2, tl: { kind: "nil" } } }
            }
        });
        assert.deepStrictEqual(nonZeroCount, 4n);
        assert.deepStrictEqual(isEven, true);
    });
});