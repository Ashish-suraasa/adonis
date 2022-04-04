// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import generateToken from 'App/Helper/generateToken'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'
import LoginUser from 'App/Validators/LoginUserValidator'
export default class UsersController {
  /**
   * Use to Login
   */
  public async login({ request, response }) {
    const payload = await request.validate(LoginUser)

    try {
      const user = await User.findBy('email', payload.email)
      const token = generateToken(user!.id)
      response.send({
        user,
        token,
      })
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
  public async getProfile({ response, request }) {
    if (request.user) {
      response.send(request.user)
    } else {
      throw new Error('Unable to find User')
    }
  }
}
