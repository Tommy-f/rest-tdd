import request from 'supertest';
import app from '../app';

// https://jestjs.io/docs/getting-started#using-babel

describe('Test example', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toEqual(200);
  });
});
