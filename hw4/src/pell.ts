// Tests for these functions can be found in pell_test.ts

/** Returns the pell number for num, as defined in Task 2a */
export const p = (num: bigint): bigint => {
  if (num < 0n) {
    throw new Error("input must be non-negative");
  }

  if (num === 0n) {
    return 0n;
  }

  if (num === 1n) {
    return 1n;
  }

  return 2n * p(num - 1n) + p(num - 2n);
};

/** Returns the sum of the first num pell numbers, as defined in Task 2b */
export const s = (num: bigint): bigint => {
  if (num < 0n) {
    throw new Error("input must be non-negative");
  }

  if (num === 0n) {
    return 0n;
  }

  return s(num - 1n) + p(num - 1n);
};