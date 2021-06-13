import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import dogRouter from './controllers/dogs.js';
import plantRouter from './controllers/plants.js';
import fruitRouter from './controllers/fruits.js';
import catRouter from './controllers/cats.js';

const app = express();

app.use(express.json());
app.use(dogRouter);
app.use(plantRouter);
app.use(fruitRouter);
app.use(catRouter);

if (app) {
  console.log('hi');
}

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
