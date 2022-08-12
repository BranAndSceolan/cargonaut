import {Request, Response} from "express";
import {MongoModule} from "../modules/mongo/mongo.module";
import mongoose from "mongoose";
import {VehicleModule} from "../modules/entities/vehicle.module";
import {Vehicle, VehicleClass} from "../models/vehicle.model";
import {printToConsole} from "../modules/util/util.module";
import {requestController, rideController, userController} from "./index";
import {User} from "../models/user.model";

/**
 * Controller for all labelIds, providing all functionalities e.g. (create, read, update, delete)
 *     for the label router using methods of label module.
 */
export class VehicleController {
    vehicleModule: VehicleModule;


    constructor(mongo: MongoModule) {
        this.vehicleModule = new VehicleModule(mongo);
    }

    /**
     * calls createVehicle() method of VehicleModule, to create a new Vehicle
     * @param req
     * @param res
     */
    public create(req: Request, res: Response): void {
        if ( req.body && req.body.type && req.body.numberOfSeats && req.body.notes){
            let width: number | undefined = undefined;
            let height: number | undefined = undefined;
            let length: number | undefined = undefined;
            if (req.body.spaceWidth && typeof req.body.spaceWidth == 'number'){
                width = req.body.spaceWidth
            }
            if (req.body.spaceHeight && typeof req.body.spaceHeight == 'number'){
                height = req.body.spaceHeight
            }
            if (req.body.spaceLength && typeof req.body.spaceLength == 'number'){
                length = req.body.spaceLength
            }
            this.vehicleModule.createVehicle(new VehicleClass(req.body.type, req.body.numberOfSeats, req.body.notes, width, height, length)).then( result =>{
                if (result) {
                    res.status(201).send(result);
                } else {
                    res.status(500).send("Internal Server Error (seems like the objects don't exist)")
                }
            }).catch((err)=>{
                printToConsole(err)
                res.send(500)
            });
        } else {
            res.status(400).send("Bad Request")
        }

    }


    /**
     * calls createVehicle() method of VehicleModule, to create a new Vehicle
     * @param req
     * @param res
     */
    public createAndLinkToUser(req: Request, res: Response): void {
        if ( req.body && req.body.type && req.body.numberOfSeats && req.body.notes){
            let width: number | undefined = undefined;
            let height: number | undefined = undefined;
            let length: number | undefined = undefined;
            if (req.body.spaceWidth && typeof req.body.spaceWidth == 'number'){
                width = req.body.spaceWidth
            }
            if (req.body.spaceHeight && typeof req.body.spaceHeight == 'number'){
                height = req.body.spaceHeight
            }
            if (req.body.spaceLength && typeof req.body.spaceLength == 'number'){
                length = req.body.spaceLength
            }
            this.vehicleModule.createVehicle(new VehicleClass(req.body.type, req.body.numberOfSeats, req.body.notes, width, height, length)).then( async (newCarId: mongoose.Types.ObjectId | null) => {
                if (newCarId) {
                    try {
                        await userController.userModule.linkVehicle(req.session.signInId, newCarId)
                        res.status(201).send(newCarId)
                        return
                    } catch (err) {
                        printToConsole(err)
                        res.sendStatus(500)
                        return
                    }
                } else {
                    res.sendStatus(500)
                    return
                }
            }).catch((err)=>{
                printToConsole(err)
                res.sendStatus(500)
                return
            });
        } else {
            res.status(400).send("Bad Request")
            return
        }

    }

    public get(req: Request, res: Response) {
        const id = req.params.id;
        this.vehicleModule.findVehicleById(new mongoose.Types.ObjectId(id)).then((result: any) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }
    /**
     *  get all vehicles
     * @param _req
     * @param res
     */
    public getAll(_req: Request, res: Response) {
        this.vehicleModule.getAllVehicles().then((result: any) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }


    /**
     * calls deleteVehicle() method of vehicle.module, to delete a vehicle specified by id
     * @param req
     * @param res
     */
    public async delete(req: Request, res: Response): Promise<void> {
        const id: string | undefined = req.params.id;
        const obId : mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id)
        this.vehicleModule.deleteVehicle(obId).then((result: Vehicle| null) => {
            if (result) {
                res.status(200).send(result); //deleted Entity
                return
            } else {
                res.status(500).send("Internal Server Error")
                return
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }

    /**
     * calls deleteVehicle() method of vehicle.module, to delete a vehicle specified by id and unlink from currently logged-in user
     * @param req
     * @param res
     */
    public async deleteAndUnlink(req: Request, res: Response): Promise<void> {
        const id: string | undefined = req.params.id;
        const vehicleId = new mongoose.Types.ObjectId(id)
        // remove vehicle id
        const user = await userController.userModule.getUserById(req.session.signInId)
        if (!user?.vehicles?.includes(vehicleId)){
            res.sendStatus(401)
            return
        }
        userController.userModule.unlinkVehicle(req.session.signInId, vehicleId).then(async (user: User | null) => {
            if (user?.vehicles?.includes(vehicleId)) {
                printToConsole("user "+user)
                res.sendStatus(500)
            } else {
                // remove rides involving this vehicle
                const rides = await rideController.rideModule.getRidesByVehicle(vehicleId)
                rideController.rideModule.deleteRidesByVehicle(vehicleId)
                // Mark requests as rideDeleted
                for (const ride of rides) {
                    if (ride.pendingReqs) {
                        for (const request of ride.pendingReqs) {
                            requestController.requestModule.setToRideDeleted(request)
                        }
                    }
                    if (ride.accReqs) {
                        for (const request of ride.accReqs) {
                            requestController.requestModule.setToRideDeleted(request)
                        }
                    }
                }
                this.vehicleModule.deleteVehicle(vehicleId).then((result: Vehicle | null) => {
                    if (result) {
                        res.status(200).send(result); //deleted Entity
                        return
                    } else {
                        printToConsole("no result from delete entity")
                        res.status(500).send("Internal Server Error")
                        return
                    }
                }).catch((err) => {
                    printToConsole(err)
                    res.status(500).send("Internal Server Error")
                });
            }
        }).catch((err) => {
            printToConsole(err)
            res.status(500).send("Internal Server Error")
        });
    }

}
