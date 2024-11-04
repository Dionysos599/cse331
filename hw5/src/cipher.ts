import { List, cons, nil } from "./list";

// Tests for these functions belong in cipher_test.ts

/**
 * Encodes an individual character by negating it within a sub-range of the
 * alphabet and then swapping its range.
 * @param j int to encode, represents j-th Latin letter if in range [0, 25]
 * @returns ns(j), where ns is defined as follows:
 *          ns: Z -> Z
 *          ns(j) = 18 - j if 0 <= j <= 5 or 13 <= j <= 18
 *          ns(j) = 31 - j if 6 <= j <= 12 or 19 <= j <= 25
 *          ns(j) = j if j < 0 or j > 25
 */
export const ns = (j: bigint): bigint => {
  if ((j >= 0n && j <= 5n) || (j >= 13n && j <= 18n)) {
    return 18n - j;
  } else if ((j >= 6n && j <= 12n) || (j >= 19n && j <= 25n)) {
    return 31n - j;
  } else {
    return j;
  }
};

/**
 * Applies ns encoding to a list of characters.
 * @param L list of ints to encode. Each int j, in the range [0, 25], represents
 *          the j-th character in the Latin alphabet.
 * @returns cipher(L), where cipher is defined as follows:
 *          cipher: List<Z> -> List<Z>
 *          cipher(nil) = nil
 *          cipher(j :: L) = cons(ns(j), cipher(L))
 */
export const cipher = (L: List<bigint>): List<bigint> => {
  if (L.kind === "nil") {
    return nil;
  } else {
    return cons(ns(L.hd), cipher(L.tl));
  }
};