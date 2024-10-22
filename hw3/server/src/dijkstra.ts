import { Location, Edge, sameLocation } from './campus';
import { Heap } from './heap';


/**
 * A path from one location on the map to another by following along the given
 * steps in the order they appear in the array. Each edge must start at the
 * place where the previous edge ended. We also cache the total distance of the
 * edges in the path for faster access.
 */
export type Path =
    {start: Location, end: Location, steps: Array<Edge>, dist: number};

const toString = (loc: Location): string => {
    return `${loc.x},${loc.y}`;
}

/**
 * Returns the shortest path from the given start to the given ending location
 * that can be made by following along the given edges. If no path exists, then
 * this will return undefined. (Note that all distances must be positive or else
 * shortestPath may not work!)
 */
export const shortestPath = (
    _start: Location, _end: Location, _edges: Array<Edge>): Path | undefined => {

  // Outgoing edges from each location
  const adjacent: Map<string, Array<Edge>> = new Map();
  for (const edge of _edges) {
    const startStr = toString(edge.start);
    if (!adjacent.has(startStr)) {
      adjacent.set(startStr, []);
    }
    adjacent.get(startStr)!.push(edge);
  }

  // locations with the shortest path found.
  const finished: Set<string> = new Set();

  // All paths to an unfinished location
  const active = new Heap<Path>((a, b) => a.dist - b.dist);
  active.add({start: _start, end: _start, steps: [], dist: 0});

  while (!active.isEmpty()) {
    const minPath = active.removeMin();

    if (sameLocation(minPath.end, _end))
      return minPath;

    const endStr = toString(minPath.end);
    if (finished.has(endStr))
      continue;

    finished.add(endStr);

    let edgesFromEnd = adjacent.get(endStr);
    if (edgesFromEnd === undefined)
      edgesFromEnd = [];

    for (const e of edgesFromEnd) {
      const endEdgeKey = `${e.end.x},${e.end.y}`;
      if (!finished.has(endEdgeKey)) {
        const newPath: Path = {
          start: minPath.start,
          end: e.end,
          steps: [...minPath.steps, e],
          dist: minPath.dist + e.dist
        };
        active.add(newPath);
      }
    }
  }

  return undefined;
};