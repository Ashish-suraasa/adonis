// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'
import LoginUser from 'App/Validators/LoginUserValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  /**
   * Use to Login
   */
  public async login({ auth, request, response }) {
    const payload = await request.validate(LoginUser)

    try {
      const user: any = await User.findBy('email', payload.email)
      const token = await auth.use('api').generate(user, {
        expiresIn: '7days',
      })
      response.send(token)
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  /**
   * Use to register
   */
  public async register({ request, response }) {
    const payload = await request.validate(CreateUser)
    const user = new User()
    await user.fill(payload).save()
    if (user) {
      response.send(payload)
    } else {
      throw new Error('Unable to Register')
    }
  }

  /**
   * Allow user to get Profile
   * GET /user
   * Protected
   */
  public async getProfile({ response, auth }) {
    const user = await auth.use('api').authenticate()
    if (user) {
      response.send(user)
    } else {
      throw new Error('Unable to find User')
    }
  }
}
