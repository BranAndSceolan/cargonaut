import {Request, Response} from "express";
import {MongoModule} from "../modules/mongo/mongo.module";
import mongoose from "mongoose";
import {RequestModule} from "../modules/entities/request.module";
import {RequestClass, requestStatus, trackingStatus} from "../models/request.model";
import {printToConsole} from "../modules/util/util.module";

/**
 * Controller for all requests, providing all functionalities e.g. (create, read, update, delete)
 *     for the request router using methods of request module.
 */
export class RequestController {
    requestModule: RequestModule;


    constructor(mongo: MongoModule) {
        this.requestModule = new RequestModule(mongo);
    }

    /**
     * calls createRequest() method of RequestModule, to create a new request
     * @param req
     * @param res
     */
    public create(req: Request, res: Response): void {
        if (!(req.body && req.body.date && req.body.user)) {
            res.status(400).send("Bad Request")
        } else {
            let cargo = undefined
            if (req.body.cargo) {
                cargo = req.body.cargo
            }

            this.requestModule.createRequest(new RequestClass(requestStatus.pending, req.body.date, req.body.user, trackingStatus.pending, cargo)).then(result => {
                if (result) {
                    res.status(201).send(result);
                } else {
                    res.status(500).send("Internal Server Error (seems like the objects don't exist)")
                }
            });

        }
    }

    public createAndLinkToRide(req: Request, res: Response){
        printToConsole(req.body)
        if (!(req.body && req.body.date && req.body.ride)) {
            res.status(400).send("Bad Request")
        } else {
            let cargo = undefined
            if (req.body.cargo) {
                cargo = req.body.cargo
            }

            this.requestModule.createRequest(new RequestClass(requestStatus.pending, req.body.date, req.session.signInId, trackingStatus.pending, cargo)).then(async result => {
                let id
                if (result) {
                    try {
                      id = new mongoose.Types.ObjectId(req.body.ride)
                    } catch (e) {
                        printToConsole(e)
                        res.status(500).send("Internal Server Error (seems like the objects don't exist)")
                        return
                    }
                    await this.requestModule.addToRide(result._id, id)
                    res.status(201).send(result);
                } else {
                    res.status(500).send("Internal Server Error (seems like the objects don't exist)")
                }
            });

        }
    }

    public get(req: Request, res: Response) {
        let id
        try {
            id = new mongoose.Types.ObjectId(req.params.id)
        } catch (e) {
            printToConsole(e)
            res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            return
        }
        this.requestModule.findRequestById(id).then((result: any) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }

    /**
     *  get all requests
     * @param _req
     * @param res
     */
    public getAll(_req: Request, res: Response) {
        this.requestModule.geteAllRequests().then((result: any) => {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }

    /**
     * calls deleteRequest() method of evaluation.module, to delete a request specified by its id
     * @param req
     * @param res
     */
    public delete(req: Request, res: Response): void {
        let id
        try {
            id = new mongoose.Types.ObjectId(req.params.id)
        } catch (e) {
            printToConsole(e)
            res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            return
        }
        this.requestModule.deleteRequest(id).then((result: any) => {
            if (result) {
                res.status(200).send(result); //deleted Entity
            } else {
                res.status(500).send("Internal Server Error")
            }
        }).catch(() => res.status(500).send("Internal Server Error"));
    }


    /**
     * calls deleteRequest() method of evaluation.module, to delete a request specified by its id
     * @param req
     * @param res
     */
    public deleteAndUnlink(req: Request, res: Response): void {
        let id: mongoose.Types.ObjectId
        try {
            id = new mongoose.Types.ObjectId(req.params.id)
        } catch (e) {
            printToConsole(e)
            res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            return
        }
        if (! id){
            res.sendStatus(400)
            return
        }
        this.requestModule.deleteRequest(id).then(async (result: any) => {
            if (result) {
                printToConsole(result)
                await this.requestModule.unlinkRequestFromRide(id)
                res.status(200).send(result); //deleted Entity
            } else {
                printToConsole("No result!")
                res.status(500).send("Internal Server Error")
            }
        }).catch((e) => {
            printToConsole(e),
            res.status(500).send("Internal Server Error")
        });
    }

    public update(req: Request, res: Response): void {
        let id: mongoose.Types.ObjectId
        try {
            id = new mongoose.Types.ObjectId(req.params.id)
        } catch (e) {
            printToConsole(e)
            res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            return
        }
        if (req.body && req.body.date && req.session.signInId && id) {
            let status = undefined
            if (req.body.requestStatus) {
                status = req.body.requestStatus
            }
            let tStatus = undefined
            if (req.body.trackingStatus) {
                tStatus = req.body.trackingStatus
            }
            let cargo = undefined
            if (req.body.cargo) {
                cargo = req.body.cargo
            }
            this.requestModule.updateRequest(id, new RequestClass(status, req.body.date, req.session.signInId, tStatus, cargo)).then((result: any) => {
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(500).send("Internal Server Error");
                }
            }).catch(() => res.status(500).send("Internal Server Error"));
        } else {
            res.status(400).send("Bad Request")
        }
    }

    public async updateSafer(req: Request, res: Response): Promise<void> {
        let id: mongoose.Types.ObjectId
        try {
            id = new mongoose.Types.ObjectId(req.params.id)
        } catch (e) {
            printToConsole(e)
            res.status(500).send("Internal Server Error (seems like the objects don't exist)")
            return
        }
        if (req.body  && req.session.signInId && id) {
            let status = undefined
            if (req.body.requestStatus) {
                status = req.body.requestStatus
            }
            let tStatus = undefined
            if (req.body.trackingStatus) {
                tStatus = req.body.trackingStatus
            }
            let cargo = undefined
            if (req.body.cargo) {
                cargo = req.body.cargo
            }

            const request = await this.requestModule.findRequestById(id)
            if (request && request.user == req.session.signInId) {
                this.requestModule.updateRequest(id, new RequestClass(status, request.date, req.session.signInId, tStatus, cargo)).then((result: any) => {
                    if (result) {
                        res.status(200).send(result);
                    } else {
                        res.status(500).send("Internal Server Error");
                    }
                }).catch(() => res.status(500).send("Internal Server Error"));
            } else {
                res.sendStatus(401)
            }
        } else {
            res.status(400).send("Bad Request")
        }
    }
}
