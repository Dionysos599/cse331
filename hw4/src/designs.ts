import {
  Maze, mnil, mcons, rcons, rnil,
  Color,
  STRAIGHT, ANGLED,
  BR, BL, TL, TR, RL,
} from './maze';

// math definitions. The parameters must be ordered as below for testing, 
// (it's okay if this deviates slightly from your math definition)

/** 
 * Returns a maze in design "A" as defined in Task 4b
 * @param rows of design to create, must be even number >= 0
 * @param color of design to create
 */
export const MazeA = (rows: bigint, color: Color): Maze => {
  if (rows === 0n) {
    return mnil;
  }
  if (rows < 0n || rows % 2n !== 0n) {
    throw new Error("rows must be an non-zero even number");
  }

  const r1 = rcons({form: ANGLED, color: color, direction: BR},
      rcons({form: ANGLED, color: color, direction: BL}, rnil));
  const r2 = rcons({form: ANGLED, color: color, direction: TL},
      rcons({form: ANGLED, color: color, direction: TR}, rnil));

  return mcons(r1, mcons(r2, MazeA(rows - 2n, color)));
}

/** 
 * Returns a maze in design "B" as defined in Task 4b
 * @param rows of design to create, must be even number >= 0
 * @param color of design to create
 */
export const MazeB = (rows: bigint, color: Color): Maze => {
  if (rows === 0n) {
    return mnil;
  }
  if (rows < 0n || rows % 2n !== 0n) {
    throw new Error("rows must be an non-zero even number");
  }

  const r3 = rcons({form: ANGLED, color: color, direction: TR},
      rcons({form: ANGLED, color: color, direction: BL}, rnil));
  const r4 = rcons({form: ANGLED, color: color, direction: BR},
      rcons({form: ANGLED, color: color, direction: TL}, rnil));

  return mcons(r3, mcons(r4, MazeB(rows - 2n, color)));
}

/** 
 * Returns a maze in design "C" as defined in Task 4b
 * @param rows of design to create, must be a multiple of 3, >= 0
 * @param color of design to create
 */
export const MazeC = (rows: bigint, color: Color): Maze => {
  if (rows === 0n) {
    return mnil;
  }
  if (rows < 0n || rows % 3n !== 0n) {
    throw new Error("rows must be an non-zero multiple of 3");
  }

  const r5 = rcons({form: ANGLED, color: color, direction: BR},
      rcons({form: STRAIGHT, color: color, direction: RL}, rnil));
  const r6 = rcons({form: ANGLED, color: color, direction: TR},
      rcons({form: ANGLED, color: color, direction: BL}, rnil));
  const r7 = rcons({form: STRAIGHT, color: color, direction: RL},
      rcons({form: ANGLED, color: color, direction: TL}, rnil));

  return mcons(r5, mcons(r6, mcons(r7, MazeC(rows - 3n, color))));
}
