import express from 'express'
import {Request, Response} from 'express'
import {rideController} from '../controllers';

export const router = express.Router({
    strict: true
})

/**
 * Ride Routes
 */

// POST Routes
router.post('/create', (req: Request, res: Response) => {
    rideController.create(req, res)
})

// GET Routes
router.get('/getAll', (req: Request, res: Response) => {
    rideController.getAll(req,res)
})

router.get('/getByName/:name', (req: Request, res: Response) => {
    rideController.get(req,res)
})

// DELETE Routes
router.delete('/delete/:id', (req: Request, res: Response) => {
    rideController.delete(req, res)
})

