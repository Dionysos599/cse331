import { List, cons, nil } from "./list";

// Tests for these functions belong in funcs_test.ts
// These functions have empty comments /** */ to make the linter happy, soon
// we'll have you write comments yourself!

/** */
export const a = (o: boolean, t: [bigint, bigint]): [bigint, bigint] => {
  const [i, j]: [bigint, bigint] = t;
  if (o) {
    return [i + 1n, j];
  } else {
    return [j + 1n, i];
  }
};

/** */
export const b = (s: bigint, o: boolean): List => {
  if (o) {
    return cons(s, cons(-s, nil));
  } else {
    return cons(-s, cons(s, nil));
  }
};

/** s and t allow only non-negative integers */
export const c = (r: {s: bigint, t: [bigint, bigint]}): bigint => {
  const [i, j]: [bigint, bigint] = r.t;
  if (r.s === 0n) {
    return i;
  } else if (r.s === 1n) {
    return i + 1n;
  } else {
    return j + c({s: r.s - 1n, t: r.t});
  }
};

// Color type defined for the below functions
// WARNING: don't mix this up with the separate Color type defined for Mazes
type Color = "purple" | "pink" | "green";

/** */
export const d = (color: Color, num: bigint): bigint => {
  switch (color) {
    case "purple": return num;
    case "pink": return -num;
    case "green": return 0n;
  }
};

/** */
export const e = (color1: Color, color2: Color): bigint => {
  return d(color1, 7n) + d(color2, 5n);
};

/** */
export const f = (color?: Color): bigint => {
  switch (color) {
    case "purple": return 6n;
    case "pink": return 4n;
    case "green": return 5n;
    default: return 0n;
  }
};

/** */
export const g = (arr: bigint[]): bigint => {
  if (arr.length === 0) {
    return 1n;
  } else {
    // Recall that slice() returns a sub-array
    return arr[0] * g(arr.slice(1));
  }
};

/** */
export const h = (num: bigint): bigint => {
  if (num <= 0n) {
    return 0n;
  } else {
    return h(num - 2n) + 2n * num - 2n;
  }
};

/** */
export const i = (num: bigint): bigint => {
  if (num === 0n) {
    return 0n;
  } else if (num % 3n === 0n) { // n > 0 is a multiple of 3
    return i(num - 3n) + 1n;
  } else if (num % 3n === 1n) { // n - 1 is a multiple of 3
    return i(num - 1n);
  } else { // n - 2 is a multiple of 3
    return i(num - 2n);
  }
}