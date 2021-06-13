import { Router } from 'express';
import Fruit from '../models/Fruit.js';

export default Router()
  .post('/api/v1/fruits', async (req, res) => {
    try {
      const fruit = await Fruit.createFruit(req.body);
      res.send(fruit);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/fruits/:id', async (req, res) => {
    try {
      const fruit = await Fruit.findFruitById(req.params.id);
      res.send(fruit);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/fruits', async (req, res) => {
    try {
      const fruit = await Fruit.findAllFruits();
      res.send(fruit);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/fruits/:id', async (req, res) => {
    try {
      const fruit = await Fruit.updateFruitById(req.params.id, req.body.name, req.body.color);
      res.send(fruit);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/fruits/:id', async (req, res) => {
    try { 
      await Fruit.deleteFruitById(req.params.id);
      res.send({ status: 'success', message: 'delete success' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
