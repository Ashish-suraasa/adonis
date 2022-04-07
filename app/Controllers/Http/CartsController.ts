// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CartHistory from 'App/Models/CartHistory'
import CartItem from 'App/Models/CartItem'
import CreateCartItem from 'App/Validators/CreateCartItemValidator'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { ResponseContract } from '@ioc:Adonis/Core/Response'

export default class CartsController {
  /**
   * Add item to cart
   * POST /cart
   * PRIVATE
   */
  public async addCartItem(request: RequestContract, response: ResponseContract): Promise<void> {
    const payload = await request.validate(CreateCartItem)
    const cartHistory = new CartHistory()
    payload.customer = ''
    const cartItem = new CartItem()
    await cartItem.fill(payload).save()
    await cartHistory
      .fill({
        product: payload.product,
        customer: payload.customer,
        type: 'added',
        quantity: payload.quantity,
      })
      .save()
    response.send(cartItem)
    if (cartItem) {
    } else {
      throw new Error('Unable to create Cart Item')
    }
  }

  /**
   * Get all the cart Item
   * GET /cart
   * PRIVATE
   */
  public async getCartItems(request: RequestContract, response: ResponseContract): Promise<void> {
    const page: number = request.input('page', 1)
    const limit = 10
    const cartItems = await CartItem.query().where('customer', '').paginate(page, limit)
    if (cartItems) {
      response.send(cartItems)
    } else {
      throw new Error('Unable to find any cart item')
    }
  }

  /**
   * Remove Cart Item
   * DELETE /cart
   */
  public async removeCartItem(
    request: RequestContract,
    response: ResponseContract,
    params: Record<string, any>
  ): Promise<void> {
    const cartId = params.id
    const cartItem = await CartItem.findByOrFail('id', cartId)
    const cartHistory = new CartHistory()
    await cartHistory
      .fill({
        product: cartItem.product,
        customer: cartItem.customer,
        type: 'removed',
        quantity: cartItem.quantity,
      })
      .save()
    if (cartItem) {
      await cartItem.delete()
      response.send({ message: 'Cart Item removed' })
    } else {
      throw new Error('Unable to find Cart item')
    }
  }
}
