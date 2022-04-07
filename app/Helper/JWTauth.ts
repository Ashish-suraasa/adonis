import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import { HttpContext } from '@adonisjs/core/build/standalone'
import { DatabaseTokenProviderConfig, ProvidersList } from '@ioc:Adonis/Addons/Auth'

export type JWTConfig<Provider extends keyof ProvidersList> = {
  driver: 'jwt'
  publicKey: string
  privateKey: string
  tokenProvider: DatabaseTokenProviderConfig
  provider: ProvidersList[Provider]['config']
}

export class JWTContract {
  token: string
  user: User
  ctx: HttpContext
  constructor(token, user, ctx) {
    this.token = token
    this.user = user
    this.ctx = ctx
  }
  /**
   * create a token according to given credentials
   */
  async attempt(email, password, options) {
    const user = await User.findBy('email', email)
    if (await Hash.verify(user!.password, password)) {
      const payload = {
        email: user?.email,
        id: user?.id,
      }

      return jwt.sign(payload, Env.get('JWT_PRIVATE_KEY'), options)
    } else {
      throw new Error('Invalid Credentials')
    }
  }

  async generate(user, options) {
    return this.login(user, options)
  }

  async login(user, options) {
    const payload = {
      email: user?.email,
      id: user?.id,
    }
    const token = jwt.sign(payload, Env.get('JWT_PRIVATE_KEY'), options)

    return token
  }

  async authenticate() {
    const token = this.getToken() as string
    const payload = await jwt.verify(token, Env.get('JWT_PUBLIC_KEY'))
    return payload
  }

  getToken() {
    if (
      this.ctx.request.headers().authorization &&
      this.ctx.request.headers().authorization?.startsWith('Bearer')
    ) {
      //Get the token
      const token = this.ctx.request.headers().authorization?.split(' ')[1] as string
      return token
    }
  }
}


