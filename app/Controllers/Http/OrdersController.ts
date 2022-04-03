// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrdersController {
  /**
   * Use to create order
   * POST /order
   * PRIVATE
   */
  public async createOrder({ request, response, auth }) {
    const customer = await auth.use('api').authenticate()
    

  }
}
