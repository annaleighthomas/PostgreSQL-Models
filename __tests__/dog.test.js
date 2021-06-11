import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Dog from '../lib/models/Dog.js';


describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a dog using POST', async () => {
    const res = await request(app)
      .post('/api/v1/dogs')
      .send({ name: 'cherry', age: 4, weight: '8lbs' });

    expect(res.body).toEqual({
      id: '1',
      name: 'cherry',
      age: 4,
      weight: '8lbs',
    });
  });

  it('retrieves a specific dog by id using GET', async () => {
    const dog = await Dog.createDog({
      name: 'lemon',
      age: 9,
      weight: '13lbs'
    });

    const res = await request(app)
      .get(`/api/v1/dogs/${dog.id}`);

    expect(res.body).toEqual(dog);
  });

  it('retrieves all that dogs using GET', async () => {
    const cherry = await Dog.createDog({
      name: 'cherry',
      age: 4,
      weight: '8lbs',
    });

    const lemon = await Dog.createDog({
      name: 'lemon',
      age: 9,
      weight: '13lbs'
    });

    const grape = await Dog.createDog({
      name: 'grape',
      age: 5,
      weight: '7lbs',
    });

    const res = await request(app)
      .get('/api/v1/dogs');

    expect(res.body).toEqual([cherry, lemon, grape]);
  });

  it('updates a dog using PUT', async () => {
    const dog = await Dog.createDog({
      name: 'grape',
      age: 5,
      weight: '7lbs',
    });
    
    const res = await request(app)
      .put(`/api/v1/dogs/${dog.id}`)
      .send({ name: 'grape', age: 6, weight: '10lbs' });

    expect(res.body).toEqual({ id: '1', name: 'grape', age: 6, weight: '10lbs' });
  });

  it('deletes a dog using DELETE', async () => {
    const dog = await Dog.createDog({
      name: 'grape',
      age: 5,
      weight: '7lbs',
    });
    
    const res = await request(app)
      .delete(`/api/v1/dogs/${dog.id}`);

    expect(res.body).toEqual({ status: 'success', message: 'delete success' });
  });

});
