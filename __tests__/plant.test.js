import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Plant from '../lib/models/Plant.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('creates a plant using POST', async () => {
    const res = await request(app)
      .post('/api/v1/plants')
      .send({ name: 'monstera', type: 'vine', sun: 'part-shade' });

    expect(res.body).toEqual({
      id: '1',
      name: 'monstera',
      type: 'vine',
      sun: 'part-shade'
    });
  });

  it('retrieves a specific plant by id using GET', async () => {
    const plant = await Plant.createPlant({
      name: 'elephant ear',
      type: 'bulb',
      sun: 'full sun'
    });

    const res = await request(app)
      .get(`/api/v1/plants/${plant.id}`);

    expect(res.body).toEqual(plant);
  });

  it('retrieves all the plants using GET', async () => {
    const monstera = await Plant.createPlant({
      name: 'monstera',
      type: 'vine',
      sun: 'part-shade'
    });

    const elephantEar = await Plant.createPlant({ 
      name: 'elephant ear',
      type: 'bulb',
      sun: 'full sun'
    });

    const goldenPothos = await Plant.createPlant({
      name: 'golden pothos',
      type: 'vine',
      sun: 'part-shade'
    });

    const res = await request(app)
      .get('/api/v1/plants');

    expect(res.body).toEqual([monstera, elephantEar, goldenPothos]);
  });

  it('updates a plant using PUT', async () => {
    const plant = await Plant.createPlant({
      name: 'golden pothos',
      type: 'vine',
      sun: 'part-shade'
    });

    const res = await request(app)
      .put(`/api/v1/plants/${plant.id}`)
      .send({ name: 'pothos', type: 'vine', sun: 'part shade' });

    expect(res.body).toEqual({ id: '1', name: 'pothos', type: 'vine', sun: 'part shade' });
  });

  it('deletes a plant using DELETE', async () => {
    const plant = await Plant.createPlant({
      name: 'golden pothos',
      type: 'vine',
      sun: 'part-shade'
    });
    
    const res = await request(app)
      .delete(`/api/v1/plants/${plant.id}`);

    expect(res.body).toEqual({ status: 'success', message: 'delete success' });
  });

});
