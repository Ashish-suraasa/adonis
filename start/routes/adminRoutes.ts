import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/gettransactiondata', 'AdminsController.getTransactionData')
  Route.post('/gettransactiondata/download', 'AdminsController.downloadTransaction')
  Route.get('/getcarthistory', 'AdminsController.getCartHistory')
  Route.get('/getorder', 'AdminsController.getOrder')
  Route.post('/createuser', 'AdminsController.createUser')
})
  .prefix('/admin')
