import mung from 'express-mung';

const author = {
  name: 'Gustavo',
  lastName: 'Carrillo',
};

const transform = (body, req) => {
  // Search results
  if (req.path == '/') {
    return {
      author,
      categories: body.available_filters
        .find((filter) => filter.id === 'category')
        ?.values.map((cat) => cat.name),
      items: body.results.map((item) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: 2,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      })),
    };
  }

  // Product Detail
  return {
    author,
    item: {
      id: body.item.id,
      title: body.item.title,
      price: {
        currency: body.item.currency_id,
        amount: body.item.price,
        decimals: 2,
      },
      picture: body.item.pictures.find(
        (picture) => picture.id === body.item.thumbnail_id
      ).url,
      condition: body.item.condition,
      free_shipping: body.item.shipping.free_shipping,
      sold_quantity: body.item.initial_quantity,
      description: body.description.plain_text,
    },
  };
};

export default mung.json(transform);
