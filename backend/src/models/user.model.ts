import mongoose from "mongoose";


/** Evaluation Interface
 */
export interface User {
    "_id"?: mongoose.Types.ObjectId,
    // Note that result may only be within a range of 0 to 5
    "name": String,
    "birthdate": Date,
    "email": String,
    "password": String,
    "averageEvalOfRides": Number
}

/** Evaluation Class
 */

export class UserClass implements User {
    _id?: mongoose.Types.ObjectId;
    name: string;
    birthdate: Date;
    email: string;
    password: string;
    averageEvalOfRides: number;

    constructor(name: string, birthdate: Date, email: string, password: string, averageEvalOfRides: number, _id?: mongoose.Types.ObjectId) {
        this._id = _id;
        this.name = name;
        this.birthdate = birthdate;
        this.email = email;
        this.password = password;
        this.averageEvalOfRides = averageEvalOfRides;
    }

}