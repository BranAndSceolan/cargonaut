import chai from 'chai';
import chaiHttp from "chai-http";
import {vehicleType} from "../../models/vehicle.model";
import mongoose from "mongoose";
import request from "superagent";
import {randomInt} from "crypto";


chai.use(chaiHttp);
chai.expect;

export async function vehicleTest(agent: ChaiHttp.Agent) {

    let vehicleId: mongoose.Types.ObjectId;
    let userId: mongoose.Types.ObjectId;
    const userName = randomInt(0, 999999999) + "e"

    describe('Vehicle Route Tests', async () => {

        // Register user, so vehicle tests also work if auth active.

        it(`should return 200 and id of created user`, async () => {
            return await agent.post('/user/create').send({
                "name": userName,
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "123",
                "description": "Ich bin der Hans und ich kann's"
            }).then((res: request.Response) => {
                userId = res.body;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.equal(userId);
            })
        })

        // Create routes:

        it(`should return 201 and id of vehicle`, async () => {
            return await agent.post('/vehicle/create').send({
                "type": vehicleType.standardCar,
                "numberOfSeats": 2,
                "notes": "Smart"
            }).then((res: request.Response) => {
                vehicleId = res.body;
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body)
            })
        })

        // Create - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await agent.post('/vehicle/create').send({
                "type": "",
                "numberOfSeats": 2,
                "notes": "Smart"
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Read routes:

        it(`should return 200 and all vehicle`, async () => {
            return await agent.get('/vehicle/getAll')
                .then((res: request.Response) => {
                    chai.expect(res.status).to.equal(200);
                })
        })

        it(`should return 200 and the correct vehicle`, async () => {
            return await agent.get(`/vehicle/findById/${vehicleId}`)
                .then(async (res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(vehicleId);
            })
        })

        // Delete routes:

        it(`should return 200 and the deleted vehicle`, async () => {
            return await agent.delete(`/vehicle/delete/${vehicleId}`)
                .then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(vehicleId);
            })
        })

        // Delete TestUser, so there is no conflict in the next run:

        it(`should return 200 and the deleted user`, async () => {
            return await agent.delete(`/user/delete/${userId}`)
                .then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(userId);
            })
        })

    })
}

