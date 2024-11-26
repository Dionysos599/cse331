import express, { Express } from "express";
import { saveFile, listFiles, loadFile, deleteFile } from './routes';
import bodyParser from 'body-parser';


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());
// app.get("/api/dummy", dummy);
app.get("/api/list", listFiles);
app.get("/api/load", loadFile);
app.post("/api/save", saveFile);
app.post("/api/delete", deleteFile);
app.listen(port, () => console.log(`Server listening on ${port}`));
