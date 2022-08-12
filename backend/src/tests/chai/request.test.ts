import chai from 'chai';
import chaiHttp from "chai-http";
import {requestStatus, trackingStatus} from "../../models/request.model";
import mongoose from "mongoose";
import request from "superagent";
import {randomInt} from "crypto";


chai.use(chaiHttp);
chai.expect;

export async function requestTest(agent: ChaiHttp.Agent) {

    let userId: mongoose.Types.ObjectId;
    let requestId: mongoose.Types.ObjectId;
    let userName = randomInt(0, 9999999999) + "C"

    describe('Request Route Tests', async () => {

        // Create routes:

        // Create with a single reference to a ride and a user

        it(`should return 201 and id of created request`, async () => {
            await agent.post('/user/create').send({
                "name": userName,
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "123",
                "description": "Ich bin der Hans und ich kann's"
            }).then((res: request.Response) => {
                userId = res.body;
            })
            return await agent.post('/req/create').send({
                "date": "6-23-2022",
                "user": userId,
            }).then((res: request.Response) => {
                requestId = res.body;
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body).to.equal(requestId);
            })
        })

        // Create - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await agent.post('/req/create').send({
                "date": "",
                "user": userId,
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Read routes:

        it(`should return 200 and all requests`, async () => {
            return await agent.get('/req/getAll').then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
            })
        })

        it(`should return 200 and the correct request`, async () => {
            return await agent.get(`/req/findById/${requestId}`).then(async (res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(requestId);
            })
        })

        // Update routes:

        it(`should return 200 and the updated request`, async () => {
            return await agent.post(`/req/update/${requestId}`).send({
                "requestStatus": requestStatus.pending,
                "date": "6-23-2022",
                "user": userId,
                "trackingStatus": trackingStatus.departed
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(requestId);
            })
        })

        // Update - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await agent.post(`/req/update/${requestId}`).send({
                "date": "",
                "user": userId,
                "trackingStatus": trackingStatus.departed
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Delete routes:

        it(`should return 200 and the deleted request`, async () => {
            return await agent.delete(`/req/delete/${requestId}`).then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(requestId);
            })
        })

        it('user deletion\n', async () => {
            return await agent.delete(`/user/delete/${userId}`).then((res: request.Response) => {
                chai.expect(res.status).to.equal(200)
                chai.expect(res.body._id).to.equal(`${userId}`)
            });
        })
    })
}

