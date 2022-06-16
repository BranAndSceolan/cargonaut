import {MongoModule} from "../modules/mongo/mongo.module";
import {VehicleController} from "./vehicle.controller";
import {UserController} from "./user.controller";

const mongo: MongoModule = new MongoModule();
export const vehicleController = new VehicleController(mongo);
export const userController = new UserController(mongo)
