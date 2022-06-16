import {Schema} from "mongoose";
import {Evaluation} from "../../models/evaluation.model";
import {Request} from "../../models/request.model";
import {Ride} from "../../models/ride.model";
import {User} from "../../models/user.model";
import {Vehicle} from "../../models/vehicle.model";

const mongoose = require('mongoose')

/**
 * Evaluation
 * create a evaluationSchema corresponding to the document Evaluation interface
 */
export const evaluationSchema = new Schema<Evaluation>({
    result: {type: Number, required: true},
    ride: {type: mongoose.Types.ObjectId, required: true},
    user: {type: mongoose.Types.ObjectId, required: true}
});

/**
 * Request
 * create a requestSchema corresponding to the document Request interface
 */
export const requestSchema = new Schema<Request>({
    requestStatus: {type: String, enum: ['pending', 'accepted', 'denied'], required: true},
    date: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, required: true},
    cargo: {type: mongoose.Types.ObjectId, required: false},
    trackingStatus: {type: String, enum: ['pending', 'departed', 'arrived'], required: true}
});

/**
 * Ride
 * create a rideSchema corresponding to the document Ride interface
 */
export const rideSchema = new Schema<Ride>({
    date: {type: String, required: true},
    origin: {type: String, required: true},
    destination: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, required: true},
    pendingReqs: {type: [mongoose.Types.ObjectId], required: false},
    accReqs: {type: [mongoose.Types.ObjectId], required: false}
});

export const userSchema = new Schema<User>({
    name: {type: String, required: true},
    birthdate: {type: Date, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    averageEvalOfRides: {type: Number, required: false}
})

export const vehicleSchema = new Schema<Vehicle>({
    type: {type: String, enum: [
            'pick up truck',
            'car with horse trailer',
            'car with bike rack',
            'standard car',
            'truck',
            'caravan',
            'car with open trailer',
            'car with covered trailer',
            'bus',
            'motorcycle',
            'other'],
        required: true},
    spaceLength: {type: Number, required: false},
    spaceWidth: {type: Number, required: false},
    spaceHeight: {type: Number, required: false},
    numberOfSeats: {type: Number, required: true},
    notes: {type: String, required: false}
})