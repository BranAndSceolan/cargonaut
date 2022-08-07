import chai from 'chai';
import chaiHttp from "chai-http";
import * as mongoose from "mongoose";
import {printToConsole} from "../../modules/util/util.module";
import request from "superagent";


chai.use(chaiHttp);
chai.expect;

export async function userTest(agent: ChaiHttp.Agent) {

    let userId: mongoose.Types.ObjectId;
    const userName = "Ferdinand"; // configure user name for tests here!

    describe('User Route Tests', async () => {

        // Create routes:

        // Register

        it(`should return 200 and id of created user`, async () => {
            return await agent.post('/user/create').send({
                "name": userName,
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "123",
                "description": "Ich bin der Hans und ich kann's"
            }).then((res : request.Response)=> {
                printToConsole(typeof res)
                userId = res.body;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.equal(userId);
            })
        })

        // Create - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await agent.post('/user/create').send({
                "name": "",
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "123",
                "description": "Ich bin der Hans und ich kann's"
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Login

        it(`login should return 200`, async () => {
            return await agent.post('/user/login').send({
                "name": userName,
                "password": "123"
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
            })
        })

        // Read routes:

        it(`should return 200 and all user`, async () => {
            return await agent.get('/user/getAll').then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
            })
        })

        it(`should return 200 and the correct user`, async () => {
            return await agent.get(`/user/getByName/`+userName).then(async (res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(userId);
            })
        })

        // Update routes:

        it(`should return 200 and the updated user`, async () => {
            return await agent.post(`/user/update/${userId}`).send({
                "name": userName,
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "123",
                "description": "Ich bin der Hans und ich kann's",
                "averageEvalOfRides": 0
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(userId);
            })
        })

        // Update - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await agent.post(`/user/update/${userId}`).send({
                "name": userName,
                "birthdate": "1-1-1901",
                "email": "",
                "password": "123",
                "description": "Ich bin der Hans und ich kann's",
                "averageEvalOfRides": 0
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Delete routes:

        it(`should return 200 and the deleted user`, async () => {
            return await agent.delete(`/user/delete/${userId}`).then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(userId);
            })
        })

    })

}

