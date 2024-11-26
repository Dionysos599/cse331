import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { AssocList, set_value, get_value, get_keys, contains_key, delete_key } from "./assoc";
import { nil, compact_list } from "./list";


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
 * List all saved file names
 * @param _req request to respond to
 * @param res object to send response with
 */
export const listFiles = (_req: SafeRequest, res: SafeResponse): void => {
  const keys = compact_list(get_keys(saved));
  res.status(200).send({ files: keys });
};


/**
 * Load file contents by name
 * @param req request to respond to
 * @param res object to send response with
 */
export const loadFile = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);

  if (name === undefined) {
    res.status(400).send('Missing "name" parameter');
    return;
  }

  if (!contains_key(name, saved)) {
    res.status(404).send({ error: `File "${name}" not found` });
    return;
  }

  const content = get_value(name, saved);
  const response = { name, content };

  console.log('Sending response:', JSON.stringify(response));

  res.status(200).send(response);
};


/**
 * Save file contents with a given name
 * @param req request to respond to
 * @param res object to send response with
 */
export const saveFile = (req: SafeRequest, res: SafeResponse): void => {
  if (!req.body || typeof req.body !== 'object' || !('name' in req.body) || !('content' in req.body)) {
    res.status(400).send('Request body must contain name and content fields');
    return;
  }

  if (typeof req.body.name !== 'string') {
    res.status(400).send('Name must be a string');
    return;
  }

  const name = req.body.name;

  try {
    const contentStr = JSON.stringify(req.body.content);
    const contentObj = JSON.parse(contentStr); // Parse back to ensure valid
    saved = set_value(name, contentObj, saved);
    res.status(200).send({ message: "File saved successfully" });
  } catch {
    res.status(400).send({ error: 'Content must be JSON-serializable' });
  }
};


/**
 * Delete a file by name
 * @param req
 * @param res
 */
export const deleteFile = (req: SafeRequest, res: SafeResponse): void => {
    // Change from query parameter to body
    if (!req.body || typeof req.body !== 'object' || !('name' in req.body)) {
        res.status(400).send('Request body must contain name field');
        return;
    }

    const name = req.body.name;

    // Validate name is string
    if (typeof name !== 'string') {
        res.status(400).send('Name must be a string');
        return;
    }

    if (!contains_key(name, saved)) {
        res.status(404).send({ error: `File "${name}" not found` });
        return;
    }

    saved = delete_key(name, saved);
    res.status(200).send({ message: `File "${name}" deleted` });
};


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give multiple values,
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
