import * as assert from 'assert';

import {
    NO_INFO,
    buildTree, findLocationsInRegion, closestInTree, findClosestInTree
  } from './location_tree';
import {Region} from "./locations";


describe('location_tree', function() {

  it('buildTree', function() {
    assert.deepStrictEqual(buildTree([]), {kind: "empty"});

    assert.deepStrictEqual(buildTree([{x: 1, y: 1}]),
        {kind: "single", loc: {x: 1, y: 1}});
    assert.deepStrictEqual(buildTree([{x: 2, y: 2}]),
        {kind: "single", loc: {x: 2, y: 2}});

    assert.deepStrictEqual(buildTree([{x: 1, y: 1}, {x: 3, y: 3}]),
        {kind: "split", at: {x: 2, y: 2},
         nw: {kind: "single", loc: {x: 1, y: 1}},
         ne: {kind: "empty"},
         sw: {kind: "empty"},
         se: {kind: "single", loc: {x: 3, y: 3}}});
    assert.deepStrictEqual(buildTree([{x: 1, y: 3}, {x: 3, y: 1}]),
        {kind: "split", at: {x: 2, y: 2},
         nw: {kind: "empty"},
         ne: {kind: "single", loc: {x: 3, y: 1}},
         sw: {kind: "single", loc: {x: 1, y: 3}},
         se: {kind: "empty"}});

    assert.deepStrictEqual(buildTree(
        [{x: 1, y: 1}, {x: 3, y: 3}, {x: 5, y: 5}, {x: 7, y: 7}]),
        {kind: "split", at: {x: 4, y: 4},
         nw: {kind: "split", at: {x: 2, y: 2},
              nw: {kind: "single", loc: {x: 1, y: 1}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "single", loc: {x: 3, y: 3}}},
         ne: {kind: "empty"},
         sw: {kind: "empty"},
         se: {kind: "split", at: {x: 6, y: 6},
              nw: {kind: "single", loc: {x: 5, y: 5}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "single", loc: {x: 7, y: 7}}}});
    assert.deepStrictEqual(buildTree(
        [{x: 1, y: 1}, {x: 3, y: 3}, {x: 5, y: 3}, {x: 7, y: 1},
         {x: 1, y: 7}, {x: 3, y: 5}, {x: 5, y: 5}, {x: 7, y: 7}]),
        {kind: "split", at: {x: 4, y: 4},
         nw: {kind: "split", at: {x: 2, y: 2},
              nw: {kind: "single", loc: {x: 1, y: 1}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "single", loc: {x: 3, y: 3}}},
         ne: {kind: "split", at: {x: 6, y: 2},
              nw: {kind: "empty"},
              sw: {kind: "single", loc: {x: 5, y: 3}},
              ne: {kind: "single", loc: {x: 7, y: 1}},
              se: {kind: "empty"}},
         sw: {kind: "split", at: {x: 2, y: 6},
              nw: {kind: "empty"},
              ne: {kind: "single", loc: {x: 3, y: 5}},
              sw: {kind: "single", loc: {x: 1, y: 7}},
              se: {kind: "empty"}},
         se: {kind: "split", at: {x: 6, y: 6},
              nw: {kind: "single", loc: {x: 5, y: 5}},
              ne: {kind: "empty"},
              sw: {kind: "empty"},
              se: {kind: "single", loc: {x: 7, y: 7}}}});
  });

  it('findLocationsInRegion', function() {
    assert.deepStrictEqual(findLocationsInRegion(
        buildTree([]),
        {x1: 1, x2: 2, y1: 1, y2: 2}),
      []);

    assert.deepStrictEqual(findLocationsInRegion(
        buildTree([{x: 0, y: 0}]),
        {x1: 1, x2: 3, y1: 1, y2: 3}),
      []);
    assert.deepStrictEqual(findLocationsInRegion(
        buildTree([{x: 2, y: 2}]),
        {x1: 1, x2: 3, y1: 1, y2: 3}),
      [{x: 2, y: 2}]);

    assert.deepStrictEqual(findLocationsInRegion(
        buildTree([{x: 0, y: 0}, {x: 2, y: 2}]),
        {x1: 1, x2: 3, y1: 1, y2: 3}),
      [{x: 2, y: 2}]);
    assert.deepStrictEqual(findLocationsInRegion(
        buildTree([{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3},
                   {x: 4, y: 4}]),
        {x1: 1, x2: 3, y1: 1, y2: 3}),
      [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}]);
    assert.deepStrictEqual(findLocationsInRegion(
        buildTree([{x: 0, y: 4}, {x: 1, y: 3}, {x: 2, y: 2}, {x: 3, y: 4},
                   {x: 4, y: 0}]),
        {x1: 1, x2: 3, y1: 1, y2: 3}),
      [{x: 2, y: 2}, {x: 1, y: 3}]);
  });

  it('closestInTree', function() {
      const tree1 = buildTree([{ x: 1, y: 1 }]);
      const tree2 = buildTree([{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }]);
      const tree3 = buildTree([{ x: 1, y: 1 }, { x: 1, y: 5 }, { x: 5, y: 1 }, { x: 5, y: 5 }]);
      const complexTree = buildTree([{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }]);
      const bounds: Region = { x1: -Infinity, x2: Infinity, y1: -Infinity, y2: Infinity };

      // Single-node tree
      assert.deepStrictEqual(
          closestInTree(tree1, { x: 2, y: 2 }, bounds, NO_INFO),
          { loc: { x: 1, y: 1 }, dist: Math.sqrt(2), calcs: 1 }
      );

      // Multiple-node tree, closest node is the root
      assert.deepStrictEqual(
          closestInTree(tree2, { x: 4, y: 4 }, bounds, NO_INFO),
          { loc: { x: 4, y: 4 }, dist: 0, calcs: 4 }
      );

      // Multiple-node tree, closest node is not the root
      assert.deepStrictEqual(
          closestInTree(tree2, { x: 3.1, y: 3.1 }, bounds, NO_INFO),
          { loc: { x: 3, y: 3 }, dist: 0.14142135623730964, calcs: 4 }
      );

      // Edge case with bounds skipping regions
      assert.deepStrictEqual(
          closestInTree(tree3, { x: 10, y: 10 }, bounds, NO_INFO),
          { loc: { x: 5, y: 5 }, dist: Math.sqrt(50), calcs: 4 }
      );

      // Closest point outside initial bounds
      const smallBounds: Region = { x1: 0, x2: 3, y1: 0, y2: 3 };
      assert.deepStrictEqual(
          closestInTree(tree3, { x: 4, y: 4 }, smallBounds, NO_INFO),
          { loc: { x: 5, y: 5 }, dist: Math.sqrt(2), calcs: 4 }
      );

      // Empty subtree case
      const emptyTree = buildTree([]);
      assert.deepStrictEqual(
          closestInTree(emptyTree, { x: 0, y: 0 }, bounds, NO_INFO),
          NO_INFO
      );

      // Skipping region when bounds are further than the closest point
      assert.deepStrictEqual(
          closestInTree(
              tree3,
              { x: 4, y: 4 },
              { x1: 10, x2: 15, y1: 10, y2: 15 },
              { loc: { x: 5, y: 5 }, dist: Math.sqrt(50), calcs: 1 }
          ),
          { loc: { x: 5, y: 5 }, dist: Math.sqrt(50), calcs: 1 }
      );

      // Multiple calculations with nested splits
      assert.deepStrictEqual(
          closestInTree(complexTree, { x: 3.5, y: 3.5 }, bounds, NO_INFO),
          { loc: { x: 4, y: 4 }, dist: Math.sqrt(0.5), calcs: 5 }
      );

      // Skipping unnecessary regions
      assert.deepStrictEqual(
          closestInTree(complexTree, { x: 10, y: 10 }, bounds, NO_INFO),
          { loc: { x: 5, y: 5 }, dist: Math.sqrt(50), calcs: 5 }
      );
  });

  it('findClosestInTree', function() {
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 2, y: 1}]),
        [{x: 1, y: 1}]),
      [{x: 2, y: 1}, 1]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 3, y: 1}, {x: 2, y: 1}, {x: 1, y: 3}]),
        [{x: 1, y: 1}]),
      [{x: 2, y: 1}, 1]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 1}, {x: 5, y: 5}]),
        [{x: 2, y: 1}]),
      [{x: 1, y: 1}, 1]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 1}, {x: 5, y: 5}]),
        [{x: 2, y: 1}, {x: 4.9, y: 4.9}]),
      [{x: 5, y: 5}, Math.sqrt((5-4.9)**2+(5-4.9)**2)]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 1}, {x: 5, y: 5}]),
        [{x: 2, y: 1}, {x: -1, y: -1}]),
      [{x: 1, y: 1}, 1]);
    assert.deepStrictEqual(findClosestInTree(
        buildTree([{x: 1, y: 1}, {x: 1, y: 5}, {x: 5, y: 1}, {x: 5, y: 5}]),
        [{x: 4, y: 1}, {x: -1, y: -1}, {x: 10, y: 10}]),
      [{x: 5, y: 1}, 1]);
  });

});
