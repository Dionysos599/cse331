import * as assert from 'assert';
import { solid, split, toJson, fromJson } from './square';


describe('square', function() {

  it('findSquare', function() {
    // TODO: write tests for findSquare() here


    // Below is a provided test with an example of the notation for tests
    // that verify that an Error is thrown. assert.throws() takes a _function_
    // that, when executed, should result in an Error
    //
    // Uncomment this and the test for ReplaceSquare and make sure they pass
    // assert.throws(() => findSquare(cons("NW", nil), solid("blue")));
  });

  it('replaceSquare', function() {
    // TODO: write tests for replaceSquare() here

    
    // assert.throws(() => replaceSquare(cons("SE", nil), solid("orange"), solid("green")));
  });

  it('toJson', function() {
    assert.deepStrictEqual(toJson(solid("white")), "white");
    assert.deepStrictEqual(toJson(solid("green")), "green");

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepStrictEqual(toJson(s1),
      ["blue", "orange", "purple", "white"]);

    const s2 = split(s1, solid("green"), s1, solid("pink"));
    assert.deepStrictEqual(toJson(s2),
      [["blue", "orange", "purple", "white"], "green",
       ["blue", "orange", "purple", "white"], "pink"]);

    const s3 = split(solid("green"), s1, solid("yellow"), s1);
    assert.deepStrictEqual(toJson(s3),
      ["green", ["blue", "orange", "purple", "white"],
       "yellow", ["blue", "orange", "purple", "white"]]);
  });

  it('fromJson', function() {
    assert.deepStrictEqual(fromJson("white"), solid("white"));
    assert.deepStrictEqual(fromJson("green"), solid("green"));

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepStrictEqual(fromJson(["blue", "orange", "purple", "white"]), s1);

    assert.deepStrictEqual(
        fromJson([["blue", "orange", "purple", "white"], "green",
                 ["blue", "orange", "purple", "white"], "pink"]),
        split(s1, solid("green"), s1, solid("pink")));

    assert.deepStrictEqual(
        fromJson(["green", ["blue", "orange", "purple", "white"],
                  "yellow", ["blue", "orange", "purple", "white"]]),
        split(solid("green"), s1, solid("yellow"), s1));
  });

});
