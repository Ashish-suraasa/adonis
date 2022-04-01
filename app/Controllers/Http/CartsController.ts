// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CartItem from 'App/Models/CartItem'
import CreateCartItem from 'App/Validators/CreateCartItemValidator'

export default class CartsController {
  /**
   * Add item to cart
   * POST /cart
   * PRIVATE
   */
  public async addCartItem({ request, response, auth }) {
    const payload = await request.validate(CreateCartItem)
    payload.customer = await auth.use('api').authenticate()
    const cartItem = new CartItem()
    await cartItem.fill(payload).save()

    if (cartItem) {
      response.send(cartItem)
    } else {
      throw new Error('Unable to create Cart Item')
    }
  }

  /**
   * Get all the cart Item
   * GET /cart
   * PRIVATE
   */
  public async getCartItems({ auth, request, response }) {
    const customer = await auth.use('api').authenticate()
    const page: number = request.input('page', 1)
    const limit = 10
    const cartItems = await CartItem.query().where('customer', customer.id).paginate(page, limit)
    if (cartItems) {
      response.send(cartItems)
    } else {
      throw new Error('Unable to find any cart item')
    }
  }
}
