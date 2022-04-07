// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import Order from 'App/Models/Order'
import { v4 as uuidv4 } from 'uuid'
 import { RequestContract } from '@ioc:Adonis/Core/Request'
 import { ResponseContract } from '@ioc:Adonis/Core/Response'

export default class OrdersController {
  /**
   * Use to create order
   * POST /order
   * PRIVATE
   */
  public async createOrder(request: RequestContract, response: ResponseContract): Promise<void> {
    const x = await Database.rawQuery(
      'select sum(products.price*cart_items.quantity) as total from cart_items inner join products on cart_items.product = products.id where customer = ? AND is_bought = false;',
      ['']
    )

    if (!x.rows[0].total) {
      throw new Error('You dont have any product in your cart')
    }

    const trx = await Database.transaction()
    const d = new Date().toDateString()
    const orderid = await trx.insertQuery().table('orders').returning('id').insert({
      id: uuidv4(),
      customer: 'request.user.id',
      amount: x.rows[0].total,
      address: 'request.user.address',
      is_delivered: false,
      is_paid: false,
      created_at: d,
      updated_at: d,
    })

    const cart_items: any = await trx
      .query()
      .select('*')
      .from('cart_items')
      .whereIn(['is_bought', 'customer'], [[false, 'request.user.id']])

    const mappingPayload: any[] = []
    cart_items.map((e: any) => {
      const tempId: string = uuidv4()
      const tempArr = {
        id: tempId,
        orderid: orderid[0].id,
        cart_item: e.id,
      }

      mappingPayload.push(tempArr)
    })

    cart_items.map
    await trx.table('order_cart_mapping').multiInsert(mappingPayload)

    await trx
      .query()
      .from('cart_items')
      .where('customer', '424b8999-a7da-49a5-9abc-80ec67700b75')
      .update({ is_bought: true })

    trx.commit()
    const order = await Order.query().select('*').where('id', orderid[0].id)
    response.send({ order })
  }

  /**
   * Allow user to create order
   * GET /order
   * PRIVATE
   */
  public async getOrder(request: RequestContract, response: ResponseContract): Promise<void> {
    const page: number = request.input('page', 1)
    const limit = 10
    const order = await Order.query()
      .select('*')
      .where('customer',' request.user.id')
      .paginate(page, limit)
    if (order) {
      response.send(order)
    } else {
      throw new Error('Unable to get all order')
    }
  }
}
