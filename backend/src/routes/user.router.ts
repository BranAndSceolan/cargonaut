import express from 'express'
import {Request, Response} from 'express'
import {userController} from '../controllers';

export const router = express.Router({
    strict: true
})

/**
 * User Routes
 */

// POST Routes
router.post('/create', (req: Request, res: Response) => {
     userController.create(req, res)
})

router.post('/update', (req: Request, res: Response) => {
    userController.update(req, res)
})

// GET Routes
router.get('/getAll', (req: Request, res: Response) => {
    userController.getAllUsers(req,res)
})

router.get('/getByName/:name', (req: Request, res: Response) => {
   userController.getByName(req,res)
})

// DELETE Routes
router.delete('/delete/:id', (req: Request, res: Response) => {
    userController.delete(req, res)
})

