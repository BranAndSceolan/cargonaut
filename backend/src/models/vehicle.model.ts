import mongoose from "mongoose";


/** Evaluation Interface
 */
export interface Vehicle {
    "_id"?: mongoose.Types.ObjectId,
    type: vehicleType;
    spaceWidth?: number,
    spaceHeight?: number,
    spaceLength?: number,
    numberOfSeats: number,
    notes?: string
}

/** Evaluation Class
 */

export class vehicleClass implements Vehicle {
    _id?: mongoose.Types.ObjectId;
    type: vehicleType;
    spaceWidth?: number;
    spaceHeight?: number;
    spaceLength?: number;
    numberOfSeats: number;
    notes?: string;

    constructor(type: vehicleType, numberOfSeats: number, notes?: string, spaceWidth?: number, spaceHeight?: number, spaceLength?: number, _id?: mongoose.Types.ObjectId) {
        this._id = _id;
        this.notes = notes;
        this.type = type;
        this.spaceWidth = spaceWidth;
        this.spaceHeight = spaceHeight;
        this.spaceLength = spaceLength;
        this.numberOfSeats = numberOfSeats;
    }

}

export enum vehicleType{
    pickupTruck = 0,
    carWithHorseTrailer = 1,
    carWithBikeRack = 2,
    standardCar = 3,
    truck = 4,
    caravan = 5,
    carWithOpenTrailer = 6,
    carWithCoveredTrailer = 7,
    bus = 8,
    motorcycle = 9,
    other = 10
}
