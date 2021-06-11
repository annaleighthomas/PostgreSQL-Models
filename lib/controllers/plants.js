import { Router } from 'express';
import Plant from '../models/Plant.js';

export default Router()
  .post('/api/v1/plants', async (req, res) => {
    try {
      const dog = await Plant.createPlant(req.body);
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .get('/api/v1/plants/:id', async (req, res) => {
    try {
      const plant = await Plant.findPlantById(req.params.id);
      res.send(plant);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .get('/api/v1/plants', async (req, res) => {
    try {
      const plant = await Plant.findAllPlants();
      res.send(plant);
    }  catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .put('/api/v1/plants/:id', async (req, res) => {
    try {
      const plant = await Plant.updatedPlantById(req.params.id, req.body.name, req.body.type, req.body.sun);
      res.send(plant);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .delete('/api/v1/plants/:id', async (req, res) => {
    try {
      await Plant.deletePlantById(req.params.id);
      res.send({ status: 'success', message: 'delete success' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
