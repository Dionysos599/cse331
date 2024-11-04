import { List } from "./list";

// Tests for these functions belong in sum_test.ts

/**
 * Finds the sum of the products of each number in the input and the one after
 * it, added to the sum of the original list:
 *    sum(mult(zip(xs, tail(xs))) + sum(xs)
 * @param xs list of ints
 * @returns f(xs), where f is defined as follows:
 *          f: List<Z> -> Z
 *          f(nil) = 0
 *          f(a :: nil)     := a
 *          f(a :: b :: L)  := a * b + f(b :: L) + a
 */
export const f = (xs: List<bigint>): bigint => {
  if (xs.kind === "nil") {
    return 0n;
  }

  if (xs.tl.kind === "nil") {
    return xs.hd;
  }

  const a = xs.hd;
  const b = xs.tl.hd;

  return a * b + f(xs.tl) + a;
};
