import chaiHttp from "chai-http";
import chai from "chai";
import {app} from '../../index';
import {evaluationTest} from "./evaluation.test";
import {requestTest} from "./request.test";
import {rideTest} from "./ride.test";
import {userTest} from "./user.test";
import {vehicleTest} from "./vehicle.test";


chai.use(chaiHttp);

// Test base route to return string
describe('Base Route Test', () => {
    it(`should return a html file`, () => {
        return chai.request(app).get('/')
            .then(res  => {
                chai.expect(res).to.be.html
            })
    })
})

userTest()
evaluationTest()
requestTest()
rideTest()
vehicleTest()

