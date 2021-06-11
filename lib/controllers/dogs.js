import { Router } from 'express';
import Dog from '../models/Dog.js';

export default Router()
  .post('/api/v1/dogs', async (req, res) => {
    try {
      const dog = await Dog.createDog(req.body);
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .get('/api/v1/dogs/:id', async (req, res) => {
    try {
      const dog = await Dog.findDogById(req.params.id);
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .get('/api/v1/dogs', async (req, res) => {
    try {
      const dog = await Dog.findAllDogs();
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .put('/api/v1/dogs/:id', async (req, res) => {
    try {
      const dog = await Dog.updateDogById(req.params.id, req.body.name, req.body.age, req.body.weight);
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .delete('/api/v1/dogs/:id', async (req, res) => {
    try { 
      await Dog.deleteDogById(req.params.id);
      res.send('Delete Successful');
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
