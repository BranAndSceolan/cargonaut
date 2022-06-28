import {NextFunction, Request, Response} from "express";
import {User, UserClass} from "../../models/user.model";
import {userController} from "../../controllers";
import mongoose from "mongoose";
import config from "config";


export class AuthModule {

    async register(req: Request, res: Response) {
//Check if username is already defined (from a previous session)
        const registerName: string = req.body.name
        const registerPass: string = req.body.password
        const registerBirthdate: string = req.body.birthdate
        const registerMail: string = req.body.email
        const registerDescription: string = req.body.description
        if (!registerName || !registerPass || !registerBirthdate || !registerDescription){
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
                registerPass,
                registerDescription
            ))
        if (newUser){
            if (config.get('disableAuth') == "true") {
                return res.status(200).send(newUser._id)
            } else{
                req.session.signInName = registerName;
                return res.status(200).send("Congratulations! You are know registered! \n" +
                    "Whether driving for others or searching for a driver, cargonaut is always with you!")
            }

        } else {
           return res.status(500).send("Something went wrong registering!")
        }
    }

    async login(req: Request, res: Response) {
        const signInName: string = req.body.name;
        const signInPass: string = req.body.password;

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

    checkLogin(req : Request, res: Response, next: NextFunction): void {
        if (config.get('disableAuth') == "true") {
            next();
            return;
        }
        if (req.session.signInName) {
            next();
            return;
        } else {
            res.sendStatus(401)
        }
    }

}