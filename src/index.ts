import {Application, NextFunction, Request, Response} from "express";

const express = require('express');

// Boot express
const app: Application = express();
const port = 5000;

// Application routing
app.use('/', (req: Request, res: Response) => {
    res.status(200).send({data: 'Hello from Cargonaut'});
});

// Start server
app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));
