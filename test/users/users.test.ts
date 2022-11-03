import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import shortid from 'shortid';
import mongoose from 'mongoose';

let postUserIdTest = '';

const postUserBody = {
    email: `testUser+${shortid.generate()}@gmail.com`,
    password: 'password'

}


describe('testing', () => {
    let request: supertest.SuperAgentTest;
    before(function () {
        request = supertest.agent(app);
    });
    after(function (done) {
        // shut down the Express.js server, close our MongoDB connection, then tell Mocha we're done:
        app.close(() => {
            mongoose.connection.close(done);
        });
    });
    describe('POST to /users', () => {
        it('Registers a user', (done) => {
            return request.post('/users',  );
            
        })
    })
})