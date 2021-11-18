import mongoose, { Document } from 'mongoose';
import supertest from 'supertest'
import request from 'supertest';
import app from '../../src/app';
import { seeder } from '../../src/database/seed.database';
import * as userController from '../../src/controllers/user.controller'


export const userPayload = {
  // _id: 1,
  name: 'Erik',
  login: 'ErikLogin'
}

const userInput = {
  id: 1,
  name: "Erik",
  login: "ErikLogin"
}


describe('Test user endpoints', () => {
  beforeAll(async () => {
    await seeder();
  });
  afterAll(async () => {
    mongoose.connection.close();
  });

  describe('Test endpoint', () => {
    it('should return 200', async () => {
      const response = await request(app).get('/api/me');
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('Get all users', () => {
    it('should return an array of documents', async () => {
      const response = await request(app).get('/api/users/');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('Get a specific user from id', () => {
    it('should return a user document from an id', async () => {
      const response = await request(app).get('/api/users/2');
      // const expected = response.body as IUser;
      const expected = response.body;
      const actual = { _id: 2, name: 'Jane', login: 'janeslogin' };
      expect(actual).toMatchObject(expected);
    });
  });
  describe('User registration', () => {
    describe('given the username and password are valid', () => {
      it('should return the user payload', async () => {
        const createUserServiceMock = jest
          .spyOn(userController, 'createUser')

          .mockRejectedValueOnce(userPayload)

        const { statusCode, body } = await supertest(app)
          .post('/users')
          .send(userInput)

        expect(statusCode).toBe(200)

        expect(body).toEqual(userPayload)

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
      })
    })
  })
});


