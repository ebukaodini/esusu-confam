const jwt = require('jsonwebtoken');
const { badRequest } = require('./reponse-helpers');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null)
    return badRequest(res, '401 - Unauthorized', undefined, 401)

  jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {

    if (error) {
      console.log(error.message)
      return badRequest(res, '403 - Unauthorized', undefined, 403)
    }
    
    req.user = payload?.user
    next()
  })
}

module.exports = authenticateToken