import mongoose, { Document } from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import { seeder } from '../../src/database/seed.database';
import { IUser } from '../../src/interfaces/users.interface';

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
      const expected: IUser = { name: 'Jane', login: 'janeslogin' };
      expect(response.body).toEqual(expected);
    });
    it('should return 404 not found', async () => {
      const response = await request(app).get('/api/users/NotFound');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('Create a new user object', () => {
    beforeEach(async () => {
      await mongoose.connection.dropDatabase();
      await seeder();
    });

    it('should return 201', async () => {
      const response = await request(app)
        .post('/api/users/')
        .send({ name: 'Alex', login: 'alexlösenord' });

      expect(response.statusCode).toBe(201);
    });
    it('should have properties name and login', async () => {
      const response = await request(app)
        .post('/api/users/')
        .send({ name: 'Alex', login: 'alexlösenord' });

      expect(response.body.data).toHaveProperty('name', 'Alex');
      expect(response.body.data).toHaveProperty('login', 'alexlösenord');
    });
    it('should have a message response with the text "New user added!"', async () => {
      const response = await request(app)
        .post('/api/users/')
        .send({ name: 'Alex', login: 'alexlösenord' });

      expect(response.body.message).toBe('New user added!');
    });
    it('should return 409', async () => {
      const response = await request(app)
        .post('/api/users/')
        .send({ name: 'John', login: 'johnslogin' });

      expect(response.statusCode).toBe(409);
    });
    it('should return 400', async () => {
      const response = await request(app).post('/api/users/').send({});

      expect(response.statusCode).toBe(400);
    });
    it('should return 400', async () => {
      const response = await request(app)
        .post('/api/users/')
        .send({ name: 'Alex' });

      expect(response.statusCode).toBe(400);
    });

    describe('Delete a user', () => {
      it('should return 200', async () => {
        const response = await request(app).delete('/api/users/janeslogin');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User deleted!');
      });
      it('should return 404', async () => {
        const response = await request(app).delete('/api/users/jayslogin');
        expect(response.statusCode).toBe(404);
      });
    });
  });
});
