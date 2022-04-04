import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminCheck {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    if (request.user && request.user.isAdmin) {
      await next()
    } else {
      response.status(401)
      throw new Error('Not authorized as an admin')
    }
  }
}
