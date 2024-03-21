import mung from 'express-mung'
 
const transform = (body, req, res) => {
    const response  = {
      author: {
        name: 'Gustavo',
        lastName: 'Carrillo'
      },
      categories: body.available_filters.find(filter => filter.id === 'category')?.values.map((cat) => cat.name),
      items: body.results.map(item => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          // decimals: TODO 
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping
      }))
    } 
    return response;
}

export default mung.json(transform)


