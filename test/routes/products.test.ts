import request from 'supertest';
import app from '../../src/app';
// import IProduct from '../../src/interfaces/products.interface';

describe('Test user endpoints', () => {
  describe('Test endpoint', () => {
    it('should return 200', async () => {
      const response = await request(app).get('/api/me');
      expect(response.statusCode).toEqual(200);
    });
  });
});
