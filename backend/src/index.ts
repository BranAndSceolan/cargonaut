import express from "express";
import {Application, Request, Response} from "express";
import * as path from "path";
import {PORT} from "./config/config.json";
import {MongoModule} from "./modules/mongo/mongo.module";
import config from "config";
import rateLimit from "express-rate-limit"
import * as crypto from "crypto";
import {
    evalRouter,
    rideRouter,
    requestRouter,
    userRouter,
    vehicleRouter
} from "./routes/index"
import session from "express-session";
import helmet from "helmet";
import mongoose from "mongoose";

const mongo: MongoModule = new MongoModule();
mongo.connectToMongo().then(mongoose => {
    console.log(`Connected to MongoDB at ${config.get('Database.mongoURL')}, database: ${mongoose.connection?.db.databaseName}\n`)
}).catch((err: never) => {
    console.log(`Error: Couldn't establish connection to MongoDB at ${config.get('Database.mongoURL')}`)
    console.log(`Is your Docker daemon running?`)
    console.log(`=> sudo systemctl start docker`)
    console.log(`Is your database running?`)
    console.log(`=> docker start cargonaut_mongo`)
    console.log(err)
    process.exit()
})

// add "signInName" to session store
declare module "express-session" {

    interface Session {
        signInName: string;
        singInId: mongoose.Types.ObjectId;
    }
}


// Boot express
export const app: Application = express();
app.use(express.urlencoded({extended: false}));
app.use(helmet())
const rateLimitOptions = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // Limit each IP to 60 requests per `window` (here, per 1 minute)
    standardHeaders: false, // Do not return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,
})

app.use(session({
    resave: true, // save session even if not modified
    saveUninitialized: true, // save session even if not used
    rolling: true, // forces cookie set on every response needed to set expiration
    secret: crypto.randomInt(0, 1000000).toString(), // encrypt session-id in cookie using "secret" as modifier
    name: "myawesomecookie", // name of the cookie set is set by the server
    //TODO: cookie: {secure: true} //enable this as soon as https-certificates are included and we use https for our messages
    // only then will this application be secure!
    cookie: {maxAge: 15*60*1000}
}));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.use(rateLimitOptions)

// Application routing
app.use('/user', userRouter)
app.use('/eval', evalRouter)
app.use('/ride', rideRouter)
app.use('/req', requestRouter)
app.use('/vehicle', vehicleRouter)


app.use(express.static(path.join(__dirname, "./public")))
app.get('/', (_req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, "./public/index.html"))
});

// Start server
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
