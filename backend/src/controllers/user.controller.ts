import {Request, Response} from "express";
import { User, UserClass} from "../models/user.model";
import {MongoModule} from "../modules/mongo/mongo.module";
import {UserModule} from "../modules/entities/user.module";
import {printToConsole} from "../modules/util/util.module";
import mongoose from "mongoose";
import {evaluationController, requestController, rideController, vehicleController} from "./index";
import config from "config";
import argon2 from "argon2";
import {Vehicle} from "../models/vehicle.model";
import {Req} from "../models/request.model";


/** USER CONTROLLER
 * Class for actions triggered on User docs in the DB.
 * The functions are intended to be triggered via Router an therefore accept HTTP- Requests and Responses as parameter.
 */
export class UserController {
    userModule: UserModule;

    constructor(mongo: MongoModule) {
        this.userModule = new UserModule(mongo)
    }

    /** CREATE
     * Creates and adds an User document to the DB.
     * @param req : e.Request
     * has to contain an Object in its body that fulfils the requirements of the User Interface (see: user.model.ts)

     * @param res : e.Response
     * A HTTP-Response which will be send containing a status code, and,
     * if successful, the id of the newly created User document.
     */
    public async create(req: Request, res: Response): Promise<void> {
        const userName = req.body.name
        if (!userName || userName.trim() == "") {
            res.status(400).send("Username missing")
            return
        }
        let password = req.body.password
        if (!password || password.trim() == "") {
            res.status(400).send("Password missing")
            return
        }
        // hash password using argon2id algorithm and randomly set salt
        try {
            password = await argon2.hash(password)
        } catch (e){
            printToConsole("error while password hashing")
            res.status(500).send("internal Server Error. Something went wrong, we are sorry.")
            return
        }
        const description = req.body.description
        if (!description) {
            res.status(400).send("Description missing")
            return
        }
        const birthdate = req.body.birthdate
        if (!birthdate || !(typeof birthdate == 'string') || birthdate.trim() == "") {
            res.status(400).send("Birthdate missing")
            return
        }
        const email = req.body.email
        if (!email || email.trim() == "") {
            res.status(400).send("Password missing")
            return
        }
        let vehicleIds: Array<mongoose.Types.ObjectId> | undefined = undefined
        if (req.body.vehicles) {
            vehicleIds = req.body.vehicles
        }

        this.userModule.createUser(
            new UserClass(
                userName.trim(),
                new Date(birthdate.trim()),
                email.trim(),
                description,
                password.trim(),
                vehicleIds,
                undefined
            )
        ).then((id: mongoose.Types.ObjectId | null) => {
            if (id) {
                res.status(201).send(id)
            } else {
                res.sendStatus(500)
            }
        }).catch((err: Error) => {
            res.sendStatus(500)
            printToConsole(`Something went wrong adding an User in crud-action create.\nERROR: ${err}`)
        })
    }

    /** ALL
     * Finds all User documents in the DB and returns them
     * needs no further params or body
     * @param _req
     * @param res : e.Response
     * Returns a HTTP-Response containing a statuscode and, if successful, an array of all
     * Users saved in the DB in its body
     */
    public getAllUsers(_req: Request, res: Response): void {
        this.userModule.getAllUsers().then((users: User[]) => {
            res.status(200).send(users);
        }).catch((err: Error) => {
            res.sendStatus(500)
            printToConsole(`Something went wrong getting all users in crud-action read.\nERROR: ${err}`)
        })
    }



    /** GETBYNAME
     * Finds and returns an User doc
     * @param req : e.Request
     * HTTP-Request containing the id of the wanted User document in its params (in the URL)
     * @param res : e.Response
     * HTTP-Response containing a status code and if successful, the User in its body
     */
    public getByName(req: Request, res: Response): void {
        const userName = req.params.name
        if (!userName || userName == ""){
            res.status(400).send("Username missing")
            return
        }
        this.userModule.getUserByName(userName).then((user: User | null) => {
            if (user) {
                res.status(200).send(user)
            } else {
                res.sendStatus(500)
            }
        }).catch((err) => {
            res.sendStatus(500)
            printToConsole(err)
        })
    }

    //** GETUSERVEHICLES
    public async getUserVehicles(req: Request, res: Response): Promise<void>{
        const userId = req.session.singInId
        const user = await this.userModule.getUserById(userId)
        const vehicles = []
        if(user){
            for (const vehicleId in user.vehicles){
                const vehicle = await vehicleController.vehicleModule.findVehicleById(new mongoose.Types.ObjectId(vehicleId))
                vehicles.push(vehicle)
            }
            res.status(200).send(vehicles)
            return
        } else {
            res.sendStatus(404)
            return;
        }
    }

    /**
     * DELETE
     * deletes an user with an specific id from database
     * @param req
     * HTTP-Request containing the id of User document in the params (in the URL) (if sessions are used to identify the user
     * (eg in production, the id is ignored)
     * @param res
     * HTTP-Request containing a status code and if successful, the deleted user in its body
     */
    public async delete(req: Request, res: Response): Promise<void> {
        let user = undefined
        if(config.get('disableAuth') == "true"){
            user = await this.userModule.getUserById(req.params.id)
        } else {
            user = await this.userModule.getUserByName(req.session.signInName)
        }
        if (user?._id) {
            this.userModule.deleteUser(new mongoose.Types.ObjectId(user._id)).then((user: User | null) => {
                if (user) {
                    res.status(200).send(user);
                } else {
                    res.sendStatus(500);
                }
            })
        } else{
            res.sendStatus(500)
        }

    }

    /**
     * DELETENDUNLINK
     * deletes an user with an specific id from database
     * @param req
     * HTTP-Request containing the id of User document in the params (in the URL) (if sessions are used to identify the user
     * (eg in production, the id is ignored)
     * @param res
     * HTTP-Request containing a status code and if successful, the deleted user in its body
     */
    public async deleteAndUnlink(req: Request, res: Response): Promise<void> {
            this.userModule.deleteUser(req.session.singInId).then(async (user: User | null) => {
                if (user && user._id) {
                    for (const veh in user.vehicles) {
                        const vehicle: Vehicle | null = await vehicleController.vehicleModule.deleteVehicle(new mongoose.Types.ObjectId(veh))
                        // remove rides involving this vehicle
                        if (vehicle?._id) {
                            const rides = await rideController.rideModule.getRidesByVehicle(vehicle._id)
                            rideController.rideModule.deleteRidesByVehicle(vehicle?._id)
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
                        }
                    }
                    const reqs: Req[] = await requestController.requestModule.getByUser(user._id)
                        for (const req of reqs) {
                            if (req._id) {
                                requestController.requestModule.deleteRequest(req._id)
                                requestController.requestModule.unlinkRequestFromRides(req._id)
                            }
                        }

                        res.status(200).send(user);
                    } else {
                        res.sendStatus(500);
                    }
            })
    }

    /**
     * DELETE ALL USERS
     * deletes all users from database
     * @param req
     * @param res
     * HTTP-Response containing a status code an, if successful, all users, which were delete
     */
    public deleteAllUsers(res: Response): void {
        this.userModule.deleteAllUsers().then((users: User[] | null) => {
            if (users) {
                res.status(200).send(users);
            } else {
                res.sendStatus(500);
            }
        })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const password = req.body.password
        if (!password || password.trim() == "") {
            res.status(400).send("Password missing")
            return
        }
        const description = req.body.description
        if(!description) {
            res.status(400).send("Description missing")
            return
        }
        const birthdate = req.body.birthdate
        if (!birthdate || !(typeof birthdate == 'string') || birthdate.trim() == "") {
            res.status(400).send("Birthdate missing")
            return
        }
        const email = req.body.email
        if (!email || email.trim() == "") {
            res.status(400).send("Password missing")
            return
        }
        let newEval = 0;
        if(req.body.averageEvalOfRides){
            newEval = req.body.averageEvalOfRides
        }
        let vehicleIds: Array<mongoose.Types.ObjectId> | undefined = undefined
        if (req.body.vehicles) {
            vehicleIds = req.body.vehicles
        }
        let userName = undefined
        if(config.get('disableAuth') == "true"){
            userName = req.body.name
            if (!userName || userName.trim() == "") {
                res.status(400).send("Username missing")
                return
            }
        } else{
            userName = req.session.signInName
        }
        const user: User | null = await this.userModule.getUserByName(userName)
        let avgEval = 0;
        if( user?.averageEvalOfRides) {
            avgEval = user.averageEvalOfRides
        }
        if (user?._id) {
            const evalsN: number = await evaluationController.evaluationModule.findNumberOfEvaluationsByDriver(user._id)
            avgEval = ((avgEval * evalsN) + newEval) / (evalsN + 1)
        } else{
            res.status(500).send("Sure that is a valid user?")
        }
        if (user?._id) {
            this.userModule.updateUser(
                user?._id,
                new UserClass(
                    userName.trim(),
                    new Date(birthdate.trim()),
                    email.trim(),
                    description,
                    undefined,
                    vehicleIds,
                    avgEval
                )
            ).then((result: User | null) => {
                if (result) {
                    res.status(200).send(result)
                }
            }).catch((err: Error) => {
                res.sendStatus(500)
                printToConsole(`Something went wrong updating an User. \nERROR: ${err}`)
            })
        }
    }

}
