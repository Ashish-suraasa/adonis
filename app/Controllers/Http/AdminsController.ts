// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Order from 'App/Models/Order'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'
import CartHistory from 'App/Models/CartHistory'
import Database from '@ioc:Adonis/Lucid/Database'

import { RequestContract } from '@ioc:Adonis/Core/Request'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'
import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'
import { v4 as uuidv4 } from 'uuid'

export default class AdminsController {
  /**
   * Allow admin to create user using a json file
   */
  //TODO: do it thorugh the json file and in pg-transaction
  public async createUser({ request, response }: HttpContextContract): Promise<void> {
    const validatorSchema = schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      firstName: schema.string({ trim: true }),
      lastName: schema.string({ trim: true }),
      password: schema.string({ trim: true }),
      address: schema.string({ trim: true }),
    })
    const coverImage = request.file('cover_image', {
      size: '2mb',
      extnames: ['json'],
    })!

    if (coverImage) {
      await coverImage.move(Application.tmpPath('/'))
    }
    const f = coverImage.filePath as string
    const data = fs.readFileSync(f, 'utf8')
    let val = JSON.parse(data)

    const userData = val.map((e) => {
      return {
        ...e,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: uuidv4(),
      }
    })

    console.log(userData)

    const trx = await Database.transaction()

    try {
      await trx.table('users').multiInsert(userData)
      await trx.commit()
      response.send({ userData })
    } catch (error) {
      await trx.rollback()
      response.send(error)
    }
  }

  /**
   * Allow admin to get all orders
   */

  //TODO: CHAnge the filter type
  public async getOrder({ request, response }: HttpContextContract) {
    const { page = 1 } = request.qs()
    const q = request.qs()
    const wherekeyArr: string[] = []
    const whereValueArr: string[] = []
    Object.entries(q).forEach((e) => {
      if (e[1]) {
        wherekeyArr.push(e[0])
        whereValueArr.push(e[1])
      }
    })
    console.log(wherekeyArr, whereValueArr)

    const orders = await Order.query()
      .select('*')
      .whereIn(wherekeyArr, [whereValueArr])
      .paginate(page, 10)
    return orders
    // if (q.customer && q.product && q.minamount && q.maxamount) {

    //   return orders
    // } else if (q.customer && q.product) {
    //   const orders = await Order.query()
    //     .select('*')
    //     .where('customer', q.customer)
    //     .andWhere('product', q.product)
    //     .andWhere('amount', '>', q.minamount)
    //     .andWhere('amount', '<', q.maxamount)
    //     .paginate(page, 10)
    //   return orders
    // } else if (q.minamount && q.maxamount) {
    //   const orders = await Order.query()
    //     .select('*')
    //     .andWhere('amount', '>', q.minamount)
    //     .andWhere('amount', '<', q.maxamount)
    //     .paginate(page, 10)

    //   return orders
    // }
  }

  /**
   * Allow admin to get transaction data
   *
   * select sum(orders.amount),users.email from orders inner join users on orders.customer =users.id group by users.email;
   */
  public async getTransactionData({ request, response }: HttpContextContract): Promise<void> {
    var date = new Date()
    //TODO: fix the date issue and also use luxon to create date instead of js date
    //Getting Dates done
    const firstMonth = new Date(new Date().setMonth(date.getMonth() - 1)).toDateString()
    const secondMonth = new Date(new Date().setMonth(date.getMonth() - 2)).toDateString()
    //TODO: Use model instead of Database issue with join method done
    console.log(firstMonth, secondMonth)

    //TOOD: add group by user
    const order = await Order.query()
      .join('users', 'orders.customer', '=', 'users.id')
      .select('users.email')
      .select('users.first_name')
      .select('users.last_name')
      .select('orders.*')
      .groupBy('users.')

    const firstMonthquery = await Order.query()
      .select('amount')
      .where('created_at', '>', firstMonth)

    const secondMonthquery = await Order.query()
      .select('amount')
      .whereBetween('created_at', [firstMonth, secondMonth])

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
  /**
   * Allow admin to download transaction data
   */
  public async downloadTransaction({ request, response }: HttpContextContract) {
    // const user: any = await User.findBy('email', request.body().email)

    const order = await Order.query()
      .select('*')
      .join('users', 'orders.customer', '=', 'users.id')
      .select('*')

    if (order) {
      var json = JSON.stringify(order)
      var filename = 'user.json'
      var mimetype = 'application/json'
      //TODO: study the content-type and content-dispositon
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

  public async getCartHistory({ request, response }: HttpContextContract) {
    const page: number = request.input('page', 1)
    const limit = 10
    //TODO: check the blank reutrn of models done
    //Investicate the responese
    const cartHistory = await CartHistory.query()
      .select('*')
      .from('cart_history')
      .where('id', 'fdsfdsfds')
      .paginate(page, limit)
    console.log(cartHistory)

    response.send({ cartHistory })
  }
}
