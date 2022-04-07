// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'
import Order from 'App/Models/Order'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'
import LoginUser from 'App/Validators/LoginUserValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  /**
   * Use to Login
   */

  public async login({ request, response }: HttpContextContract): Promise<void> {
    const payload = await request.validate(LoginUser)

    const user = await User.findBy('email', payload.email)

    if (await Hash.verify(user!.password, payload.password)) {
      response.send({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        address: user?.address,
      })
    } else {
      throw new Error('Invalid Credentials')
    }
  }

  /**
   * Use to register
   */
  public async register({ request, response }: HttpContextContract): Promise<void> {
    const payload = await request.validate(CreateUser)
    const user = new User()
    await user.fill(payload).save()
    if (user.$isPersisted) {
      response.send({
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        email: payload?.email,
        address: payload?.address,
      })
    } else {
      throw new Error('Unable to Register')
    }
  }

  /**
   * Allow user to get Profile
   * GET /user
   * Protected
   */
  public async getProfile({ request, response }: HttpContextContract): Promise<void> {
    const user = await User.findBy('email', '')
    if (user) {
      response.send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        addresss: user.address,
      })
    } else {
      throw new Error('Unable to find User')
    }
  }

  /**
   * Allow User to get transaction data
   */
  public async getTransactionData({ request, response }: HttpContextContract): Promise<void> {
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
      .where('orders.customer', '')

    const firstMonthquery = await Order.query()
      .select('amount')
      .where('orders.customer', '')
      .where('created_at', '>', firstMonth)

    const secondMonthquery = await Order.query()
      .select('amount')
      .where('orders.customer', '')
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
        thisMonthTotal: firstMonthAmount,
        lastMonthTotal: secondMonthAmount,
        totalChange: d,
        order,
      })
    } else {
      throw new Error('No Transaction found for the following user')
    }
  }
}
