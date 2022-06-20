import express from 'express'
import {Request, Response} from 'express'
import {requestController} from '../controllers';

export const router = express.Router({
    strict: true
})

/**
 * Request Routes
 */

// POST Routes
router.post('/create', (req: Request, res: Response) => {
    requestController.create(req, res)
})

router.post('/update', (req: Request, res: Response) => {
    requestController.update(req, res)
})

// GET Routes
router.get('/getAll', (req: Request, res: Response) => {
    requestController.getAll(req,res)
})

router.get('/getByName/:name', (req: Request, res: Response) => {
    requestController.get(req,res)
})

// DELETE Routes
router.delete('/delete/:id', (req: Request, res: Response) => {
    requestController.delete(req, res)
})

