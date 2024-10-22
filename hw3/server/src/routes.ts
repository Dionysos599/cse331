import { Request, Response } from "express";
import { BUILDINGS, EDGES } from './campus';
import { shortestPath } from './dijkstra';

/** Returns a list of all known buildings. */
export const getBuildings = (_req: Request, res: Response): void => {
  res.send({buildings: BUILDINGS});
};

export const getShortestPath = (req: Request, res: Response): void => {
  const startShortName = first(req.query.start);
  const endShortName = first(req.query.end);

  if (startShortName === undefined) {
    res.status(400).send(`Missing 'start' query parameter.`);
    return;
  } else if (endShortName === undefined) {
    res.status(400).send(`Missing 'end' query parameter.`);
    return;
  }

  const startBuilding = BUILDINGS.find(b => b.shortName === startShortName);
  const endBuilding = BUILDINGS.find(b => b.shortName === endShortName);

  if (startBuilding === undefined || endBuilding === undefined) {
    res.status(400).send(`Invalid 'start' or 'end' building: Start: ${startShortName}, End: ${endShortName}`);
    return;
  }

  const path = shortestPath(startBuilding.location, endBuilding.location, EDGES);
  if (path === undefined) {
    res.status(404).send(`No path found between the specified buildings: Start: ${startShortName}, End: ${endShortName}`);
    return;
  }

  res.send({ path });
};

// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};
