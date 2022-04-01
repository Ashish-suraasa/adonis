import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'ProductsController.getProducts')
  Route.post('/', 'ProductsController.createProduct')
})
  .prefix('/product')
  .middleware('auth')

Route.group(() => {
  Route.get('/', 'ProductsController.getProduct')
  Route.put('/', 'ProductsController.updateProduct')
  Route.delete('/', 'ProductsController.deleteProduct')
})
  .prefix('/product/:id')
  .middleware('auth')
