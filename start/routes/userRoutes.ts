import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'UsersController.login')
  Route.post('/register', 'UsersController.register')
  Route.get('/', 'UsersController.getProfile').middleware('auth')
}).prefix('/user')
