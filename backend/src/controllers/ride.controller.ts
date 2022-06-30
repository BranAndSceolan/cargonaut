import {Request, Response} from "express";
import {MongoModule} from "../modules/mongo/mongo.module";
import mongoose from "mongoose";
import {RideModule} from "../modules/entities/ride.module";
import {RideClass, RidePlusClass} from "../models/ride.model";
import {userController, vehicleController} from "./index";
import config from "config";

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
        let user
        if (config.get('disableAuth') == "true") {
            user = await userController.userModule.getUserById(req.body.user)
        } else {
            user = await userController.userModule.getUserByName(req.session.signInName)
        }
        if (! req.body.date){
            res.status(400).send("Missing date!")
        } else if (! req.body.vehicle) {
            res.status(400).send("Missing vehicle id!")
        } else if (! req.body.destination){
            res.status(400).send("Missing destination!")
        } else if (! req.body.origin){
            res.status(400).send("Missing origin!")
        } else if (! req.body.description){
            res.status(400).send("Missing description!")
        } else if (! req.body.numberOfFreeSeats){
            res.status(400).send("Missing number of free seats!")
        } else if (! req.body.title){
            res.status(400).send("missing title!")
        } else if (! req.body.price){
            res.status(400).send("Missing price!")
        } else if (! user?._id) {
            res.status(400).send("Couldn't find user or no user given")
        } else {
            let pendingReqs = undefined
            if (req.body.pendingReqs) {
                pendingReqs = req.body.pendingReqs
            }
            let accReqs = undefined
            if (req.body.accReqs) {
                accReqs = req.body.accReqs
            }
            let vehicle = undefined
            if(req.body.vehicle) {
                vehicle = req.body.vehicle
            }
            this.rideModule.createRide(new RideClass(req.body.date, req.body.origin, req.body.destination, req.body.title, req.body.description, req.body.numberOfFreeSeats, req.body.vehicle, req.body.price, req.body.user, vehicle, pendingReqs, accReqs)).then(result => {
                if (result) {
                    res.status(201).send(result);
                } else {
                    res.status(500).send("Internal Server Error (seems like the objects don't exist)")
                }
            }).catch(err => {
                res.status(500).send(err)
            });
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
    public async getAll(_req: Request, res: Response) {
        this.rideModule.getAllRides().then(async (result: any) => {
            if (result) {
                for (const resultElement of result) {
                  const vehicle = await vehicleController.vehicleModule.findVehicleById(resultElement.vehicle)
                    let height = "height: no information given"
                    let width = "width: no information given"
                    let length = "length: no information given"
                    if (vehicle?.spaceHeight){
                        height = "estimated height: " + vehicle.spaceHeight
                    }
                    if (vehicle?.spaceWidth){
                        width = "estimated width: " + vehicle.spaceWidth
                    }
                    if (vehicle?.spaceLength){
                        length = "estimated length: " + vehicle.spaceLength
                    }
                    result = new RidePlusClass(result.date, result.origin, result.destination, result.title, result.description, result.numberOfFreeSeats, result.vehicle, result.price, result.userId, result.pendingReqs, result.accReqs, height, width, length )

                }
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
        let user
        if (config.get('disableAuth') == "true") {
            user = await userController.userModule.getUserById(req.body.user)
        } else {
            user = await userController.userModule.getUserByName(req.session.signInName)
        }
        if (! req.body.date){
            res.status(400).send("Missing date!")
        } else if (! req.body.destination){
            res.status(400).send("Missing destination!")
        }else if (! req.body.vehicle){
            res.status(400).send("Missing vehicle id!")
        } else if (! req.params.id){
            res.status(400).send("Missing id!")
        } else if (! req.body.origin){
            res.status(400).send("Missing origin!")
        } else if (! req.body.description){
            res.status(400).send("Missing description!")
        } else if (! req.body.numberOfFreeSeats){
            res.status(400).send("Missing number of free seats!")
        } else if (! req.body.title){
            res.status(400).send("missing title!")
        } else if (! req.body.price){
            res.status(400).send("Missing price!")
        } else if (! user?._id) {
            res.status(400).send("Couldn't find user or no user given")
        } else {
            let pendingReqs = undefined
            if (req.body.pendingReqs) {
                pendingReqs = req.body.pendingReqs
            }
            let accReqs = undefined
            if (req.body.accReqs) {
                accReqs = req.body.accReqs
            }
            let vehicle = undefined
            if(req.body.vehicle) {
                vehicle = req.body.vehicle
            }
            this.rideModule.updateRide(new mongoose.Types.ObjectId(req.params.id), new RideClass(req.body.date, req.body.origin, req.body.destination, req.body.title, req.body.description, req.body.numberOfFreeSeats, req.body.vehicle, req.body.price, req.body.user, vehicle, pendingReqs, accReqs)).then(result => {
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(500).send("Internal Server Error (seems like the objects don't exist)")
                }
            }).catch(err => {
                res.status(500).send(err)
            });
        }
    }

}
