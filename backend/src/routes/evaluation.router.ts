import express from 'express'
import {Request, Response} from 'express'
import {evaluationController} from '../controllers';

export const router = express.Router({
    strict: true
})

/**
 * User Routes
 */

// POST Routes
router.post('/create', (req: Request, res: Response) => {
    evaluationController.create(req, res)
})

// GET Routes
router.get('/getAll', (req: Request, res: Response) => {
    evaluationController.getAll(req,res)
})

router.get('/getByName/:name', (req: Request, res: Response) => {
    evaluationController.get(req,res)
})

// DELETE Routes
router.delete('/delete/:id', (req: Request, res: Response) => {
    evaluationController.delete(req, res)
})

