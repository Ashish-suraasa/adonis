// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Product from 'App/Models/Product'
import CreateProduct from 'App/Validators/CreateProductValidator'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { ResponseContract } from '@ioc:Adonis/Core/Response'

export default class ProductsController {
  /**
   * Use to create a product
   * POST product
   * PRIVATE ADMIN
   */
  public async createProduct(request: RequestContract, response: ResponseContract): Promise<void> {
    const payload = await request.validate(CreateProduct)

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
  public async getProducts(request: RequestContract, response: ResponseContract): Promise<void> {
    const page: number = request.input('page', 1)
    const limit = 10
    const products = await Product.query().select('*').from('products').paginate(page, limit)
    if (products) {
      response.send(products)
    } else {
      throw new Error('Products not found')
    }
  }

  /**5dt
   * Get a singel product
   * GET /product/:id
   * PUBLIC
   */
  public async getProduct(
    request: RequestContract,
    response: ResponseContract,
    params: Record<string, any>
  ): Promise<void> {
    const product = await Product.query().select('*').from('products').where('id', params.id)
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
  public async deleteProduct(
    request: RequestContract,
    response: ResponseContract,
    params: Record<string, any>
  ): Promise<void> {
    const product = await Product.query().delete().from('products').where('id', params.id)

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
  public updateProduct({ response }): void {
    response.send('UPdate PRodct')
  }
}
