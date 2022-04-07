import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

export function generateToken(user: User) {
  const payload = {
    id: user.id,
    email: user.email,
  }
  const token = jwt.sign(payload, Env.get('JWT_PRIVATE_KEY'))

  return token
}

export function verifyToken(token: string) {
  const payload = jwt.verify(token, Env.get('JWT_PUBLIC_KEY'))

  return payload
}
