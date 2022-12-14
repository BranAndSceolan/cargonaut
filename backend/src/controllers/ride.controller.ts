import {Request, Response} from "express";
import {MongoModule} from "../modules/mongo/mongo.module";
import mongoose from "mongoose";
import {RideModule} from "../modules/entities/ride.module";
import {RideClass} from "../models/ride.model";
import {printToConsole} from "../modules/util/util.module";
import {requestController} from "./index";

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
            this.rideModule.createRide(new RideClass(req.body.date, req.body.origin, req.body.destination, req.body.title, req.body.description, req.body.numberOfFreeSeats, vehicle, req.body.price, req.session.signInId, pendingReqs, accReqs)).then(result => {
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

    public async deleteAndUnlink(req: Request, res: Response): Promise<void> {
        const id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.id);
        if (!id) {
            res.sendStatus(400)
            return
        }
        const ride = await this.rideModule.findRideById(id)
        if (ride && ride.user == req.session.signInId) {
            this.rideModule.deleteRide(id).then((result: any) => {
                if (result) {
                    for (const pending of result.pendingReqs){
                        requestController.requestModule.mongo.setRequestToDeletedRide(pending)
                    }
                    for (const acc of result.accReqs){
                        requestController.requestModule.mongo.setRequestToDeletedRide(acc)
                    }
                    res.status(200).send(result); //deleted Entity
                } else {
                    res.status(500).send("Internal Server Error")
                }
            }).catch(() => res.status(500).send("Internal Server Error"));
        } else {
            res.sendStatus(401)
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
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
        } else if (! req.body.user) {
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
            this.rideModule.updateRide(new mongoose.Types.ObjectId(req.params.id), new RideClass(req.body.date, req.body.origin, req.body.destination, req.body.title, req.body.description, req.body.numberOfFreeSeats, vehicle, req.body.price, req.body.user, pendingReqs, accReqs)).then(result => {
                if (result) {
                    res.status(200).send(result);
                } else {
                    printToConsole("update Ride no result")
                    res.status(500).send("Internal Server Error (seems like the objects don't exist)")
                }
            }).catch(err => {
                printToConsole(err)
                res.status(500).send(err)
            });
        }
    }

    public async updateSafer(req: Request, res: Response): Promise<void> {
        const id = new mongoose.Types.ObjectId(req.params.id)
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
        }  else {
            let pendingReqs = undefined
            if (req.body.pendingReqs) {
                pendingReqs = req.body.pendingReqs
            }
            let accReqs = undefined
            if (req.body.accReqs) {
                accReqs = req.body.accReqs
            }
            let vehicle = undefined
            if (req.body.vehicle) {
                vehicle = req.body.vehicle
            }
            const ride = await this.rideModule.findRideById(id)
            printToConsole("user "+ride?.user)
            printToConsole("Signid "+req.session.signInId)
            if (ride && ride.user && ride.user == req.session.signInId) {
                this.rideModule.updateRide(id, new RideClass(req.body.date, req.body.origin, req.body.destination, req.body.title, req.body.description, req.body.numberOfFreeSeats, vehicle, req.body.price, req.session.signInId, pendingReqs, accReqs)).then(result => {
                    if (result) {
                        res.status(200).send(result);
                    } else {
                        printToConsole("update Ride no result")
                        res.status(500).send("Internal Server Error (seems like the objects don't exist)")
                    }
                }).catch(err => {
                    printToConsole(err)
                    res.status(500).send(err)
                });
            } else {
                res.sendStatus(401)
            }
        }
    }

}
