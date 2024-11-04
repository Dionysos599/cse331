import * as assert from 'assert';
import { f } from './zip_sum';
import { cons, nil } from './list';

// - Write tests according to our class requirements for f
// - Include comments describing which requirements each test fulfills
// - See this last week's section slides for an explanation on how to organize
//   tests and write assert() statements

describe('sum', function() {

  it('f should return 0 for an empty list', function() {
    assert.strictEqual(f(nil), 0n);
  });

  it('f should return the single element value for a single element list', function() {
    assert.strictEqual(f(cons(5n, nil)), 5n);
    assert.strictEqual(f(cons(10n, nil)), 10n);
  });

  it('f should correctly handle two elements', function() {
    assert.strictEqual(f(cons(1n, cons(2n, nil))), 5n); // 1*2 + 2 + 1
    assert.strictEqual(f(cons(3n, cons(4n, nil))), 19n); // 3*4 + 4 + 3
  });

  it('f should correctly handle three or more elements', function() {
    assert.strictEqual(f(cons(1n, cons(2n, cons(3n, nil)))), 14n); // 1*2 + 2*3 + 3 + 1 + 2
    assert.strictEqual(f(cons(4n, cons(5n, cons(6n, nil)))), 65n); // 4*5 + 5*6 + 6 + 4 + 5
  });

  it('f should correctly handle larger lists with various values', function() {
    assert.strictEqual(f(cons(0n, cons(0n, cons(0n, cons(0n, nil))))), 0n);
    assert.strictEqual(f(cons(5n, cons(6n, cons(7n, cons(8n, nil))))), 154n); // 5*6 + 6*7 + 7*8 + 8 + 5 + 6 + 7
  });

  it('f should correctly handle negative numbers', function() {
    assert.strictEqual(f(cons(-1n, cons(2n, nil))), -1n); // -1*2 + 2 + -1
    assert.strictEqual(f(cons(-2n, cons(-3n, nil))), 1n); // -2*-3 + -3 + -2
  });

});
