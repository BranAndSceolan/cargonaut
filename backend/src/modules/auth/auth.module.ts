import {NextFunction, Request, Response} from "express";
import {User, UserClass} from "../../models/user.model";
import {userController} from "../../controllers";
import mongoose from "mongoose";
import config from "config";
import argon2 from "argon2";
import {printToConsole} from "../util/util.module";

export class AuthModule {

    async register(req: Request, res: Response) {
//Check if username is already defined (from a previous session)
        const registerName: string = req.body.name.trim();
        let registerPass: string = req.body.password.trim();
        const registerBirthdate: string = req.body.birthdate.trim();
        const registerMail: string = req.body.email.trim()
        const registerDescription: string = req.body.description.trim()
        if (!registerName || !registerPass || !registerBirthdate || !registerDescription){
            return res.status(400).send("Not all aguments given!")
        }
        const user: User | null = await userController.userModule.getUserByName(registerName.trim())
        if (user?.name){
            return res.status(401).send("Name bereits vergeben!")
        }
        // hash password using argon2id algorithm and randomly set salt
        try {
            registerPass = await argon2.hash(registerPass)
        } catch (e){
            printToConsole("error while password hashing")
            res.status(500).send("internal Server Error. Something went wrong, we are sorry.")
            return
        }

        const newUser: null| mongoose.Types.ObjectId = await userController.userModule.createUser(
            new UserClass(
                registerName,
                new Date(registerBirthdate),
                registerMail,
                registerDescription,
                registerPass
            ))
        if (newUser){
            req.session.signInName = registerName;
            req.session.singInId = newUser._id;
            return res.status(200).send(newUser._id)
        } else {
           return res.status(500).send("Something went wrong registering!")
        }
    }

    async login(req: Request, res: Response) {
        const signInName: string = req.body.name;
        const signInPass: string = req.body.password;

        const user: User | null = await userController.userModule.getUserByName(signInName)
        if (!user?.password) {
            res.status(404);
            res.contentType("text/urilist");
            res.send("Your name or password seems to be wrong.");
            return
        }
        try {
            if (user._id && await argon2.verify(user.password, signInPass)) {
                // password match
                req.session.signInName = signInName;
                req.session.singInId = user._id;
                res.sendStatus(200);
            } else {
                // password did not match
                res.status(404);
                res.contentType("text/urilist");
                res.send("Your name or password seems to be wrong.");
                return
            }
        } catch (err) {
            // internal failure
            res.status(500).send("internal Error")
            return
        }
    }

    async getCurrent(req: Request, res: Response) {
        if (config.get('disableAuth') == "true") {
           res.status(400).send("only works if using sessions!")
        } else{
            const user : User | null = await userController.userModule.getUserByName(req.session.signInName)
            if(user) {
                if (user?.password) {
                    user.password = "******"
                }
                res.status(200).send(user)
            }else{
                res.sendStatus(404)
            }
        }
    }

    logOut(req: Request, res: Response): void {
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.sendStatus(200);
        });
    }

    checkLogin(req : Request, res: Response, next: NextFunction) {
        if (config.get('disableAuth') == "true") return next();
        if (req.session.signInName) {
            if (req.body.name && req.body.name != req.session.signInName){
                res.status(401)
            }else {
                next()
            }
        } else {
            res.status(401)
        }
    }

}