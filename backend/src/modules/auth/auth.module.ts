import {NextFunction, Request, Response} from "express";
import {User, UserClass} from "../../models/user.model";
import {userController} from "../../controllers";
import mongoose from "mongoose";
import config from "config";


export class AuthModule {

    async register(req: Request, res: Response) {
//Check if username is already defined (from a previous session)
        const registerName: string = req.body.registerName.trim();
        const registerPass: string = req.body.registerPass.trim();
        const registerBirthdate: string = req.body.registerBirthdate.trim();
        const registerMail: string = req.body.registerMail.trim()
        if (!registerName || !registerPass || !registerBirthdate){
            return res.status(400).send("Not all aguments given!")
        }
        const user: User | null = await userController.userModule.getUserByName(registerName.trim())
        if (user?.name){
            return res.status(401).send("Name bereits vergeben!")
        }

        const newUser: null| mongoose.Types.ObjectId = await userController.userModule.createUser(
            new UserClass(
                registerName,
                new Date(registerBirthdate),
                registerMail,
                registerPass
            ))
        if (newUser){
            req.session.signInName = registerName;
            return res.status(200).send("Congratulations! You are know registered! \n" +
                "Whether driving for others or searching for a driver, cargonaut is always with you!")
        } else {
           return res.status(500).send("Something went wrong registering!")
        }
    }

    async login(req: Request, res: Response) {
        const signInName: string = req.body.signInName.toString().trim();
        const signInPass: string = req.body.signInPass.trim();

        const user : User | null = await userController.userModule.getUserByName(signInName)
        if (user && signInPass == user.password) {
            req.session.signInName = signInName;
            res.sendStatus(200);
        } else {
            res.status(404);
            res.contentType("text/urilist");
            res.send("Your name or password seem to be wrong.");
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