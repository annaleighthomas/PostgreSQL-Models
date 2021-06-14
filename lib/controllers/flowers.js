import { Router } from 'express';
import Flower from '../models/Flower.js';

export default Router()
  .post('/api/v1/flowers', async (req, res) => {
    try {
      const flower = await Flower.createFlower(req.body);
      res.send(flower);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/flowers/:id', async (req, res) => {
    try {
      const flower = await Flower.findFlowerById(req.params.id);
      res.send(flower);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/flowers', async (req, res) => {
    try {
      const flower = await Flower.findAllFlowers();
      res.send(flower);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/flowers/:id', async (req, res) => {
    try {
      const flower = await Flower.updateFlowerById(req.params.id, req.body.commonName, req.body.genus, req.body.type);
      res.send(flower);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/flowers/:id', async (req, res) => {
    try {
      await Flower.deleteFlower(req.params.id);
      res.send({ status: 'success', message: 'delete success' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
