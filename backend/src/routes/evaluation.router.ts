import express from 'express'
// import {Request, Response} from 'express'
import {printToConsole} from"../modules/util/util.module";

export const router = express.Router({
    strict: true
})

/**
 * Item Routes
 */

printToConsole("itemRouter in use");

// POST Routes
//router.post('/create', (req: Request, res: Response) => {
   //evaluationController.create(req, res)
//})
