import express from "express";
import {Application, Request, Response} from "express";
import * as path from "path";

// Boot express
const app: Application = express();
const port = 5000;

// Application routing
app.use('/', (_req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, "/public/index.html"))
});

// Start server
app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));
