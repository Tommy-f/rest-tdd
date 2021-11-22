import mongoose, { Document } from 'mongoose';
import supertest from 'supertest';
import request from 'supertest';
import app from '../../src/app';
import { seeder } from '../../src/database/seed.database';
import * as userController from '../../src/controllers/users.controller';

export const userPayload = {
  name: 'Erik',
  login: 'ErikLogin',
};

const userInput = {
  name: 'Erik',
  login: 'ErikLogin',
};

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
      const response = await request(app).get('/api/users/janeslogin');
      const { name, login } = response.body.data;
      const expected = { name: name, login: login };
      const actual = { name: 'Jane', login: 'janeslogin' };
      expect(actual).toMatchObject(expected);
    });
  });
  describe('User registration', () => {
    describe('given the username and password are valid', () => {
      it('should return the user payload', async () => {
        const createUserServiceMock = jest
          .spyOn(userController, 'createUser')
          .mockRejectedValueOnce(userPayload);

        const { statusCode, body } = await request(app)
          .post('/api/users')
          .send(userInput);

        expect(statusCode).toBe(201);

        expect(body).toEqual(userPayload);

        // expect(body).toMatchObject(userPayload);

        // createUserServiceMock.mockRestore();

        // expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });
  });
});
