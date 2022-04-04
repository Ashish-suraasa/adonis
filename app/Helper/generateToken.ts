import jwt from 'jsonwebtoken'

const generatetToken = (id) => {
  return jwt.sign({ id }, 'fd', { expiresIn: '1d' })
}

export default generatetToken
