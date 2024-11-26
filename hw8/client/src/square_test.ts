import * as assert from 'assert';
import { solid, split, toJson, fromJson, findSquare, replaceSquare } from './square';
import { nil, cons } from './list';


describe('square', function() {

  it('findSquare', function() {
    // Base case: finding the root square (empty path)
    const s1 = solid("blue");
    assert.deepStrictEqual(findSquare(nil, s1), s1);

    // Test finding squares in a split structure
    const tree = split(
        solid("white"),
        split(solid("pink"), solid("orange"), solid("yellow"), solid("green")),
        solid("blue"),
        solid("purple")
    );

    // Test valid paths
    assert.deepStrictEqual(findSquare(cons("NW", nil), tree), solid("white"));
    assert.deepStrictEqual(
        findSquare(cons("NE", cons("NW", nil)), tree),
        solid("pink")
    );
    assert.deepStrictEqual(findSquare(cons("SW", nil), tree), solid("blue"));
    assert.deepStrictEqual(findSquare(cons("SE", nil), tree), solid("purple"));

    // Below is a provided test with an example of the notation for tests
    // that verify that an Error is thrown. assert.throws() takes a _function_
    // that, when executed, should result in an Error
    //
    // Uncomment this and the test for ReplaceSquare and make sure they pass
    assert.throws(() => findSquare(cons("NW", nil), solid("blue")));
  });

  it('replaceSquare', function() {
    // Base case: replacing the root square (empty path)
    const s1 = solid("blue");
    const s2 = solid("pink");
    assert.deepStrictEqual(replaceSquare(nil, s2, s1), s2);

    // Test replacing squares in a split structure
    const tree = split(
        solid("white"),
        split(solid("pink"), solid("orange"), solid("yellow"), solid("green")),
        solid("blue"),
        solid("purple")
    );

    // Replace NW quadrant
    const replacedNW = replaceSquare(cons("NW", nil), solid("yellow"), tree);
    assert.deepStrictEqual(findSquare(cons("NW", nil), replacedNW), solid("yellow"));

    // Replace NE->NW quadrant
    const replacedNENW = replaceSquare(
        cons("NE", cons("NW", nil)),
        solid("green"),
        tree
    );
    assert.deepStrictEqual(
        findSquare(cons("NE", cons("NW", nil)), replacedNENW),
        solid("green")
    );

    // Replace SW quadrant
    const replacedSW = replaceSquare(cons("SW", nil), solid("purple"), tree);
    assert.deepStrictEqual(findSquare(cons("SW", nil), replacedSW), solid("purple"));

    // Replace SE quadrant
    const replacedSE = replaceSquare(cons("SE", nil), solid("orange"), tree);
    assert.deepStrictEqual(findSquare(cons("SE", nil), replacedSE), solid("orange"));

    assert.throws(() => replaceSquare(cons("SE", nil), solid("orange"), solid("green")));
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
