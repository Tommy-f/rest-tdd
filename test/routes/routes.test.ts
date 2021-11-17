import mongoose, { Document } from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import { seeder } from '../../src/database/seed.database';

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
      const response = await request(app).get('/users/');
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
