import * as supertest from 'supertest'
import { app } from '../app'

describe('GET /', function () {
    it('200', function () {
        return supertest(app)
            .get('/')
            .expect(200, {
                text: 'str',
            });
    });
});