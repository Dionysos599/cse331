// Tests for this function belong in int_sqrt_test.ts

/** 
 * Finds the integer square root of x 
 * @param x > 0 to find the integer square root of
 * @returns smallest integer v, such that (v - 1)^2 < x <= v^2
 */
export const int_sqrt = (x: bigint): bigint => {
  // {{ x > 0 }}
  let v: bigint = 1n;
  let w: bigint = 1n;
  let y: bigint = 1n;

  // Inv: (v-1)^2 < x and w = 2v - 1 and y = v^2
  while ( y < x ) {
    v = v + 1n;
    w = w + 2n;
    y = y + w;
  }

  // {{ (v-1)^2 < x and x <= v^2 }}
  return v;
};