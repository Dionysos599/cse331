import * as assert from 'assert';
import { a, b, c, d, e, f, g, h, i } from './funcs';
import { cons, nil } from './list';

// - Write tests according to our class requirements for each funcs.ts function
// - Include comments describing which requirements each test fulfills
// - See this week's section slides for an explanation on how to organize files
//   and write assert() statements

describe('funcs', function() {

  // Tests for function a
  it('a', function() {
    // Exhaustive testing since boolean has only two states
    assert.deepStrictEqual(a(true, [1n, 2n]), [2n, 2n]); // o = true
    assert.deepStrictEqual(a(false, [1n, 2n]), [3n, 1n]); // o = false
  });

  // Tests for function b
  it('b', function() {
    // Exhaustive testing since boolean has only two states
    assert.deepStrictEqual(b(3n, true), cons(3n, cons(-3n, nil))); // o = true
    assert.deepStrictEqual(b(3n, false), cons(-3n, cons(3n, nil))); // o = false
  });

  // Tests for function c
  it('c', function() {
    // Testing for coverage in r.s conditional branches and recursion
    assert.deepStrictEqual(c({s: 0n, t: [5n, 10n]}), 5n);  // r.s = 0
    assert.deepStrictEqual(c({s: 1n, t: [5n, 10n]}), 6n);  // r.s = 1
    assert.deepStrictEqual(c({s: 2n, t: [5n, 10n]}), 16n); // r.s > 1, triggers recursion
  });

  // Tests for function d
  it('d', function() {
    // Exhaustive testing for each color
    assert.deepStrictEqual(d("purple", 7n), 7n);
    assert.deepStrictEqual(d("pink", 7n), -7n);
    assert.deepStrictEqual(d("green", 7n), 0n);
  });

  // Tests for function e
  it('e', function() {
    // Statement and branch coverage for d() calls within e()
    assert.deepStrictEqual(e("purple", "pink"), 2n);  // purple + pink
    assert.deepStrictEqual(e("purple", "green"), 7n); // purple + green
    assert.deepStrictEqual(e("pink", "purple"), -2n);  // pink + purple
    assert.deepStrictEqual(e("green", "green"), 0n);  // green + green
  });

  // Tests for function f
  it('f', function() {
    // Exhaustive testing for optional color parameter, including undefined case
    assert.deepStrictEqual(f("purple"), 6n);
    assert.deepStrictEqual(f("pink"), 4n);
    assert.deepStrictEqual(f("green"), 5n);
    assert.deepStrictEqual(f(undefined), 0n); // default case
  });

  // Tests for function g
  it('g', function() {
    // Loop coverage: empty array (0 loops), one-element array (1 loop), multiple elements (many loops)
    assert.deepStrictEqual(g([]), 1n);            // 0 loops
    assert.deepStrictEqual(g([3n]), 3n);          // 1 loop
    assert.deepStrictEqual(g([2n, 3n]), 6n);      // multiple loops
    assert.deepStrictEqual(g([2n, 3n, 4n]), 24n); // multiple loops
  });

  // Tests for function h
  it('h', function() {
    // Recursion coverage: num <= 0 (base case), num = 1 (1 recursion), num > 1 (multiple recursions)
    assert.deepStrictEqual(h(0n), 0n);  // num <= 0
    assert.deepStrictEqual(h(1n), 0n);  // num = 1
    assert.deepStrictEqual(h(3n), 4n);  // multiple recursions
    assert.deepStrictEqual(h(5n), 12n); // multiple recursions
  });

  // Tests for function i
  it('i', function() {
    // Testing branch coverage in modulus cases and base case
    assert.deepStrictEqual(i(0n), 0n);  // base case
    assert.deepStrictEqual(i(3n), 1n);  // num % 3 === 0
    assert.deepStrictEqual(i(4n), 1n);  // num % 3 === 1
    assert.deepStrictEqual(i(5n), 1n);  // num % 3 === 2
    assert.deepStrictEqual(i(6n), 2n);  // additional case for recursion
  });
});
