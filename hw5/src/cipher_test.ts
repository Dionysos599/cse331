import * as assert from 'assert';
import { ns, cipher } from './cipher';
import { cons, nil } from "./list";

// - Write tests according to our class requirements for each cipher.ts function
// - Include comments describing which requirements each test fulfills
// - See this last week's section slides for an explanation on how to organize
//   tests and write assert() statements

describe('cipher', function() {

  it('ns', function() {
    assert.strictEqual(ns(0n), 18n);
    assert.strictEqual(ns(1n), 17n);
    assert.strictEqual(ns(2n), 16n);
    assert.strictEqual(ns(3n), 15n);
    assert.strictEqual(ns(4n), 14n);
    assert.strictEqual(ns(5n), 13n);

    assert.strictEqual(ns(6n), 25n);
    assert.strictEqual(ns(7n), 24n);
    assert.strictEqual(ns(8n), 23n);
    assert.strictEqual(ns(9n), 22n);
    assert.strictEqual(ns(10n), 21n);
    assert.strictEqual(ns(11n), 20n);
    assert.strictEqual(ns(12n), 19n);

    assert.strictEqual(ns(13n), 5n);
    assert.strictEqual(ns(14n), 4n);
    assert.strictEqual(ns(15n), 3n);
    assert.strictEqual(ns(16n), 2n);
    assert.strictEqual(ns(17n), 1n);
    assert.strictEqual(ns(18n), 0n);

    assert.strictEqual(ns(19n), 12n);
    assert.strictEqual(ns(20n), 11n);
    assert.strictEqual(ns(21n), 10n);
    assert.strictEqual(ns(22n), 9n);
    assert.strictEqual(ns(23n), 8n);
    assert.strictEqual(ns(24n), 7n);
    assert.strictEqual(ns(25n), 6n);

    assert.strictEqual(ns(-1n), -1n);
    assert.strictEqual(ns(26n), 26n);
  });

  it('cipher', function() {
    assert.deepStrictEqual(cipher(nil), nil);
    assert.deepStrictEqual(cipher(cons(0n, nil)), cons(18n, nil));
    assert.deepStrictEqual(cipher(cons(0n, cons(1n, nil))), cons(18n, cons(17n, nil)));

    assert.deepStrictEqual(
        cipher(cons(5n, cons(6n, cons(13n, nil)))),
        cons(13n, cons(25n, cons(5n, nil)))
    );

    assert.deepStrictEqual(
        cipher(cons(0n, cons(12n, cons(18n, cons(25n, nil))))),
        cons(18n, cons(19n, cons(0n, cons(6n, nil))))
    );

    assert.deepStrictEqual(
        cipher(cons(26n, cons(-1n, nil))),
        cons(26n, cons(-1n, nil))
    );
  });

});
