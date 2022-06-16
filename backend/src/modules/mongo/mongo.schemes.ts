import {Schema} from "mongoose";
import {Evaluation} from "../../models/evaluation.model";
import {Request} from "../../models/request.model";
import {Ride} from "../../models/ride.model";

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
    requestStatus: {type: Number, enum: [0, 1, 2], required: true},
    date: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, required: true},
    cargo: {type: mongoose.Types.ObjectId, required: false},
    trackingStatus: {type: Number, enum: [0, 1, 2], required: true}
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
