import express from "express";
import {Application, Request, Response} from "express";
import * as path from "path";
import {PORT} from "./config/config.json";
import {MongoModule} from "./modules/mongo/mongo.module";
import config from "config";

const mongo: MongoModule = new MongoModule();
mongo.connectToMongo().then(mongoose => {
    console.log(`Connected to MongoDB at ${config.get('Database.mongoURL')}, database: ${mongoose.connection.db.databaseName}\n`)
}).catch((err:any) => {
    console.log(`Error: Couldn't establish connection to MongoDB at ${config.get('Database.mongoURL')}`)
    console.log(`Is your Docker daemon running?`)
    console.log(`=> sudo systemctl start docker`)
    console.log(`Is your database running?`)
    console.log(`=> docker start mongodb`)
    console.log(err)
    process.exit()
})

// Boot express
const app: Application = express();


// Application routing
app.use('/', (_req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, "/public/index.html"))
});

// Start server
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));