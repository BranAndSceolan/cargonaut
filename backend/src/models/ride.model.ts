import mongoose from "mongoose";


/** Ride Interface
 */
export interface Ride {
    "_id"?: mongoose.Types.ObjectId,
    "date": string,
    "origin": string,
    "destination": string,
    "title": string,
    "description": string,
    "numberOfFreeSeats": number,
    "user": mongoose.Types.ObjectId,
    "pendingReqs"?: mongoose.Types.ObjectId[],
    "accReqs"?: mongoose.Types.ObjectId[]
}

/** Ride Class
 */

export class RideClass implements Ride {
    _id?: mongoose.Types.ObjectId;
    date: string;
    origin: string;
    destination: string;
    title: string;
    description: string;
    numberOfFreeSeats: number;
    user: mongoose.Types.ObjectId;
    pendingReqs?: mongoose.Types.ObjectId[];
    accReqs?: mongoose.Types.ObjectId[];


    constructor(date: string, origin: string, destination:string, title: string, description: string, numberOfFreeSeats: number, user: mongoose.Types.ObjectId, pendingReqs?: mongoose.Types.ObjectId[], accReqs?: mongoose.Types.ObjectId[], _id?: mongoose.Types.ObjectId) {
        this._id = _id;
        this.date = date;
        this.origin = origin;
        this.destination = destination;
        this.title = title;
        this.description = description;
        this.numberOfFreeSeats = numberOfFreeSeats;
        this.user = user;
        this.pendingReqs = pendingReqs;
        this.accReqs = accReqs;
    }

}
