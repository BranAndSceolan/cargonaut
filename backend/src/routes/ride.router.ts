import express from 'express'
import {Request, Response} from 'express'
import {rideController} from '../controllers';
import {authModule} from "../modules/auth";

export const router = express.Router({
    strict: true
})

/**
 * Ride Routes
 */

// POST Routes
router.post('/create', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => rideController.create(req, res))
})


router.post('/update/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => rideController.update(req, res))
})
// PUT Routes
router.put('/update/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => rideController.update(req, res))
})

router.put('/updateNew/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => rideController.updateSafer(req, res))
})

// GET Routes
router.get('/getAll', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => rideController.getAll(req,res))
})

router.get('/findById/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => rideController.get(req,res))
})

// DELETE Routes
router.delete('/delete/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => rideController.delete(req, res))
})

router.delete('/deleteAndUnlink/:id', (req: Request, res: Response) => {
    authModule.checkLogin(req, res, () => rideController.deleteAndUnlink(req, res))
})