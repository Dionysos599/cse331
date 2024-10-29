/** Represents a block with a straight path. */
export type STRAIGHT = "STRAIGHT";
/** Constant for easy access */
export const STRAIGHT: "STRAIGHT" = "STRAIGHT";

/** Represents a block with an angled path. */
export type ANGLED = "ANGLED";
/** Constant for easy access */
export const ANGLED: "ANGLED" = "ANGLED";

/** Represents the color of the block */
export type Color = "BLUE" | "ORANGE";

/** Represents the color blue. */
export const BLUE: "BLUE" = "BLUE";

/** Represents the color orange. */
export const ORANGE: "ORANGE" = "ORANGE";

/** Represents the corner where the block's path is */
export type Corner = "TR" | "TL" | "BR" | "BL";

/** Represents the line direction of the block */
export type Line = "TB" | "RL";

/** Angled block oriented toward the TR direction. */
export const TR: "TR" = "TR";

/** Angled block oriented toward the TL direction. */
export const TL: "TL" = "TL";

/** Angled block oriented toward the BR direction. */
export const BR: "BR" = "BR";

/** Angled block oriented toward the BL direction. */
export const BL: "BL" = "BL";

/** Straight block oriented top to bottom */
export const TB: "TB" = "TB";

/** Straight block oriented right to left */
export const RL: "RL" = "RL";


export type Block = 
  {readonly form: STRAIGHT, readonly color: Color, readonly direction: Line} 
  | {readonly form: ANGLED, readonly color: Color, readonly direction: Corner};


export type Row = {readonly kind: "rnil"} | {readonly kind: "rcons", readonly hd: Block, readonly tl: Row};

/** The empty list of blocks. */
export const rnil: {readonly kind: "rnil"} = {kind: "rnil"};

/** Returns a list of blocks with hd in front of tl. */
export const rcons = (hd: Block, tl: Row): Row => {
  return {kind: "rcons", hd: hd, tl: tl};
};


export type Maze= {readonly kind: "mnil"} | {readonly kind: "mcons", readonly hd: Row, readonly tl: Maze};

/** The empty list of rows. */
export const mnil: {readonly kind: "mnil"} = {kind: "mnil"};

/** Returns a list of rows with hd in front of tl. */
export const mcons= (hd: Row, tl: Maze): Maze => {
  return {kind: "mcons", hd: hd, tl: tl};
};

/** Returns the length of the given row. */
export const rlen = (row: Row): bigint => {
  if (row.kind === "rnil") {
    return 0n;
  } else {
    return 1n + rlen(row.tl);
  }
};

/** Returns the concatenation of two rows. */
export const rconcat = (row1: Row, row2: Row): Row =>{
  if (row1.kind === "rnil") {
    return row2;
  } else {
    return rcons(row1.hd, rconcat(row1.tl, row2));
  }
};

/** Returns the length of the given maze. */
export const mlen = (maze: Maze): bigint => {
  if (maze.kind === "mnil") {
    return 0n;
  } else {
    return 1n + mlen(maze.tl);
  }
};

/** Returns the concatenation of two mazes. */
export const mconcat = (maze1: Maze, maze2: Maze): Maze => {
  if (maze1.kind === "mnil") {
    return maze2;
  } else {
    return mcons(maze1.hd, mconcat(maze1.tl, maze2));
  }
};