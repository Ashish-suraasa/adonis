import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ProductsController.getProducts')
  Route.post('/', 'ProductsController.createProduct')
})
  .prefix('/product')

Route.group(() => {
  Route.get('/', 'ProductsController.getProduct')
  Route.put('/', 'ProductsController.updateProduct')
  Route.delete('/', 'ProductsController.deleteProduct')
})
  .prefix('/product/:id')
