import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CartsController.getCartItems')
  Route.post('/', 'CartsController.addCartItem')
  Route.delete('/:id', 'CartsController.removeCartItem')
})
  .prefix('/cart')
