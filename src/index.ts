import express from "express";
import {Application, Request, Response} from "express";

// Boot express
export const app: Application = express();
const port = 8008;

// Application routing
/*app.use('/', (_req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, "/public/index.html"))
});*/

app.use('/', (_req: Request, res: Response) => {
    res.status(200).send("Welcome to the cargonaut-backend!")
});

// Start server
app.listen(port, () => console.log(`Server is listening on ${port}`));
