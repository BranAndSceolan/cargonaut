import express from 'express'
import { Request, Response} from 'express'
import {vehicleController} from '../controllers';


export const router = express.Router({
    strict: true
})

/**
 * Vehicle Routes
 */

// POST Routes
router.post('/create', (req: Request, res: Response) => {
    vehicleController.create(req, res)
})

// GET Routes
router.get('/getAll', (req: Request, res: Response) => {
    vehicleController.getAll(req, res)
})

router.get('/findById/:id', (req: Request, res: Response) => {
    vehicleController.get(req, res)
})

// DELETE Routes
router.delete('/delete/:id', (req: Request, res: Response) => {
    vehicleController.delete(req, res)
})
