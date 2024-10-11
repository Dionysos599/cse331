import express from "express";
import { readFileSync } from 'fs';
import { parseBuildings, findByName, closest } from "./routes.js";

// Parse the information about the buildings.
const content = readFileSync("data/campus_buildings.csv", {encoding: 'utf-8'});
parseBuildings(content.split("\n"));

// Configure and start the HTTP server.
const port = 8080;
const app = express();
app.use(express.static('public'));
app.get("/findByName", findByName);
app.get("/closest", closest);
app.listen(port, () => console.log(`Server listening on ${port}`));
