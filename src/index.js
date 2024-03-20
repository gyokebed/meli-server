import express from 'express';
import axios from 'axios';

const app = express();

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
