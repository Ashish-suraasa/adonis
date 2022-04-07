import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/', 'OrdersController.createOrder')
    Route.get('/', 'OrdersController.getOrder')
}).prefix('/order')
