import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cat from '../lib/models/Cat.js';

describe('cat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a cat using POST', async () => {
    const res = await request(app)
      .post('/api/v1/cats')
      .send({ name: 'tomato', type: 'tabby', color: 'orange' });

    expect(res.body).toEqual({
      id: '1',
      name: 'tomato',
      type: 'tabby',
      color: 'orange',
    });
  });

  it('retrieves a specific cat by id using GET', async () => {
    const cat = await Cat.createCat({
      name: 'brocoli',
      type: 'siamese',
      color: 'black'
    });

    const res = await request(app)
      .get(`/api/v1/cats/${cat.id}`);

    expect(res.body).toEqual(cat);
  });

  it('retrieves all that cats using GET', async () => {
    const tomato = await Cat.createCat({
      name: 'tomato',
      type: 'tabby',
      color: 'orange',
    });

    const brocoli = await Cat.createCat({
      name: 'brocoli',
      type: 'siamese',
      color: 'black'
    });

    const eggplant = await Cat.createCat({
      name: 'eggplant',
      type: 'tabby',
      color: 'brown',
    });

    const res = await request(app)
      .get('/api/v1/cats');

    expect(res.body).toEqual([tomato, brocoli, eggplant]);
  });

  it('updates a cat using PUT', async () => {
    const cat = await Cat.createCat({
      name: 'eggplant',
      type: 'tabby',
      color: 'brown',
    });
    
    const res = await request(app)
      .put(`/api/v1/cats/${cat.id}`)
      .send({ name: 'eggplant', type: 'devon shire', color: 'brown' });

    expect(res.body).toEqual({ id: '1', name: 'eggplant', type: 'devon shire', color: 'brown' });
  });

  it('deletes a cat using DELETE', async () => {
    const cat = await Cat.createCat({
      name: 'eggplant',
      type: 'tabby',
      color: 'brown',
    });
    
    const res = await request(app)
      .delete(`/api/v1/cats/${cat.id}`);

    expect(res.body).toEqual({ status: 'success', message: 'delete success' });
  });

});
