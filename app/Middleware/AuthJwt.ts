import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import jwt from 'jsonwebtoken'

interface tokenType {
  id: string
}

export default class AuthJwt {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    if (request.headers().authorization && request.headers().authorization?.startsWith('Bearer')) {
      try {
        //Get the token
        const token = request.headers().authorization?.split(' ')[1] as string

        //Decoding the token
        const decoded = jwt.verify(token, 'fd') as tokenType

        //Setting the request.user as the user

        //TODO: Removed the password field
        request.user = await User.find(decoded.id)
        
        await next()
      } catch (err) {
        response.status(401)
        throw new Error('Not authorized, token failed')
      }
    } else {
      response.status(401)
      throw new Error('Not authroized, no token')
    }
  }
}
