import {app} from '../../index';
import chai from 'chai';
import chaiHttp from 'chai-http'


chai.use(chaiHttp)

// Test base route to return string
describe('Base Route Test', () => {
    it(`should return "Welcome to the cargonaut-backend!"`, () => {
        return chai.request(app).get('/')
            .then(res => {
                chai.expect(res.text).to.equal("Welcome to the cargonaut-backend!")
            })
    })
})