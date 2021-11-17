import mongoose, { Document } from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import { seeder } from '../../src/database/seed.database';

describe('Test example', () => {
  beforeAll(async () => {
    await seeder();
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it('should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toEqual(200);
  });
  it('should return an array of documents', async () => {
    const response = await request(app).get('/api/users/');
    expect(response.body).toBeInstanceOf(Array);
  });
});
