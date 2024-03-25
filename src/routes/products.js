import { Router } from 'express';
import axios from 'axios';

const router = Router();

const searchProductsRequest = async (search) => {
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

router.get('/', (req, res) => {
  (async () => {
    try {
      const { data } = await searchProductsRequest(req.query.q);

      res.json(data);
    } catch (error) {
      return error;
    }
  })();
});

router.get('/:id', (req, res) => {
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

export default router;
