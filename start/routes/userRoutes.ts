import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'UsersController.login')
  Route.post('/register', 'UsersController.register')
})

Route.group(() => {
  Route.get('/', 'UsersController.getProfile')
  Route.get('/getTransactionData', 'UsersController.getTransactionData')
})
  .prefix('/user')
  .middleware('auth')
