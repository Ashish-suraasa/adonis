// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'
import CreateProduct from 'App/Validators/CreateProductValidator'

export default class ProductsController {
  /**
   * Use to create a product
   * POST product
   * PRIVATE ADMIN
   */
  public async createProduct({ request, response, auth }) {
    const payload = await request.validate(CreateProduct)
    const user = await auth.use('api').authenticate()
    payload.creator = user.id
    const product = new Product()
    await product.fill(payload).save()
    if (product) {
      response.send(product)
    } else {
      throw new Error('Unable to create product')
    }
  }

  /**
   * Show a list of all products
   * Get /product
   * PUBLIC
   */
  public async getProducts({ response, request }) {
    const page: number = request.input('page', 1)
    const limit = 10
    const products = await Database.query().select('*').from('products').paginate(page, limit)
    if (products) {
      response.send(products)
    } else {
      throw new Error('Products not found')
    }
  }

  /**
   * Get a singel product
   * GET /product/:id
   * PUBLIC
   */
  public async getProduct({ response, params }) {
    const product = await Database.query().select('*').from('products').where('id', params.id)
    if (product) {
      response.send(product)
    } else {
      throw new Error('Product not found')
    }
  }

  /**
   * Use to delete a Product
   * DELETE /product/:id
   * PRIVATE ADMIN
   */
  public async deleteProduct({ params, response }) {
    const product = await Database.query().delete().from('products').where('id', params.id)

    if (product) {
      response.send({ message: 'Product Deleted' })
    } else {
      throw new Error('Unable to delete the product')
    }
  }

  /**
   * Use to update a Product
   * put /product/:id
   * PRIVATE ADMIN
   */
  public updateProduct({ response }) {
    response.send('UPdate PRodct')
  }
}
