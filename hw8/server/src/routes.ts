import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { AssocList } from "./assoc";
import { nil } from "./list";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

/** Contains the saved contents (of unknown type) for each file name */
let saved: AssocList<unknown> = nil;

/** Empty the map of saves, for testing purposes */
export const resetSavesForTesting = (): void => {
  saved = nil;
};


/** 
 * Returns a greeting message if "name" is provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
export const dummy = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send('missing "name" parameter');
    return;
  }

  res.send({greeting: `Hi, ${name}`});
};


// TODO: add additional route handler functions here 
// (remove the "dummy" route, route handler, and tests when you no longer need 
// that reference)


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
