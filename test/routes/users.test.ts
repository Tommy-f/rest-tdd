import mongoose, { Document } from 'mongoose';
// import supertest from 'supertest';
import request from 'supertest';
import app from '../../src/app';
import { seeder } from '../../src/database/seed.database';
import { IUser } from '../../src/interfaces/users.interface';
// import * as userController from '../../src/controllers/users.controller';

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
  describe('Look up a non existing user', () => {
    it('should return a 404', async () => {
      const response = await request(app).get('/api/users/NoUser');
      expect(response.statusCode).toBe(404)
    });
  });
  describe('Get a specific user from id', () => {
    it('should return a user document from an id', async () => {
      const response = await request(app).get('/api/users/janeslogin');
      const expected: IUser = { name: 'Jane', login: 'janeslogin' }

      expect(response.body).toEqual(expected)
    });
  });
});
