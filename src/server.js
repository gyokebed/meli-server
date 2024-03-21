import express from 'express';
import axios from 'axios';
import morgan from 'morgan'

const app = express();

if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
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

export default app;
