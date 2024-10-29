export type List =
    | {readonly kind: "nil"}
    | {readonly kind: "cons", readonly hd: bigint, readonly tl: List};


/** The empty list. */
export const nil: {kind: "nil"} = {kind: "nil"};

/** Returns a list with hd in front of tl. */
export const cons = (hd: bigint, tl: List): List => {
  return {kind: "cons", hd: hd, tl: tl};
};