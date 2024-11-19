import * as assert from 'assert';
import { nil, compact, cons, explode } from './list';
import {
    naturalToString, numberToNatural, stringToNatural,
    add, mul, scale, changeBase
} from './natural';

// Note: the tests provided here exceed the minimum number required by our
// course guidelines

describe('natural', function() {

  // NOTE: check out the provided functions compact() and explode() in list.ts
  //    - compact() takes a list of characters (length 0 strings) and turns
  //      them into a string
  //    - explode() takes a string and turns them into a list of individual 
  //      characters
  // These functions may be helpful for writing test cases for naturalToString
  // as it can be easier to think about what these functions are doing in terms
  // of strings instead of lists (i.e. if a function returns a list, call
  // compact() to make it a string to compare to a string expected value).
  // Using these are not required. See stringToNatural tests for an example.

  it('naturalToString', function() {
    // Test empty/nil list (base case - 0 loop iterations)
    assert.deepStrictEqual(
        compact(naturalToString({digits: nil, base: 10})),
        "0");
    assert.deepStrictEqual(
        compact(naturalToString({digits: nil, base: 2})),
        "0");

    // Test single digit numbers (1 loop iteration)
    // Test boundaries for different bases
    assert.deepStrictEqual(
        compact(naturalToString({digits: cons(0, cons(1, nil)), base: 10})),
        "10");
    assert.deepStrictEqual(
        compact(naturalToString({digits: cons(5, nil), base: 10})),
        "5");
    assert.deepStrictEqual(
        compact(naturalToString({digits: cons(15, nil), base: 16})),
        "F");  // Tests conversion of 15 to 'F' in base 16

    // Test multiple digits (many loop iterations)
    // Tests both number->letter conversion and multiple digits
    assert.deepStrictEqual(
        compact(naturalToString({digits: cons(5, cons(4, cons(3, nil))), base: 10})),
        "345");
    assert.deepStrictEqual(
        compact(naturalToString({digits: cons(10, cons(11, cons(12, nil))), base: 16})),
        "CBA");  // Tests multiple letter conversions

    // Test numbers in different bases
    assert.deepStrictEqual(
        compact(naturalToString({digits: cons(1, cons(1, cons(1, nil))), base: 2})),
        "111");  // Binary representation
    assert.deepStrictEqual(
        compact(naturalToString({digits: cons(15, cons(15, nil)), base: 16})),
        "FF");  // Hexadecimal with multiple F's
  });

  it('stringToNatural', function() {
    assert.deepStrictEqual(
        stringToNatural(explode(""), 2),
        {digits: nil, base: 2});
    assert.deepStrictEqual(
        stringToNatural(explode(""), 3),
        {digits: nil, base: 3});

    assert.deepStrictEqual(
        stringToNatural(explode("0"), 2),
        {digits: nil, base: 2});
    assert.deepStrictEqual(
        stringToNatural(explode("0"), 5),
        {digits: nil, base: 5});

    assert.deepStrictEqual(
        stringToNatural(explode("1"), 2),
        {digits: cons(1, nil), base: 2});
    assert.deepStrictEqual(
        stringToNatural(explode("F"), 16),
        {digits: cons(15, nil), base: 16});

    assert.deepStrictEqual(
        stringToNatural(explode("10"), 2),
        {digits: cons(0, cons(1, nil)), base: 2});
    assert.deepStrictEqual(
        stringToNatural(explode("11"), 2),
        {digits: cons(1, cons(1, nil)), base: 2});
    assert.deepStrictEqual(
        stringToNatural(explode("10"), 16),
        {digits: cons(0, cons(1, nil)), base: 16});
    assert.deepStrictEqual(
        stringToNatural(explode("3A"), 16),
        {digits: cons(10, cons(3, nil)), base: 16});
    assert.deepStrictEqual(
        stringToNatural(explode("5ZA"), 36),
        {digits: cons(10, cons(35, cons(5, nil))), base: 36});
  });

  it('add', function() {
    // Base cases: add(nil, nil, c)
    assert.deepStrictEqual(
        add({digits: nil, base: 10}, {digits: nil, base: 10}),
        {digits: nil, base: 10});  // add(nil, nil, 0) := nil

    // Single digit cases - no carry
    assert.deepStrictEqual(
        add(
            {digits: cons(1, nil), base: 10},
            {digits: cons(2, nil), base: 10}),
        {digits: cons(3, nil), base: 10});  // 1 + 2 = 3

    // Single digit cases - with carry
    assert.deepStrictEqual(
        add(
            {digits: cons(5, nil), base: 10},
            {digits: cons(7, nil), base: 10}),
        {digits: cons(2, cons(1, nil)), base: 10});  // 5 + 7 = 12

    // Different length lists - first longer
    assert.deepStrictEqual(
        add(
            {digits: cons(5, cons(1, nil)), base: 10},
            {digits: cons(3, nil), base: 10}),
        {digits: cons(8, cons(1, nil)), base: 10});  // 15 + 3 = 18

    // Different length lists - second longer
    assert.deepStrictEqual(
        add(
            {digits: cons(3, nil), base: 10},
            {digits: cons(5, cons(1, nil)), base: 10}),
        {digits: cons(8, cons(1, nil)), base: 10});  // 3 + 15 = 18

    // Multi-digit with multiple carries
    assert.deepStrictEqual(
        add(
            {digits: cons(5, cons(7, nil)), base: 10},
            {digits: cons(7, cons(6, nil)), base: 10}),
        {digits: cons(2, cons(4, cons(1, nil))), base: 10});  // 75 + 67 = 142

    // Different bases - base 2 (binary)
    assert.deepStrictEqual(
        add(
            {digits: cons(1, cons(1, nil)), base: 2},
            {digits: cons(1, nil), base: 2}),
        {digits: cons(0, cons(0, cons(1, nil))), base: 2});  // 3 + 1 = 4 in binary

    // Different bases - base 16 (hex)
    assert.deepStrictEqual(
        add(
            {digits: cons(15, nil), base: 16},
            {digits: cons(1, nil), base: 16}),
        {digits: cons(0, cons(1, nil)), base: 16});  // F + 1 = 10 in hex

    // Edge case - carry propagation through multiple digits
    assert.deepStrictEqual(
        add(
            {digits: cons(9, cons(9, cons(9, nil))), base: 10},
            {digits: cons(1, nil), base: 10}),
        {digits: cons(0, cons(0, cons(0, cons(1, nil)))), base: 10});  // 999 + 1 = 1000

    // Test case for non-empty list + empty list with carry exceeding base
    assert.deepStrictEqual(
        add(
            {digits: nil, base: 10},
            {digits: cons(9, cons(9, nil)), base: 10}),
        {digits: cons(9, cons(9, nil)), base: 10});  // nil + 99 with potential carry

    // Test case for (nil, b::bs, c) with carry
    assert.deepStrictEqual(
        add(
            {digits: nil, base: 10},
            {digits: cons(8, cons(1, nil)), base: 10}),
        {digits: cons(8, cons(1, nil)), base: 10});  // 0 + 18 = 18

    // Test carrying in bs-only case
    assert.deepStrictEqual(
        add(
            {digits: nil, base: 10},  // 0
            {digits: cons(8, cons(1, nil)), base: 10}),  // 18
        {digits: cons(8, cons(1, nil)), base: 10});  // 0 + 18 = 18

    // Test carrying in bs-only case WITH carry needed
    assert.deepStrictEqual(
        add(
            {digits: nil, base: 10},  // 0
            {digits: cons(9, cons(9, nil)), base: 10}),  // 99
        {digits: cons(9, cons(9, nil)), base: 10});  // 0 + 99 = 99

    // This specifically tests the else branch in the bs.kind === "cons" case
    // When bs has a digit that needs carrying but as is nil
    assert.deepStrictEqual(
        add(
            {digits: nil, base: 2},  // 0
            {digits: cons(1, cons(1, nil)), base: 2}),  // 3 in decimal
        {digits: cons(1, cons(1, nil)), base: 2});  // 0 + 11(binary) = 11(binary)
  });
  
  it('numberToNatural', function() {
    assert.deepStrictEqual(numberToNatural(0, 2),
        {digits: nil, base: 2});
    assert.deepStrictEqual(numberToNatural(0, 10),
        {digits: nil, base: 10});

    assert.deepStrictEqual(numberToNatural(1, 2),
        {digits: cons(1, nil), base: 2});
    assert.deepStrictEqual(numberToNatural(15, 16),
        {digits: cons(15, nil), base: 16});

    assert.deepStrictEqual(numberToNatural(2, 2),
        {digits: cons(0, cons(1, nil)), base: 2});
    assert.deepStrictEqual(numberToNatural(3, 2),
        {digits: cons(1, cons(1, nil)), base: 2});
    assert.deepStrictEqual(numberToNatural(12, 10),
        {digits: cons(2, cons(1, nil)), base: 10});
    assert.deepStrictEqual(numberToNatural(21, 10),
        {digits: cons(1, cons(2, nil)), base: 10});

    assert.deepStrictEqual(numberToNatural(6, 2),
        {digits: cons(0, cons(1, cons(1, nil))), base: 2});
    assert.deepStrictEqual(numberToNatural(31, 2),
        {digits: cons(1, cons(1, cons(1, cons(1, cons(1, nil))))), base: 2});
    assert.deepStrictEqual(numberToNatural(32, 2),
        {digits: cons(0, cons(0, cons(0, cons(0, cons(0, cons(1, nil)))))), base: 2});
    assert.deepStrictEqual(numberToNatural(321, 10),
        {digits: cons(1, cons(2, cons(3, nil))), base: 10});
    assert.deepStrictEqual(numberToNatural(123, 10),
        {digits: cons(3, cons(2, cons(1, nil))), base: 10});
    assert.deepStrictEqual(numberToNatural(1010, 10),
        {digits: cons(0, cons(1, cons(0, cons(1, nil)))), base: 10});
  });

  it('scale', function() {
    assert.deepStrictEqual(scale({digits: nil, base: 10}, 5),
        {digits: nil, base: 10});
    assert.deepStrictEqual(scale({digits: nil, base: 3}, 2),
        {digits: nil, base: 3});

    assert.deepStrictEqual(scale({digits: cons(1, nil), base: 10}, 5),
        {digits: cons(5, nil), base: 10});
    assert.deepStrictEqual(scale({digits: cons(2, nil), base: 10}, 5),
        {digits: cons(0, cons(1, nil)), base: 10});
    assert.deepStrictEqual(scale({digits: cons(1, nil), base: 3}, 2),
        {digits: cons(2, nil), base: 3});
    assert.deepStrictEqual(scale({digits: cons(2, nil), base: 3}, 2),
        {digits: cons(1, cons(1, nil)), base: 3});

    assert.deepStrictEqual(scale({digits: cons(0, cons(2, nil)), base: 10}, 3),
        {digits: cons(0, cons(6, nil)), base: 10});
    assert.deepStrictEqual(scale({digits: cons(3, cons(0, cons(1, nil))), base: 10}, 3),
        {digits: cons(9, cons(0, cons(3, nil))), base: 10});
    assert.deepStrictEqual(scale({digits: cons(3, cons(0, cons(1, nil))), base: 10}, 9),
        {digits: cons(7, cons(2, cons(9, nil))), base: 10});
    assert.deepStrictEqual(scale({digits: cons(0, cons(1, nil)), base: 3}, 2),
        {digits: cons(0, cons(2, nil)), base: 3});
    assert.deepStrictEqual(scale({digits: cons(0, cons(1, cons(1, nil))), base: 3}, 2),
        {digits: cons(0, cons(2, cons(2, nil))), base: 3});
    assert.deepStrictEqual(scale({digits: cons(0, cons(2, cons(1, nil))), base: 3}, 2),
        {digits: cons(0, cons(1, cons(0, cons(1, nil)))), base: 3});
  });

  it('mul', function() {
    assert.deepStrictEqual(mul(
        {digits: cons(1, cons(2, cons(3, nil))), base: 10},
        {digits: nil, base: 10}),
        {digits: nil, base: 10});
    assert.deepStrictEqual(mul(
        {digits: cons(0, cons(2, cons(1, nil))), base: 3},
        {digits: nil, base: 3}),
        {digits: nil, base: 3});

    assert.deepStrictEqual(mul(
        {digits: cons(1, cons(2, cons(3, nil))), base: 10},
        {digits: cons(3, nil), base: 10}),
        {digits: cons(3, cons(6, cons(9, nil))), base: 10});
    assert.deepStrictEqual(mul(
        {digits: cons(1, cons(2, cons(3, nil))), base: 10},
        {digits: cons(4, nil), base: 10}),
        {digits: cons(4, cons(8, cons(2, cons(1, nil)))), base: 10});
    assert.deepStrictEqual(mul(
        {digits: cons(1, cons(0, cons(1, nil))), base: 3},
        {digits: cons(2, nil), base: 3}),
        {digits: cons(2, cons(0, cons(2, nil))), base: 3});
    assert.deepStrictEqual(mul(
        {digits: cons(1, cons(2, cons(1, nil))), base: 3},
        {digits: cons(2, nil), base: 3}),
        {digits: cons(2, cons(1, cons(0, cons(1, nil)))), base: 3});

    assert.deepStrictEqual(mul(
        {digits: cons(1, cons(2, cons(3, nil))), base: 10},
        {digits: cons(3, cons(4, nil)), base: 10}),
        {digits: cons(3, cons(0, cons(8, cons(3, cons(1, nil))))), base: 10});
    assert.deepStrictEqual(mul(
        {digits: cons(1, cons(2, cons(1, nil))), base: 3},
        {digits: cons(2, cons(1, nil)), base: 3}),
        {digits: cons(2, cons(2, cons(2, cons(2, nil)))), base: 3});
  });

  it('changeBase', function() {
    assert.deepStrictEqual(changeBase({digits: nil, base: 3}, 10),
        {digits: nil, base: 10});
    assert.deepStrictEqual(changeBase({digits: nil, base: 10}, 3),
        {digits: nil, base: 3});

    assert.deepStrictEqual(changeBase({digits: cons(2, nil), base: 3}, 10),
        {digits: cons(2, nil), base: 10});
    assert.deepStrictEqual(changeBase({digits: cons(8, nil), base: 10}, 3),
        {digits: cons(2, cons(2, nil)), base: 3});

    assert.deepStrictEqual(changeBase({digits: cons(2, cons(2, nil)), base: 3}, 10),
        {digits: cons(8, nil), base: 10});
    assert.deepStrictEqual(changeBase({digits: cons(8, cons(5, cons(1, nil))), base: 10}, 3),
        {digits: cons(2, cons(1, cons(2, cons(2, cons(1, nil))))), base: 3});
  });

});
