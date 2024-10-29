import * as assert from 'assert';
import { TR, TL, BR, BL, RL, BLUE, ORANGE, ANGLED, STRAIGHT, Block, Row, rnil, rcons,
    mnil, mcons } from './maze';
import { MazeA, MazeB, MazeC } from './designs';

// NOTE: ordinarily we would include comments describing the coverage on these
// test cases. Since you are writing your own code the descriptions may not
// match, so they have been ommited.

describe('designs', function() {

    const rl_straight_blue: Block = {form: STRAIGHT, color: BLUE, direction: RL};
    const rl_straight_orange: Block = {form: STRAIGHT, color: ORANGE, direction: RL};
  
    const tr_angled_blue: Block = {form: ANGLED, color: BLUE, direction: TR};
    const tr_angled_orange: Block = {form: ANGLED, color: ORANGE, direction: TR};
  
    const tl_angled_blue: Block = {form: ANGLED, color: BLUE, direction: TL};
    const tl_angled_orange: Block = {form: ANGLED, color: ORANGE, direction: TL};
  
    const br_angled_blue: Block = {form: ANGLED, color: BLUE, direction: BR};
    const br_angled_orange: Block = {form: ANGLED, color: ORANGE, direction: BR};
  
    const bl_angled_blue: Block = {form: ANGLED, color: BLUE, direction: BL};
    const bl_angled_orange: Block = {form: ANGLED, color: ORANGE, direction: BL};
  
    // tests for maze design A
    it('MazeA', function() {
      const row1_blue: Row = rcons(br_angled_blue, rcons(bl_angled_blue, rnil));
      const row2_blue: Row = rcons(tl_angled_blue, rcons(tr_angled_blue, rnil));
      const row1_orange: Row = rcons(br_angled_orange, rcons(bl_angled_orange, rnil));
      const row2_orange: Row = rcons(tl_angled_orange, rcons(tr_angled_orange, rnil));
  
      assert.deepStrictEqual(MazeA(0n, BLUE), mnil);
      assert.deepStrictEqual(MazeA(2n, ORANGE), mcons(row1_orange, mcons(row2_orange, mnil)));
      assert.deepStrictEqual(MazeA(4n, BLUE), mcons(row1_blue, mcons(row2_blue, mcons(row1_blue, 
          mcons(row2_blue, mnil)))));
    });
  
    // tests for maze design B
    it('MazeB', function() {
      const row1_blue: Row = rcons(tr_angled_blue, rcons(bl_angled_blue, rnil));
      const row2_blue: Row = rcons(br_angled_blue, rcons(tl_angled_blue, rnil));
      const row1_orange: Row = rcons(tr_angled_orange, rcons(bl_angled_orange, rnil));
      const row2_orange: Row = rcons(br_angled_orange, rcons(tl_angled_orange, rnil));
  
      assert.deepStrictEqual(MazeB(0n, ORANGE), mnil);
      assert.deepStrictEqual(MazeB(2n, BLUE), mcons(row1_blue, mcons(row2_blue, mnil)));
      assert.deepStrictEqual(MazeB(4n, ORANGE), mcons(row1_orange, mcons(row2_orange, mcons(row1_orange, 
          mcons(row2_orange, mnil)))));
    });
  
    // tests for maze design C
    it('MazeC', function() {
      const row1_blue: Row = rcons(br_angled_blue, rcons(rl_straight_blue, rnil));
      const row2_blue: Row = rcons(tr_angled_blue, rcons(bl_angled_blue, rnil));
      const row3_blue: Row = rcons(rl_straight_blue, rcons(tl_angled_blue, rnil));
      const row1_orange: Row = rcons(br_angled_orange, rcons(rl_straight_orange, rnil));
      const row2_orange: Row = rcons(tr_angled_orange, rcons(bl_angled_orange, rnil));
      const row3_orange: Row = rcons(rl_straight_orange, rcons(tl_angled_orange, rnil));
  
      assert.deepStrictEqual(MazeC(0n, ORANGE), mnil);
      assert.deepStrictEqual(MazeC(3n, ORANGE), mcons(row1_orange, mcons(row2_orange, mcons(row3_orange, mnil))));
      assert.deepStrictEqual(MazeC(9n, BLUE),
          mcons(row1_blue, mcons(row2_blue, mcons(row3_blue, 
            mcons(row1_blue, mcons(row2_blue, mcons(row3_blue, 
              mcons(row1_blue, mcons(row2_blue, mcons(row3_blue, mnil))))))))));
    });
  
  });