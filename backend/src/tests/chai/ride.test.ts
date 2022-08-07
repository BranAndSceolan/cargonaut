import chai from 'chai';
import chaiHttp from "chai-http";
import * as mongoose from "mongoose";
import request from "superagent";


chai.use(chaiHttp);
chai.expect;

export async function rideTest(agent : ChaiHttp.Agent) {

    let userId: mongoose.Types.ObjectId;
    let vehicleId: mongoose.Types.ObjectId;
    let rideId: mongoose.Types.ObjectId;

    describe('Ride Route Tests', async () => {

        // Create routes:

        // Create with a single reference to a ride and a user

        it(`prepares test`, async () => {
            await agent.post('/user/create').send({
                "name": "Achmed",
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "",
                "description": "Hallo ich bin der Hans"
            }).then((res: request.Response) => {
                userId = res.body;
            })
            await agent.post('/vehicle/create').send({
                "type": "standard car",
                "numberOfSeats": 4,
                "notes": "looks ugly, but moves"
            }).then((res: request.Response) => {
                vehicleId = res.body;
            })
            return await agent.post('/ride/create').send({
                "date": "1-12-2022",
                "origin": "munich",
                "destination": "berlin",
                "title": "nice ride",
                "description": "We go from munich to berlin!",
                "numberOfFreeSeats": 4,
                "price": 20,
                "user": userId,
                "vehicle": vehicleId,
                "pendingReqs": [],
                "accReqs": []
            }).then((res: request.Response) => {
                rideId = res.body;
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body)
            })
        })

        // Create - Bad Request due to empty field .

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await agent.post('/ride/create').send({
                "date": "6-23-2022",
                "origin": "",
                "destination": "Hattersheim",
                "title": "Titel",
                "vehicle": vehicleId,
                "description": "Off we go",
                "numberOfFreeSeats": 4,
                "user": userId
            }).then(res => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Read routes:

        it(`should return 200 and all rides`, async () => {
            return await agent.get('/ride/getAll').then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
            })
        })

        it(`should return 200 and the correct rides`, async () => {
            return await agent.get(`/ride/findById/${rideId}`).then(async (res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(rideId);
            })
        })

        // Update routes:

        it(`should return 200 and the updated item`, async () => {
            return await agent.post(`/ride/update/${rideId}`).send({
                "date": "6-23-2022",
                "origin": "Seligenstadt",
                "destination": "Hattersheim",
                "title": "Titel",
                "price": 40,
                "description": "Off we go",
                "vehicle": vehicleId,
                "numberOfFreeSeats": 4,
                "user": userId
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(rideId);
            })
        })

        // Update - Bad Request due to empty field.

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await agent.post(`/ride/update/${rideId}`).send({
                "date": "",
                "origin": "Seligenstadt",
                "destination": "Hattersheim",
                "title": "Titel",
                "description": "Off we go",
                "vehicle": vehicleId,
                "numberOfFreeSeats": 4,
                "user": userId
            }).then((res: request.Response) => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Delete routes:

        it(`should return 200 and the deleted ride`, async () => {
            return await agent.delete(`/ride/delete/${rideId}`).then((res: request.Response) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(rideId);
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

