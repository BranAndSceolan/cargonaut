import {Request, Response} from "express";
import {LabelModule} from "../modules/entities/label.module";
import {MongoModule} from "../modules/mongo/mongo.module";
import {printToConsole} from"../modules/util/util.module";
import mongoose from "mongoose";
import {VehicleModule} from "../modules/entities/vehicle.module";
import {Vehicle} from "../models/vehicle.model";

/**
 * Controller for all labelIds, providing all functionalities e.g. (create, read, update, delete)
 *     for the label router using methods of label module.
 */
export class VehicleController {
    vehicleModule: LabelModule;


    constructor(mongo: MongoModule) {
        this.vehicleModule = new VehicleModule(mongo);
    }

    /**
     * calls createVehicle() method of VehicleModule, to create a new Vehicle
     * @param req
     * @param res
     */
    public create(req: Request, res: Response): void {
        let vehicle: Vehicle;
        }

    }

    /**
     *  get all vehicleIds
     * @param req
     * @param res
     */
    public getAll(req: Request, res: Response) {
        this.vehicleModule.getAllLabels().then((result: any) => {
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
    public delete(req: Request, res: Response): void {
        let id: string = req.params.id;
        this.vehicleModule.deleteLabel(new mongoose.Types.ObjectId(id)).then((result: any) => {
            if (result) {
                res.status(200).send(result); //deleted Entity
            } else {
                res.status(500).send("Internal Server Error")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }

}
