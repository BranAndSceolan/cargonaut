import chaiHttp from "chai-http";
import chai from "chai";
import {app} from '../../index';
import {evaluationTest} from "./evaluation.test";
import {requestTest} from "./request.test";
import {rideTest} from "./ride.test";
import {userTest} from "./user.test";
import {vehicleTest} from "./vehicle.test";


chai.use(chaiHttp);

const agent = chai.request.agent(app)

// Test base route to return string
describe('Base Route Test', () => {
    it(`should return a html file`, () => {
        return agent.get('/')
            .then(res  => {
                chai.expect(res).to.be.html
            })
    })
})

describe('other tests', ()=>{
    userTest(agent)
    requestTest(agent)
    rideTest(agent)
    vehicleTest(agent)
    evaluationTest(agent)
})

