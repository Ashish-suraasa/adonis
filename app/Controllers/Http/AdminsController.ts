// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Order from 'App/Models/Order'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'
import CartHistory from 'App/Models/CartHistory'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AdminsController {
  /**
   * Allow admin to create user using a json file
   */
  public async createUser({ request, response }) {
    const payload = await request.validate(CreateUser)
    const user = new User()
    await user.fill(payload).save()
    if (user) {
      response.send({ payload })
    } else {
      throw new Error('Unable to create user')
    }
  }

  /**
   * Allow admin to get all orders
   */
  public async getOrder({ request, response }) {
    const { page = 1, ...input } = request.qs()
    const orders = await Order.query().select('*').filter(input).paginate(page, 10)
    if (orders) {
      response.send(orders)
    } else {
      throw new Error('Unable to get Orders')
    }
  }

  /**
   * Allow admin to get transaction data
   */
  public async getTransactionData({ request, response }) {
    const user: any = await User.findBy('email', request.body().email)
    var date = new Date()

    //Getting Dates
    const firstMonth = new Date(date.setMonth(date.getMonth() - 1)).toDateString()
    const secondMonth = new Date(date.setMonth(date.getMonth() - 1)).toDateString()

    //Get all the order from the last month
    const order = await Database.from('orders')
      .join('users', 'orders.customer', '=', 'users.id')
      .select('users.email')
      .select('users.first_name')
      .select('users.last_name')
      .select('orders.*')

    const firstMonthquery = await Order.query()
      .select('amount')
      .where('created_at', '>', firstMonth)

    const secondMonthquery = await Order.query()
      .select('amount')
      .whereIn('created_at', [firstMonth, secondMonth])

    const firstMonthAmount = firstMonthquery.reduce((total, e) => {
      return total + Number(e.amount)
    }, 0)

    const secondMonthAmount = secondMonthquery.reduce((total, e) => {
      return total + Number(e.amount)
    }, 0)

    const d = firstMonthAmount - secondMonthAmount

    if (order) {
      response.send({
        d,
      })
    } else {
      throw new Error('No Transaction found for the following user')
    }
  }
  /**
   * Allow admin to download transaction data
   */
  public async downloadTransaction({ request, response }) {
    const user: any = await User.findBy('email', request.body().email)
    const order = await Database.from('orders')
      .select('*')
      .join('users', 'orders.customer', '=', 'users.id')
      .select('*')

    if (order) {
      var json = JSON.stringify(order)
      var filename = 'user.json'
      var mimetype = 'application/json'
      response.header('Content-Type', mimetype)
      response.header('Content-disposition', 'attachment; filename=' + filename)
      response.send(json)
    } else {
      throw new Error('No Transaction found for the following user')
    }
  }

  /**
   * Allow admin to check all the change cart history
   */
  public async getCartHistory({ request, response }) {
    const page: number = request.input('page', 1)
    const limit = 10
    const cartHistory = await CartHistory.query()
      .select('*')
      .from('cart_history')
      .paginate(page, limit)
    if (cartHistory) {
      response.send({ cartHistory })
    } else {
      throw new Error('Unable to get cart History')
    }
  }
}
