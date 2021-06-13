import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Fruit from '../lib/models/Fruit.js';


describe('fruit routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a fruit using POST', async () => {
    const res = await request(app)
      .post('/api/v1/fruits')
      .send({ name: 'apple', color: 'red' });

    expect(res.body).toEqual({
      id: '1',
      name: 'apple',
      color: 'red'
    });
  });

  it('retrieves a specific fruit by id using GET', async () => {
    const fruit = await Fruit.createFruit({
      name: 'lemon',
      color: 'yellow'
    });

    const res = await request(app)
      .get(`/api/v1/fruits/${fruit.id}`);

    expect(res.body).toEqual(fruit);
  });

  it('retrieves all that fruits using GET', async () => {
    const cherry = await Fruit.createFruit({
      name: 'cherry',
      color: 'red'
    });

    const lemon = await Fruit.createFruit({
      name: 'lemon',
      color: 'yellow'
    });

    const apple = await Fruit.createFruit({
      name: 'apple',
      color: 'red'
    });

    const res = await request(app)
      .get('/api/v1/fruits');

    expect(res.body).toEqual([cherry, lemon, apple]);
  });

  it('updates a fruit using PUT', async () => {
    const fruit = await Fruit.createFruit({
      name: 'apple',
      color: 'red'
    });
    
    const res = await request(app)
      .put(`/api/v1/fruits/${fruit.id}`)
      .send({ name: 'apple', color: 'green' });

    expect(res.body).toEqual({ id: '1', name: 'apple', color: 'green' });
  });

  it('deletes a fruit using DELETE', async () => {
    const fruit = await Fruit.createFruit({
      name: 'apple',
      color: 'red'
    });
    
    const res = await request(app)
      .delete(`/api/v1/fruits/${fruit.id}`);

    expect(res.body).toEqual({ status: 'success', message: 'delete success' });
  });

});
