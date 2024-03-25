import express from 'express';
import morgan from 'morgan';
import responseTransformer from './handlers/responseTransformer.js';
import cors from './middleware/cors.js';
import products from './routes/products.js';

const app = express();

app.use(cors);
app.use(responseTransformer);
app.use('/api/items', products);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

export default app;
