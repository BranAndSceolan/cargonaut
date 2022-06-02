import * as express from "express";

// Boot express
const app: express.Application = express();
const port = 5000;

// Application routing
app.use('/', (req: express.Request, res: express.Response, next: express.NextFunction ) => {
    res.status(200).send({data: 'Hello from Ornio AS'});
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
