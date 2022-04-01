import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    firstName: schema.string({ trim: true }),
    lastName: schema.string({ trim: true }),
    password: schema.string({ escape: true }),
    address: schema.string({ trim: true }),
  })

  public messages = {
    'required': 'The {{ field }} is required to register',
    'email.unique': '{{field}} is already register',
  }
}
