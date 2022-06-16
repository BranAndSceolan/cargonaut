import mongoose, {connect} from 'mongoose';
import {dbName} from '../../config/config.json';
import config from 'config'
import * as schemes from "../../models/index"
import {Vehicle} from "../../models/vehicle.model";
import {User} from "../../models/user.model";
import {Ride} from "../../models/ride.model";
import {Evaluation} from "../../models/evaluation.model";

/**
 * Basic functions for interacting with MongoDB
 */
export class MongoModule {

    /**
     * Connect to mongo database
     */
    async connectToMongo() {
        return connect(config.get('Database.mongoURL'), {dbName: dbName, serverSelectionTimeoutMS: 5000})
    }

    async addVehicle(vehicleData: Vehicle): Promise < mongoose.Types.ObjectId | undefined >{
        const vehicle = new schemes.vehicleModel(vehicleData);
        const i = await vehicle.save();
        return i._id
    }

    async addUser(userData: User): Promise < mongoose.Types.ObjectId | undefined >{
        const user = new schemes.userModel(userData);
        const i = await user.save();
        return i._id
    }

    async addRide(rideData: Ride): Promise < mongoose.Types.ObjectId | undefined >{
        const ride = new schemes.rideModel(rideData);
        const i = await ride.save();
        return i._id
    }

    async addEvaluation(evalData: Evaluation): Promise < mongoose.Types.ObjectId | undefined >{
        const evaluation = new schemes.evaluationModel(evalData);
        const i = await evaluation.save();
        return i._id
    }

    async addRequest(requestData: Request): Promise < mongoose.Types.ObjectId | undefined >{
        const request = new schemes.requestModel(requestData);
        const i = await request.save();
        return i._id
    }
}

