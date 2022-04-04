// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import generateToken from 'App/Helper/generateToken'
import Order from 'App/Models/Order'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'
import LoginUser from 'App/Validators/LoginUserValidator'
export default class UsersController {
  /**
   * Use to Login
   */
  public async login({ request, response }) {
    const payload = await request.validate(LoginUser)

    try {
      const user = await User.findBy('email', payload.email)
      const token = generateToken(user!.id)
      response.send({
        user,
        token,
      })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  /**
   * Use to register
   */
  public async register({ request, response }) {
    const payload = await request.validate(CreateUser)
    const user = new User()
    await user.fill(payload).save()
    if (user) {
      response.send(payload)
    } else {
      throw new Error('Unable to Register')
    }
  }

  /**
   * Allow user to get Profile
   * GET /user
   * Protected
   */
  public async getProfile({ response, request }) {
    if (request.user) {
      response.send(request.user)
    } else {
      throw new Error('Unable to find User')
    }
  }

  /**
   * Allow User to get transaction data
   */
  public async getTransactionData({ request, response }) {
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
      .where('orders.customer', request.user.id)

    const firstMonthquery = await Order.query()
      .select('amount')
      .where('orders.customer', request.user.id)
      .where('created_at', '>', firstMonth)

    const secondMonthquery = await Order.query()
      .select('amount')
      .where('orders.customer', request.user.id)
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
        Change: d,
        order,
      })
    } else {
      throw new Error('No Transaction found for the following user')
    }
  }
}
