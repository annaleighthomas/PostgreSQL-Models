import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Flower from '../lib/models/Flower.js';


describe('flower routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new flower using POST', async () => {
    const res = await request(app)
      .post('/api/v1/flowers')
      .send({ commonName: 'azalea', genus: 'rhododendron', type: 'shrub' });

    expect(res.body).toEqual({
      id: '1',
      commonName: 'azalea',
      genus: 'rhododendron',
      type: 'shrub' 
    });
  });

  it('retrieves a specific flower by id using GET', async () => {
    const flower = await Flower.createFlower({
      commonName: 'lily',
      genus: 'lilium',
      type: 'bulb'
    });
    const res = await request(app)
      .get(`/api/v1/flowers/${flower.id}`);

    expect(res.body).toEqual(flower);
  });

  it('retrieves all the flowers using GET', async () => {
    const azalea = await Flower.createFlower({
      commonName: 'azalea',
      genus: 'rhododendron',
      type: 'shrub' 
    });

    const lily = await Flower.createFlower({
      commonName: 'lily',
      genus: 'lilium',
      type: 'bulb'
    });

    const poppy = await Flower.createFlower({
      commonName: 'poppy',
      genus: 'papaver',
      type: 'vine'
    });

    const res = await request(app)
      .get('/api/v1/flowers');

    expect(res.body).toEqual([azalea, lily, poppy]);
  });

  it('updates a flower using PUT', async () => {
    const flower = await Flower.createFlower({
      commonName: 'poppy',
      genus: 'papaver',
      type: 'vine'
    });

    const res = await request(app)
      .put(`/api/v1/flowers/${flower.id}`)
      .send({ commonName: 'poppy', genus: 'papaver', type: 'shrub' });

    expect(res.body).toEqual({ id: '1', commonName: 'poppy', genus: 'papaver', type: 'shrub' });
  });

  it('deletes a flower using DELETE', async () => {
    const flower = await Flower.createFlower({
      commonName: 'poppy',
      genus: 'papaver',
      type: 'vine'
    });

    const res = await request(app)
      .delete(`/api/v1/flowers/${flower.id}`);

    expect(res.body).toEqual({ status: 'success', message: 'delete success' });
  });

});
