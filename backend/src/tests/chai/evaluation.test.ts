import chai from 'chai';
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import {vehicleType} from "../../models/vehicle.model";
import request from "superagent";


chai.use(chaiHttp);
chai.expect;

export async function evaluationTest(agent: ChaiHttp.Agent) {

    let userId: mongoose.Types.ObjectId;
    let rideId: mongoose.Types.ObjectId;
    let evaluationId: mongoose.Types.ObjectId;
    let vehicleId: mongoose.Types.ObjectId;


    describe('Evaluation Route Tests', async () => {

        // Create routes:

        // Create with a single reference to a ride and a user

        it(`Prepares for tests. Should return 201 and id of created evaluation`, async () => {
            await agent.post('/user/create').send({
                "name": "Viktor",
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "123",
                "description": "foo"
            }).then((res: request.Response) => {
                userId = res.body;
            })
            await agent.post('/vehicle/create').send({
                "type": vehicleType.standardCar,
                "numberOfSeats": 2,
                "notes": "Smart"
            }).then((res: request.Response) => {
                vehicleId = res.body;
            })
            await agent.post('/ride/create').send({
                "date": "1-12-2022",
                "origin": "munich",
                "destination": "berlin",
                "title": "nice ride",
                "description": "We go from munich to berlin!",
                "numberOfFreeSeats": 4,
                "price": 20,
                "user": userId,
                "vehicle": vehicleId,
                "pendingReqs" : [],
                "accReqs": []
            }).then((res: request.Response) => {
                rideId = res.body;
            })
            return await agent.post('/eval/create').send({
                "result": 5,
                "ride": rideId,
                "user": userId
            }).then((res: request.Response) => {
                evaluationId = res.body;
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body).to.equal(evaluationId);
            })
        })

        //    // Create - Bad Request due to empty field.
//
        it(`should return 400 and text 'Bad Request'`, async () => {
            return await agent.post('/eval/create').send({
                "result": 5,
                "ride": rideId,
                "user": ""
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Create - Bad Request due to result value out of range (upper limit).

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await agent.post('/eval/create').send({
                "result": 6,
                "ride": rideId,
                "user": userId
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Create - Bad Request due to result value out of range (lower limit).

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await agent.post('/eval/create').send({
                "result": -2,
                "ride": rideId,
                "user": userId
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Read routes:
        it(`should return 200 and all evaluations`, async () => {
            return await agent.get('/eval/getAll').then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
            })
        })

        it(`should return 200 and the correct evaluation`, async () => {
            return await agent.get(`/eval/findById/${evaluationId}`).then(async (res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(evaluationId);
            })
        })

        // Delete routes:

        it(`should return 200 and the deleted evaluation`, async () => {
            return await agent.delete(`/eval/delete/${evaluationId}`).then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(evaluationId);
            })
        })

        it('ride deletion\n', async () => {
            return await agent.delete(`/ride/delete/${rideId}`).then((res: request.Response) => {
                chai.expect(res.status).to.equal(200)
                chai.expect(res.body._id).to.equal(`${rideId}`)
            });
        })

        it('user deletion\n', async () => {
            return await agent.delete(`/user/delete/${userId}`).then((res: request.Response) => {
                chai.expect(res.status).to.equal(200)
                chai.expect(res.body._id).to.equal(`${userId}`)
            });
        })

    })
}
