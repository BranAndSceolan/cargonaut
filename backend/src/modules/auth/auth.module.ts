import {Request, Response} from "express";
import {User, UserClass} from "../../models/user.model";
import {userController} from "../../controllers";
import mongoose from "mongoose";

// add "signInName" to session store
declare module "express-session" {
    interface Session {
        signInName: string;
    }
}


export class authModule {

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

        const newUser: null| mongoose.Types.ObjectId = await userController.userModule.createUser(new UserClass(registerName, new Date(registerBirthdate), registerMail, registerPass))
        if (newUser){
            req.session.signInName = registerName;
            res.status(200).send("Congratulations! You are know registered! \n" +
                "Whether driving for others or searching for a driver, cargonaut is always with you!")
        } else {
            res.status(500).send("Something went wrong registering!")
        }
    }

    async login(req: Request, res: Response) {

    }


}