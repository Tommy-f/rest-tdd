import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import { IProduct } from '../../src/interfaces/products.interface';
import { seeder } from '../../src/database/seed.database';

describe('Test product endpoints', () => {
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

  describe('Get all products', () => {
    it('should return 200', async () => {
      const response = await request(app).get('/api/products');
      expect(response.statusCode).toEqual(200);
    });

    it('should be an array', async () => {
      const response = await request(app).get('/api/products');
      expect(response.body).toBeInstanceOf(Array);
    });

    describe('Get product by id', () => {
      it('should return 200', async () => {
        const response = await request(app).get('/api/products/p1');
        expect(response.statusCode).toEqual(200);
      });
    });

    it('should return 204 if no products was found', async () => {
      await mongoose.connection.dropDatabase();
      const response = await request(app).get('/api/products');
      expect(response.statusCode).toEqual(204);
    });
  });
  it('adds a Product to the database', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({ id: "4", name: 'Product 4', price: 399 })

    expect(response.statusCode).toBe(201)
  });
});
