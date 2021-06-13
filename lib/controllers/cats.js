import { Router } from 'express';
import Cat from '../models/Cat.js';

export default Router()
  .post('/api/v1/cats', async (req, res) => {
    try {
      const cat = await Cat.createCat(req.body);
      res.send(cat);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/cats/:id', async (req, res) => {
    try {
      const cat = await Cat.findCatById(req.params.id);
      res.send(cat);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/cats', async (req, res) => {
    try {
      const cat = await Cat.findAllCats();
      res.send(cat);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })  
    
  .put('/api/v1/cats/:id', async (req, res) => {
    try {
      const cat = await Cat.updateCatById(req.params.id, req.body.name, req.body.type, req.body.color);
      res.send(cat);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/cats/:id', async (req, res) => {
    try { 
      await Cat.deleteCatById(req.params.id);
      res.send({ status: 'success', message: 'delete success' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
