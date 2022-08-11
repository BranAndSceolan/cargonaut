import chai from "chai";
import chaiHttp from "chai-http";
import request from "superagent";
import {printToConsole} from "../../modules/util/util.module";
import mongoose from "mongoose";
import {vehicleType} from "../../models/vehicle.model";
import {requestStatus} from "../../models/request.model";
import {randomInt} from "crypto";

chai.use(chaiHttp);
chai.expect;

export async function newRoutesTest(agent: ChaiHttp.Agent) {

    let vehicleId1U0 : mongoose.Types.ObjectId
    let vehicleId0U0 : mongoose.Types.ObjectId
    let requestId: mongoose.Types.ObjectId
    let userId0 : mongoose.Types.ObjectId
    let userId1 : mongoose.Types.ObjectId
    let R2Id : mongoose.Types.ObjectId
    let R1Id : mongoose.Types.ObjectId
    let R0Id : mongoose.Types.ObjectId
    let evaluationId: mongoose.Types.ObjectId
    const userName0 = randomInt(0, 999999999) + "a"
    const userName1 = randomInt(0, 999999999) + "b"

    describe('new Routes Tests', async ()=> {
        // create two users
        it(`create 2 users `, async () => {
             await agent.post('/user/create').send({
                 "name": userName1,
                 "birthdate": "1-1-1901",
                 "email": "hans@aol.de",
                 "password": "123",
                 "description": "Ich bin der Hans und ich kann's"
             }).then((res: request.Response) => {
                 userId1 = res.body;
                 chai.expect(res.status).to.equal(200);
             })
             return await agent.post('/user/create').send({
                 "name": userName0,
                 "birthdate": "1-1-1901",
                 "email": "hans@aol.de",
                 "password": "123",
                 "description": "Ich bin der Hans und ich kann's"
             }).then((res: request.Response) => {
                 userId0 = res.body;
                 chai.expect(res.status).to.equal(200);
             })
        })

        // create two vehicles for user0
        it(`should return 201 and id of vehicle`, async () => {
            await agent.post('/vehicle/createAndLink').send({
                "type": vehicleType.standardCar,
                "numberOfSeats": 2,
                "notes": "Smart"
            }).then((res: request.Response) => {
                vehicleId0U0 = res.body;
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body)
            })
            return await agent.post('/vehicle/createAndLink').send({
                "type": vehicleType.bus,
                "numberOfSeats": 2,
                "notes": "Smart"
            }).then((res: request.Response) => {
                vehicleId1U0 = res.body;
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body)
            })
        })

        // create two rides for vehicle 0
        it (`should return 201 `, async () => {
            await agent.post('/ride/createAndLink').send({
                "date": "1-12-2022",
                "origin": "munich",
                "destination": "berlin",
                "title": "R0",
                "description": "We go from munich to berlin!",
                "numberOfFreeSeats": 4,
                "price": 20,
                "vehicle": vehicleId0U0,
                "pendingReqs": [],
                "accReqs": []
            }).then((res: request.Response) => {
                R0Id = res.body
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body).to.exist
            })
            return await agent.post('/ride/createAndLink').send({
                "date": "1-12-2022",
                "origin": "Test",
                "destination": "Test",
                "title": "R1",
                "description": "We go from Test to Test!",
                "numberOfFreeSeats": 4,
                "price": 20,
                "vehicle": vehicleId0U0,
                "pendingReqs": [],
                "accReqs": []
            }).then((res: request.Response) => {
                R1Id = res.body
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body).to.exist
            })
        })

        // create one ride for vehicle 1
        it (`should return 201 and id of vehicle`, async () => {
                return await agent.post('/ride/createAndLink').send({
                    "date": "1-12-2022",
                    "origin": "munich",
                    "destination": "berlin",
                    "title": "R2",
                    "description": "We go from munich to berlin!",
                    "numberOfFreeSeats": 4,
                    "price": 20,
                    "vehicle": vehicleId1U0,
                    "pendingReqs": [],
                    "accReqs": []
                }).then((res: request.Response) => {
                    R2Id = res.body
                    chai.expect(res.status).to.equal(201);
                    chai.expect(res.body).to.exist
                })
        })

        // make a Request as User1 for R0
        it(`should return 201 and id of created request`, async () => {
                await agent.post('/user/login').send({
                    "name": userName1,
                    "password": "123"
                }).then((res: request.Response) => {
                    printToConsole("Res: " + res.text)
                    chai.expect(res.status).to.equal(200);
                })
                await agent.post('/req/create').send({
                    "date": "6-23-2022",
                    "user": userId1,
                }).then((res: request.Response) => {
                    requestId = res.body;
                    chai.expect(res.status).to.equal(201);
                    chai.expect(res.body).to.equal(requestId);
                })
                await agent.put(`/ride/update/` + R0Id).send({
                    "date": "1-12-2022",
                    "origin": "munich",
                    "destination": "berlin",
                    "title": "R0",
                    "description": "We go from munich to berlin!",
                    "numberOfFreeSeats": 4,
                    "price": 20,
                    "vehicle": vehicleId0U0,
                    "pendingReqs": [requestId],
                    "accReqs": []
                }).then((res: request.Response) => {
                    chai.expect(res.status).to.equal(200);
                })
            return await agent.get("/ride/findById/"+R0Id).then((res1)=> {
                    chai.expect(res1.status).to.equal(200)
                    chai.expect(res1.body.pendingReqs).to.contain(requestId)
                }
            )
        })

        // evaluate R2 by User0 as User1
        it('should return 201 and eval id', async ()=> {
            return await agent.post('/eval/create').send({
                "result": 5,
                "ride": R2Id,
                "user": userId0
            }).then((res: request.Response) => {
                evaluationId = res.body;
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body).to.equal(evaluationId);
            })
        })

        // remove vehicle 0 check for R0 and req
        it ("remove vehicle 0 check for R0 and req", async ()=>{
            // login as user0
            await agent.post("/user/login").send(
                {
                    "name": userName0,
                    "password": "123"
                }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
            })
            const res = await agent.delete("/vehicle/deleteAndUnlink/"+ vehicleId0U0)
            printToConsole("delete and unlink result "+res.text)
            chai.expect(res.status).to.equal(200)
            // is the vehicle gone?
            await agent.get(`/vehicle/findById/`+vehicleId0U0)
                .then(async (res: request.Response) => {
                    chai.expect(res.status).to.equal(500);
                })
            // is R0 gone?
            agent.get("/ride/findById/"+ R0Id).then((res:request.Response)=>{
                chai.expect(res.status).to.equal(500)
            })

            // is R1 gone?
            agent.get("/ride/findById/"+ R1Id).then((res:request.Response)=>{
                chai.expect(res.status).to.equal(500)
            })

            // is Req status ride deleted?
            agent.get("/req/findById/"+ requestId).then((res:request.Response)=>{
                chai.expect(res.status).to.equal(200)
                chai.expect(res.body.requestStatus).to.equal(requestStatus.rideDeleted)
            })
        })

        // remove user0 check for v1 r2 and eval
        it('should remove user 0, v1 r2 and eval', async ()=> {
            agent.delete("/user/deleteAndUnlink/"+ userId0).then( async (res: request.Response)=>{
                chai.expect(res.status).to.equal(200)
                const resV1 = await agent.get("/vehicle/findById/"+ vehicleId1U0)
                chai.expect(resV1.status).to.equal(500)
                const resR2 = await agent.get("/ride/findById/"+ R2Id)
                chai.expect(resR2).to.equal(500)
                const resEval = await agent.get("/eval/findByid/"+ evaluationId)
                chai.expect(resEval).to.equal(500)
            })
        });
    })

}