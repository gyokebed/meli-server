import express from 'express';
import axios from 'axios';
import morgan from 'morgan';
import responseTransformer from './handlers/responseTransformer.js';

const app = express();

app.use(responseTransformer);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
});

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

const request = async (search) => {
  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${search}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

const productDetailRequest = async (id) => {
  const baseUrl = 'https://api.mercadolibre.com/items';

  let endpoints = [`${baseUrl}/${id}`, `${baseUrl}/${id}/description`];

  try {
    return await Promise.all(endpoints.map((endpoint) => axios.get(endpoint)));
  } catch (error) {
    return error;
  }
};

app.get('/api/items', (req, res) => {
  (async () => {
    try {
      const { data } = await request(req.query.q);

      res.json(data);
    } catch (error) {
      return error;
    }
  })();
});

app.get('/api/items/:id', (req, res) => {
  (async () => {
    try {
      const [detail, description] = await productDetailRequest(req.params.id);

      res.json({
        item: { ...detail.data },
        description: { ...description.data },
      });
    } catch (error) {
      return error;
    }
  })();
});

export default app;
