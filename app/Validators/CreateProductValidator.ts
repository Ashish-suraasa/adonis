import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_name: schema.string({ trim: true, escape: true }),
    price: schema.number([rules.unsigned()]),
    stock: schema.number([rules.unsigned()]),
  })

  public messages = {
    required: 'The {{ field }} is required to create a new product',
  }
}
