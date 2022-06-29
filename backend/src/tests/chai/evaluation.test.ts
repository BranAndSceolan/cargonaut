import {app} from '../../index';
import chai from 'chai';
import chaiHttp from "chai-http";
import {printToConsole} from "../../modules/util/util.module";
import mongoose from "mongoose";
import {vehicleType} from "../../models/vehicle.model";


chai.use(chaiHttp);
chai.expect;

export async function evaluationTest() {

    let userId: mongoose.Types.ObjectId;
    let rideId: mongoose.Types.ObjectId;
    let evaluationId: mongoose.Types.ObjectId;
    let vehicleId: mongoose.Types.ObjectId;


    describe('Evaluation Route Tests', async () => {

        // Create routes:

        // Create with a single reference to a ride and a user

        it(`should return 201 and id of created evluation`, async () => {
            await chai.request(app).post('/user/create').send({
                "name": "Viktor",
                "birthdate": "1-1-1901",
                "email": "hans@aol.de",
                "password": "123",
                "description": "foo"
            }).then(res => {
                userId = res.body;
            })
            await chai.request(app).post('/vehicle/create').send({
                "type": vehicleType.standardCar,
                "numberOfSeats": 2,
                "notes": "Smart"
            }).then(res => {
                vehicleId = res.body;
            })
            await chai.request(app).post('/ride/create').send({
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
            }).then(res => {
                console.log(rideId)
                rideId = res.body;
            })
            return await chai.request(app).post('/eval/create').send({
                "result": 5,
                "ride": rideId,
                "user": userId
            }).then(res => {
                evaluationId = res.body;
                console.log("evaluationId: " + evaluationId + "\n");
                chai.expect(res.status).to.equal(201);
                chai.expect(res.body).to.equal(evaluationId);
            })
        })

        //    // Create - Bad Request due to empty field.
//
        it(`should return 400 and text 'Bad Request'`, async () => {
            return await chai.request(app).post('/eval/create').send({
                "result": 5,
                "ride": rideId,
                "user": ""
            }).then(res => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Create - Bad Request due to result value out of range (upper limit).

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await chai.request(app).post('/eval/create').send({
                "result": 6,
                "ride": rideId,
                "user": userId
            }).then(res => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Create - Bad Request due to result value out of range (lower limit).

        it(`should return 400 and text 'Bad Request'`, async () => {
            return await chai.request(app).post('/eval/create').send({
                "result": -2,
                "ride": rideId,
                "user": userId
            }).then(res => {
                chai.expect(res.status).to.equal(400);
            })
        })

        // Read routes:
        it(`should return 200 and all evaluations`, async () => {
            return await chai.request(app).get('/eval/getAll').then(res => {
                chai.expect(res.status).to.equal(200);
            })
        })

        it(`should return 200 and the correct evaluation`, async () => {
            return await chai.request(app).get(`/eval/findById/${evaluationId}`).then(async res => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(evaluationId);
            })
        })


        // Delete routes:

        it(`should return 200 and the deleted evaluation`, async () => {
            return await chai.request(app).delete(`/eval/delete/${evaluationId}`).then(res => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body._id).to.equal(evaluationId);
            })
        })

        it('ride deletion\n', async () => {
            return await chai.request(app).delete(`/ride/delete/${rideId}`).then(res => {
                chai.expect(res.status).to.equal(200)
                chai.expect(res.body._id).to.equal(`${rideId}`)
            });
        })

        it('user deletion\n', async () => {
            printToConsole(userId)
            return await chai.request(app).delete(`/user/delete/${userId}`).then(res => {
                chai.expect(res.status).to.equal(200)
                chai.expect(res.body._id).to.equal(`${userId}`)
            });
        })
    })
}
