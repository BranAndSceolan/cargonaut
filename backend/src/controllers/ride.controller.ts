import {Request, Response} from "express";
import {MongoModule} from "../modules/mongo/mongo.module";
import mongoose from "mongoose";
import {RideModule} from "../modules/entities/ride.module";
import {RideClass} from "../models/ride.model";
import {userController} from "./index";

/**
 * Controller for all rides, providing all functionalities e.g. (create, read, update, delete)
 *     for the ride router using methods of ride module.
 */
export class RideController {
    rideModule: RideModule;


    constructor(mongo: MongoModule) {
        this.rideModule = new RideModule(mongo);
    }

    /**
     * calls createRide() method of RideModule, to create a new ride
     * @param req
     * @param res
     */
    public async create(req: Request, res: Response): Promise<void> {
        const user = await userController.userModule.getUserByName(req.session.signInName)
        if (req.body && req.body.date && req.body.origin && req.body.destination && req.body.title && req.body.description && req.body.numberOfFreeSeats && req.body.price && user?._id && req.body.pendingReqs && req.body.accReqs){

            this.rideModule.createRide(new RideClass(req.body.date, req.body.origin, req.body.destination, req.body.user, req.body.vehicle, req.body.pendingReqs, req.body.accReqs)).then(result =>{
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(500).send("Internal Server Error (seems like the objects don't exist)")
                }
            }).catch(err=>{
                res.status(500).send(err)
            });
        } else {
            res.status(400).send("Bad Request")
        }
    }

    public get(req: Request, res: Response) {
        const id = req.params.id;
        this.rideModule.findRideById(new mongoose.Types.ObjectId(id)).then((result: any) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }
    /**
     *  get all rides
     * @param _req
     * @param res
     */
    public getAll(_req: Request, res: Response) {
        this.rideModule.getAllRides().then((result: any) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }


    /**
     * calls deleteRide() method of evaluation.module, to delete a ride specified by its id
     * @param req
     * @param res
     */
    public delete(req: Request, res: Response): void {
        const id: string | undefined = req.params.id;
        this.rideModule.deleteRide(new mongoose.Types.ObjectId(id)).then((result: any) => {
            if (result) {
                res.status(200).send(result); //deleted Entity
            } else {
                res.status(500).send("Internal Server Error")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }

    public async update(req: Request, res: Response): Promise<void> {
        const user = await userController.userModule.getUserByName(req.session.signInName)
        if (req.body && req.params.id && req.body.date && req.body.origin && req.body.destination && req.body.title && req.body.vehicle && req.body.description && req.body.numberOfFreeSeats && req.body.price && user?._id){
            let accReq = undefined
            let penReq = undefined
            if (req.body.pendingReqs){
                penReq = req.body.pendingReqs
            }
            if (req.body.accReqs){
                accReq = req.body.accReqs
            }
            this.rideModule.updateRide(new mongoose.Types.ObjectId(req.params.id), new RideClass(req.body.date, req.body.origin, req.body.destination, req.body.title, req.body.vehicle, req.body.description, req.body.numberOfFreeSeats, req.body.price, user._id, penReq, accReq)).then(result =>{
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(500).send("Internal Server Error (seems like the objects don't exist)")
                }
            });
        } else {
            if(!user){
                res.sendStatus(500)
            }
            res.status(400).send("Bad Request")
        }
    }

}
