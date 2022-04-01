import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCartItemValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product: schema.string(),
    quantity: schema.number()
    
  })

  public messages = {
    required: 'The {{ field }} is required to create a new product',
  }
}
